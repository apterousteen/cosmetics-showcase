/** Состояние записи истории: `anchorId` — якорь товара для возврата на витрину, `from` — путь, с которого открыли страницу. */
type HistoryState = {
  anchorId: string | null;
  from: string | null;
};

const EMPTY_HISTORY_STATE: HistoryState = { anchorId: null, from: null };

/** Читает состояние текущей записи истории. */
export function getHistoryState(): HistoryState {
  const state: unknown = history.state;
  if (state === null || typeof state !== 'object') return EMPTY_HISTORY_STATE;

  // в `history.state` может лежать что угодно, поэтому поля проверяются по одному
  const record = state as Record<string, unknown>;
  return {
    anchorId: typeof record.anchorId === 'string' ? record.anchorId : null,
    from: typeof record.from === 'string' ? record.from : null,
  };
}

/**
 * Запоминает карточку витрины, к которой нужно вернуть прокрутку.
 *
 * replaceState, потому что URL не меняется и новая запись не нужна.
 */
export function rememberAnchor(id: string) {
  const { from } = getHistoryState();
  history.replaceState({ from, anchorId: id }, '');
}

/**
 * После прокрутки на нужную карточку удаляет якорь из истории, чтобы перезагрузка страницы не кидала на старый якорь.
 */
export function forgetAnchor() {
  const { from } = getHistoryState();
  history.replaceState({ from }, '');
}
