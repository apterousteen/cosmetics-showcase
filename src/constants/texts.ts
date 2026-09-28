/** Все тексты UI в одном месте. */

const SITE_TITLE = 'Витрина топового косметоса';
const TITLE_EMOJI = '💅🏻';
const NOT_FOUND = 'Такой страницы нет';

export const texts = {
  title: `${SITE_TITLE} ${TITLE_EMOJI}`,
  subtitle: 'Здесь продукты, которые я точно куплю второй раз',
  filterPlaceholder: 'Выбери категории',
  counter: (shown: number, total: number) => `Показано ${shown} из ${total}`,
  imageFallback: 'Картинки нет: работает VPN\nили просто не повезло',
  copied: 'Скопировано',
  copyName: 'Скопировать название',
  copyNameOf: (category: string, name: string) => `Скопировать название: ${category} ${name}`,
  share: 'Поделиться',
  linkCopied: 'Ссылка скопирована',
  linkCopyFailed: 'Не удалось скопировать ссылку',
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
  notFound: {
    title: NOT_FOUND,
    description: 'Ссылка битая или устарела',
  },
  siteTitle: SITE_TITLE,
  notFoundTitle: `${NOT_FOUND} | ${SITE_TITLE}`,
  productPageTitle: `Кусочек витрины косметоса ${TITLE_EMOJI}`,
  productTitle: (category: string, name: string) => `${category} ${name} | ${SITE_TITLE}`,
  productNotFound: {
    title: 'Такого товара нет',
    description: 'Ссылка битая или товар убрали из витрины',
  },
  recommendations: 'Ещё с витрины',
  toShowcase: 'К витрине',
  toFullShowcase: 'К полной витрине',
  dataUpdated: 'Данные обновились',
  retry: 'Повторить',
  footer: 'Made with love 💜 and Claude Opus 4.8',
};
