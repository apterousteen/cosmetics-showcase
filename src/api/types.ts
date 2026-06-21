/** Один товар после нормализации. */
export type Product = {
  id: string;
  category: string;
  name: string;
  price: string;
  comment: string;
  imageURL: string;
  /** Имя Mantine-цвета для гаммы карточки (по умолчанию pink). */
  mantineColorBg: string;
};
