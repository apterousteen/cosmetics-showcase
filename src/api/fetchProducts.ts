import Papa from 'papaparse';
import { CSV_URL } from '../constants/config';
import type { Product } from './types';

/** Сырая строка CSV: ключи — заголовки колонок. */
type RawRow = Record<string, string>;

/**
 * Загружает и нормализует товары из опубликованного Google-CSV.
 *
 * Колонки сопоставляются по имени заголовка (не по индексу), поэтому перестановка столбцов в таблице парсинг не ломает.
 * Все значения тримятся, строки без id отсекаются.
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

  return data
    .map((row) => ({
      id: (row['id'] ?? '').trim(),
      category: (row['category'] ?? '').trim(),
      name: (row['name'] ?? '').trim(),
      price: (row['approximatePrice'] ?? '').trim(),
      comment: (row['comment'] ?? '').trim(),
      imageURL: (row['imageURL'] ?? '').trim(),
    }))
    .filter((product) => product.id !== '');
}
