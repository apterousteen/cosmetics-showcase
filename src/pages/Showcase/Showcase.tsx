import { useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';

/**
 * Главный экран. Этап 2: пока просто логируем состояние данных в консоль.
 * Фильтр, сетка и экраны-состояния — следующие этапы.
 */
export function Showcase() {
  const { state } = useProducts();

  useEffect(() => {
    console.log('[products]', state);
  }, [state]);

  return null;
}
