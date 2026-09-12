import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchProducts } from '../api/fetchProducts';
import type { Product } from '../api/types';
import { DATA_STALE_AFTER_MS, REQUEST_TIMEOUT_MS } from '../constants/config';

/** Причина провала загрузки для разных сообщений в UI. */
export type ProductsError = 'timeout' | 'network';

type LoadOptions = {
  silent?: boolean;
};

/** Состояние загрузки данных. */
export type ProductsState =
  | { status: 'loading' }
  | { status: 'error'; reason: ProductsError }
  | { status: 'ready'; products: Product[] };

/**
 * Загружает товары при монтировании, хранит их состояние и обновляет их в фоне при возврате на вкладку.
 *
 * Гарантии:
 * - максимум один актуальный запрос (новый вызов отменяет предыдущий);
 * - запрос обрывается по таймауту {@link REQUEST_TIMEOUT_MS};
 * - размонтирование отменяет текущий запрос, его результат отбрасывается;
 * - фоновое обновление — не чаще раза в {@link DATA_STALE_AFTER_MS} и только поверх успешно загруженных данных;
 * - ошибка фонового обновления не отображается — на экране остаются прежние данные;
 * - `updatedAt` меняется только при фоновом обновлении, вернувшем данные, отличающиеся от прежних.
 *
 * @returns `state` — текущее состояние; `retry` — перезапуск загрузки; `updatedAt` — момент последнего такого обновления (0, если его ещё не было)
 */
export function useProducts() {
  const [state, setState] = useState<ProductsState>({ status: 'loading' });

  // Контроллер текущего запроса: переживает рендеры, не триггерит ре-рендер.
  const controllerRef = useRef<AbortController | null>(null);

  // Момент последней успешной загрузки — точка отсчёта для фонового обновления.
  const loadedAtRef = useRef(0);

  // Снимок товаров из последней успешной загрузки; '' — если такой загрузки ещё не было.
  const snapshotRef = useRef('');
  const [updatedAt, setUpdatedAt] = useState(0);

  /**
   * Загружает товары и обновляет состояние.
   *
   * @param options.silent - обновить без экрана загрузки; ошибка не выводится в UI.
   */
  const load = useCallback(async ({ silent = false }: LoadOptions = {}) => {
    controllerRef.current?.abort(); // отменяем предыдущий запрос, если висит
    const controller = new AbortController();
    controllerRef.current = controller;

    const signal = AbortSignal.any([
      controller.signal, // ручная отмена (размонтирование / retry)
      AbortSignal.timeout(REQUEST_TIMEOUT_MS), // таймаут
    ]);

    if (!silent) setState({ status: 'loading' });
    try {
      const products = await fetchProducts(signal);
      const snapshot = JSON.stringify(products);
      const changed = snapshotRef.current !== '' && snapshotRef.current !== snapshot;

      snapshotRef.current = snapshot;
      loadedAtRef.current = Date.now();
      setState({ status: 'ready', products });
      if (silent && changed) setUpdatedAt(Date.now());
    } catch (error) {
      if (controller.signal.aborted) return; // ручная отмена — игнор
      console.error(error);
      if (silent) return; // ошибка фонового обновления не показывается, остаются старые данные
      const isTimeout = error instanceof DOMException && error.name === 'TimeoutError';
      setState({ status: 'error', reason: isTimeout ? 'timeout' : 'network' });
    }
  }, []);

  // Обёртка, чтобы наружу не торчала форма аргументов load, в retry остаётся () => void.
  const retry = useCallback(() => load(), [load]);

  // Для первой загрузки данных.
  useEffect(() => {
    load();
    return () => controllerRef.current?.abort();
  }, [load]);

  // Для фонового обновления данных.
  useEffect(() => {
    if (state.status !== 'ready') return;

    function refreshIfStale() {
      if (document.visibilityState !== 'visible') return;
      if (Date.now() - loadedAtRef.current < DATA_STALE_AFTER_MS) return;
      load({ silent: true });
    }

    document.addEventListener('visibilitychange', refreshIfStale);
    return () => document.removeEventListener('visibilitychange', refreshIfStale);
  }, [load, state.status]);

  return { state, retry, updatedAt };
}
