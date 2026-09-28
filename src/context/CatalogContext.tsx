import { createContext, type ReactNode, useContext, useMemo } from 'react';
import type { Product } from '../api/types';
import { useCategoryFilter } from '../hooks/useCategoryFilter';
import { type ProductsState, useProducts } from '../hooks/useProducts';

/** Данные о товарах и фильтрах, общие для всех страниц. */
type CatalogContextValue = {
  state: ProductsState;
  retry: () => void;
  products: Product[];
  categories: string[];
  selected: string[];
  setSelected: (next: string[]) => void;
  filteredProducts: Product[];
  updatedAt: number;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

// Стабильная ссылка, чтобы useMemo в useCategoryFilter не пересчитывался
const NO_PRODUCTS: Product[] = [];

/** Располагается выше App c маршрутами, чтобы переход между страницами не запрашивал товары заново и не терял фильтры. */
export function CatalogProvider({ children }: { children: ReactNode }) {
  const { state, retry, updatedAt } = useProducts();
  const products = state.status === 'ready' ? state.products : NO_PRODUCTS;
  const { categories, selected, setSelected, filteredProducts } = useCategoryFilter(products);

  const value = useMemo(
    () => ({
      state,
      retry,
      products,
      categories,
      selected,
      setSelected,
      filteredProducts,
      updatedAt,
    }),
    [state, retry, products, categories, selected, setSelected, filteredProducts, updatedAt],
  );

  return <CatalogContext value={value}>{children}</CatalogContext>;
}

/** Дает доступ к загруженному списку товаров и фильтрам. */
export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider');
  return ctx;
}
