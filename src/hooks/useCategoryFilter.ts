import { useMemo, useState } from 'react';
import type { Product } from '../api/types';

/**
 * Фильтрация товаров по категориям.
 *
 * Категории выводятся из самих товаров (уникальные, по алфавиту).
 * Логика: пустой выбор → все товары, иначе — товары из выбранных категорий.
 *
 * @param products - список товаров (источник категорий и данных для фильтра)
 * @returns categories - опции фильтра; selected/setSelected — выбор; filtered — отфильтрованные товары
 */
export function useCategoryFilter(products: Product[]) {
  const [selected, setSelected] = useState<string[]>([]);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort((a, b) => a.localeCompare(b)),
    [products],
  );

  const filtered = useMemo(
    () =>
      selected.length === 0 ? products : products.filter((p) => selected.includes(p.category)),
    [products, selected],
  );

  return { categories, selected, setSelected, filtered };
}
