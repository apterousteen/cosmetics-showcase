import type { Product } from '../api/types';

/**
 * Подбирает товары для ряда рекомендаций под карточкой.
 *
 * Проходит каталог по кругу, начиная с товара, следующего за текущим. Сначала берёт из категории текущего товара, потом добирает остальными.
 *
 * @param products - весь каталог в порядке таблицы
 * @param currentIndex - позиция текущего товара в products; отсутствие товара разбирает вызывающая сторона
 * @param limit - сколько карточек нужно
 * @returns список из `limit` товаров, если каталог меньше, то столько, сколько наберется
 */
export function selectRecommendations(products: Product[], currentIndex: number, limit = 8): Product[] {
  // Не играем в литкод, потому что товаров мало

  const current = products[currentIndex];

  const rotated = [...products.slice(currentIndex + 1), ...products.slice(0, currentIndex)];

  const sameCategory = rotated.filter((item) => item.category === current.category);
  const others = rotated.filter((item) => item.category !== current.category);

  return [...sameCategory, ...others].slice(0, limit);
}
