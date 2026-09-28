export type ShareResult = 'shared' | 'cancelled' | 'copied' | 'failed';

/**
 * На телефоне отдаёт ссылку системной шторке «Поделиться», на десктопе кладёт её в буфер обмена.
 *
 * Буфер тоже доступен не всегда: в небезопасном контексте (http) его API нет вовсе, а на https запись отклоняется, если документ не в фокусе.
 *
 * @returns `shared` — ссылка ушла в шторку; `cancelled` — шторку закрыли, реагировать не на что; `copied` — ссылка в буфере; `failed` — записать в буфер не вышло
 */
export async function shareOrCopy(title: string, url: string): Promise<ShareResult> {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (navigator.share && isTouchDevice) {
    try {
      await navigator.share({ title, url });
      return 'shared';
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled';
      console.error(error);
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    return 'copied';
  } catch (error) {
    console.error(error);
    return 'failed';
  }
}
