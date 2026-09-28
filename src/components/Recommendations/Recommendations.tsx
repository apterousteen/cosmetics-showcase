import { Title } from '@mantine/core';
import type { Product } from '../../api/types';
import { texts } from '../../constants/texts';
import { ProductCard } from '../ProductCard/ProductCard';
import classes from './Recommendations.module.css';

type RecommendationsProps = {
  products: Product[];
};

/** Горизонтальный ряд других товаров под карточкой. Пустой список ничего не рисует. */
export function Recommendations({ products }: RecommendationsProps) {
  if (products.length === 0) return null;

  return (
    <section className={classes.section}>
      <Title order={2} size="h4" mb="sm">
        {texts.recommendations}
      </Title>
      <ul className={classes.row}>
        {products.map((product) => (
          <li className={classes.item} key={product.id}>
            <ProductCard product={product} compact />
          </li>
        ))}
      </ul>
    </section>
  );
}
