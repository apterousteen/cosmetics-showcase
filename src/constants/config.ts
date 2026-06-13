/** Источник данных и настройки сетки (ТЗ §3.3, §4.7). */

/** gviz CSV листа rawData. */
export const CSV_URL =
  'https://docs.google.com/spreadsheets/d/1TJYya22wVhmdhmQi4LtsxoNUKgDS9GlCuwiakYOuVSQ/gviz/tq?tqx=out:csv&sheet=rawData';

/** Колонки сетки по брейкпоинтам (этап 6, подкрутить вживую). */
export const GRID_COLS = { base: 2, sm: 4, lg: 6 };

/** Таймаут запроса CSV, мс (по истечении — «ошибка сети»). */
export const REQUEST_TIMEOUT_MS = 8000;
