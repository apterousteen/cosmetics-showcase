import { useMemo, useState } from 'react';
import type { Product } from '../api/types';

/**
 * Фильтрует товары по категориям, которые есть в данных.
 *
 * Хранит весь выбор пользователя, а не только пересечение с реальными категориями, почему так см. в docs/internal/data.md.
 *
 * @param products - список товаров (источник категорий и данных для фильтра)
 * @returns categories - опции фильтра; selected/setSelected — выбранные опции; filteredProducts — отфильтрованные товары
 */
export function useCategoryFilter(products: Product[]) {
  const [chosenByUser, setChosenByUser] = useState<string[]>([]);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort((a, b) => a.localeCompare(b)),
    [products],
  );

  const selected = useMemo(
    () => chosenByUser.filter((category) => categories.includes(category)),
    [chosenByUser, categories],
  );

  const filteredProducts = useMemo(
    () => (selected.length === 0 ? products : products.filter((p) => selected.includes(p.category))),
    [products, selected],
  );

  return { categories, selected, setSelected: setChosenByUser, filteredProducts };
}
