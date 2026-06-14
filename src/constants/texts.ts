/** Все тексты UI в одном месте (ТЗ §4.5). */

export const texts = {
  title: 'Витрина топовой косметики',
  filterPlaceholder: 'Категории',
  counter: (shown: number, total: number) => `Показано ${shown} из ${total}`,
  imageFallback: 'Картинки нет: работает VPN\nили просто не повезло',
  copied: 'Скопировано',
  error: {
    timeout: {
      title: 'Сервер долго не отвечает',
      description: 'Попробуй ещё раз.',
    },
    network: {
      title: 'Не удалось загрузить данные',
      description: 'Проверь соединение и попробуй ещё раз.',
    },
  },
  noData: {
    title: 'Товаров пока нет',
    description: 'Список пуст',
  },
  emptyFilter: {
    title: 'Такого нет',
    description: 'Поменяй фильтры',
  },
  retry: 'Повторить',
};
