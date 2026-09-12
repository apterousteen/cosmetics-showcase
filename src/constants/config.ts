/** Источник данных и настройки сетки. */

/** ID Google-таблицы и имя листа. */
export const SPREADSHEET_ID = '1TJYya22wVhmdhmQi4LtsxoNUKgDS9GlCuwiakYOuVSQ';
export const SHEET_NAME = 'rawData';

/** gviz-эндпоинт листа в формате CSV. */
export const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;

/** Колонки сетки по брейкпоинтам */
export const GRID_COLS = { base: 1, sm: 2, lg: 4 };

/** Таймаут запроса CSV, мс (по истечении — «ошибка сети»). */
export const REQUEST_TIMEOUT_MS = 8000;

/** Таймаут загрузки картинки товара, мс (по истечении — плашка-фолбек). */
export const IMAGE_TIMEOUT_MS = 5000;

/** Минимальный интервал между фоновыми обновлениями данных, мс. */
export const DATA_STALE_AFTER_MS = 5 * 60 * 1000;

/** Длительность показа уведомления о фоновом обновлении данных, мс. */
export const UPDATE_NOTIFICATION_MS = 5000;
