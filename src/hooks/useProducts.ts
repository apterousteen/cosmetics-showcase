import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchProducts } from '../api/fetchProducts';
import type { Product } from '../api/types';
import { REQUEST_TIMEOUT_MS } from '../constants/config';

/** Причина провала загрузки для разных сообщений в UI */
export type ProductsError = 'timeout' | 'network';

/** Состояние загрузки данных */
export type ProductsState =
  | { status: 'loading' }
  | { status: 'error'; reason: ProductsError }
  | { status: 'ready'; products: Product[] };

/**
 * Загружает товары при монтировании и хранит их состояние.
 *
 * Гарантии:
 * - максимум один актуальный запрос (новый вызов отменяет предыдущий);
 * - запрос обрывается по таймауту {@link REQUEST_TIMEOUT_MS};
 * - размонтирование отменяет текущий запрос, его результат отбрасывается.
 *
 * @returns `state` — текущее состояние; `retry` — перезапуск загрузки
 */
export function useProducts() {
  const [state, setState] = useState<ProductsState>({ status: 'loading' });

  // Контроллер текущего запроса: переживает рендеры, не триггерит ре-рендер.
  const controllerRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    controllerRef.current?.abort(); // отменяем предыдущий запрос, если висит
    const controller = new AbortController();
    controllerRef.current = controller;

    const signal = AbortSignal.any([
      controller.signal, // ручная отмена (размонтирование / retry)
      AbortSignal.timeout(REQUEST_TIMEOUT_MS), // таймаут
    ]);

    setState({ status: 'loading' });
    try {
      const products = await fetchProducts(signal);
      setState({ status: 'ready', products });
    } catch (error) {
      if (controller.signal.aborted) return; // ручная отмена — игнор
      const isTimeout = error instanceof DOMException && error.name === 'TimeoutError';
      setState({ status: 'error', reason: isTimeout ? 'timeout' : 'network' });
      console.error(error);
    }
  }, []);

  useEffect(() => {
    load();
    return () => controllerRef.current?.abort();
  }, [load]);

  return { state, retry: load };
}
