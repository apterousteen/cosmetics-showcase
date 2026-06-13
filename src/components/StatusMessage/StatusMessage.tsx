/** Универсальный экран-сообщение: ошибка сети / нет данных / пустой фильтр. */
type StatusMessageProps = {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
};

export function StatusMessage(_props: StatusMessageProps) {
  // TODO(этап 3): верстка сообщения + опциональная кнопка.
  return null;
}
