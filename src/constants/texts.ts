/** Все тексты UI в одном месте (ТЗ §4.5). */

export const texts = {
  title: 'Витрина топового косметоса 💅🏻',
  subtitle: 'Здесь продукты, которые я точно куплю второй раз',
  filterPlaceholder: 'Выбери категории',
  counter: (shown: number, total: number) => `Показано ${shown} из ${total}`,
  imageFallback: 'Картинки нет: работает VPN\nили просто не повезло',
  copied: 'Скопировано',
  error: {
    timeout: {
      title: 'Сервер долго не отвечает',
      description: 'Попробуй ещё раз',
    },
    network: {
      title: 'Не удалось загрузить данные',
      description: 'Проверь соединение и попробуй ещё раз',
    },
  },
  noData: {
    title: 'А где?',
    description: 'Что-то с источником данных, пни:',
    contact: { label: '@apterousteen', href: 'https://t.me/apterousteen' },
  },
  emptyFilter: {
    title: 'Ничего не нашлось',
    description: 'Попробуй поменять фильтры',
  },
  retry: 'Повторить',
};
