export type ShareResult = 'shared' | 'cancelled' | 'copied' | 'failed';

/**
 * Отдаёт ссылку системной шторке «Поделиться», а где её нет — кладёт в буфер обмена.
 *
 * Буфер тоже доступен не всегда: в небезопасном контексте (http) его API нет вовсе, а на https запись отклоняется, если документ не в фокусе.
 *
 * @returns `shared` — ссылка ушла в шторку; `cancelled` — шторку закрыли, реагировать не на что; `copied` — ссылка в буфере; `failed` — записать в буфер не вышло
 */
export async function shareOrCopy(title: string, url: string): Promise<ShareResult> {
  if (navigator.share) {
    try {
      await navigator.share({ title, url });
      return 'shared';
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled';
      console.error(error);
    }
  }

  // Шторки нет или она упала с ошибкой — остаётся буфер.
  try {
    await navigator.clipboard.writeText(url);
    return 'copied';
  } catch (error) {
    console.error(error);
    return 'failed';
  }
}
