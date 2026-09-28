import Papa from 'papaparse';
import { CSV_URL } from '../constants/config';
import type { Product } from './types';

/** Сырая строка CSV: ключи — заголовки колонок. */
type RawRow = Record<string, string>;

/**
 * Загружает и нормализует товары из опубликованного Google-CSV.
 *
 * Колонки сопоставляются по имени заголовка (не по индексу), поэтому перестановка столбцов в таблице парсинг не ломает.
 * Все значения тримятся, строки без id отсекаются, повторные id и разноописанные категории схлопываются.
 *
 * @param signal - сигнал отмены/таймаута
 * @returns массив товаров; пустой [], если строк нет
 * @throws при отмене, таймауте, сетевом сбое или HTTP-статусе ≠ 2xx
 */
export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const res = await fetch(CSV_URL, { signal });
  if (!res.ok) {
    throw new Error(`CSV fetch failed: ${res.status}`);
  }
  const text = await res.text();

  const { data } = Papa.parse<RawRow>(text, {
    header: true,
    skipEmptyLines: true,
  });

  const rows = data
    .map((row) => ({
      id: (row['id'] ?? '').trim(),
      category: (row['category'] ?? '').trim(),
      name: (row['name'] ?? '').trim(),
      price: (row['approximatePrice'] ?? '').trim(),
      comment: (row['comment'] ?? '').trim(),
      imageURL: (row['imageURL'] ?? '').trim(),
      mantineColorBg: (row['mantineColorBg'] ?? '').trim(),
    }))
    .filter((product) => product.id !== '');

  return unifyCategories(dropDuplicateIds(rows));
}

/** Выбрасывает товары с повторным id, оставляя первый из таблицы. */
function dropDuplicateIds(products: Product[]): Product[] {
  const seen = new Set<string>();

  return products.filter((product) => {
    if (seen.has(product.id)) return false;

    seen.add(product.id);
    return true;
  });
}

/**
 * Сводит категории, различающиеся только регистром, к первому написанию из таблицы.
 *
 * Например, вместо «Шампунь» и «шампунь» будет «Шампунь».
 */
function unifyCategories(products: Product[]): Product[] {
  const canonical = new Map<string, string>();

  return products.map((product) => {
    const key = product.category.toLowerCase();
    const known = canonical.get(key);

    if (known === undefined) {
      canonical.set(key, product.category);
      return product;
    }

    return known === product.category ? product : { ...product, category: known };
  });
}
