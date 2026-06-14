/** Источник данных и настройки сетки (ТЗ §3.3, §4.7). */

/** ID Google-таблицы и имя листа. */
export const SPREADSHEET_ID = '1TJYya22wVhmdhmQi4LtsxoNUKgDS9GlCuwiakYOuVSQ';
export const SHEET_NAME = 'rawData';

/** gviz-эндпоинт листа в формате CSV. */
export const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;

/** Колонки сетки по брейкпоинтам */
export const GRID_COLS = { base: 1, sm: 2, lg: 4 };

/** Таймаут запроса CSV, мс (по истечении — «ошибка сети»). */
export const REQUEST_TIMEOUT_MS = 8000;
