import { Text, Title } from '@mantine/core';
import type { ReactNode } from 'react';
import { CardsGrid } from '../../components/CardsGrid/CardsGrid';
import { LoadingSkeleton } from '../../components/LoadingSkeleton/LoadingSkeleton';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { StatusMessage } from '../../components/StatusMessage/StatusMessage';
import { texts } from '../../constants/texts';
import { useProducts } from '../../hooks/useProducts';
import classes from './Showcase.module.css';

/**
 * Главный экран: шапка + контент по состоянию
 * (загрузка / ошибка / нет данных / список товаров).
 */
export function Showcase() {
  const { state, retry } = useProducts();
  const loading = state.status === 'loading';
  let content: ReactNode;

  if (state.status === 'loading') {
    content = <LoadingSkeleton />;
  } else if (state.status === 'error') {
    content = (
      <StatusMessage
        {...texts.error[state.reason]}
        action={{ label: texts.retry, onClick: retry }}
      />
    );
  } else if (state.products.length === 0) {
    // TODO (этап 5): различать «нет данных вообще» и «пусто после фильтра».
    content = <StatusMessage {...texts.noData} />;
  } else {
    content = (
      <CardsGrid>
        {state.products.map((product) => (
          // Название не уникально (один товар в разных категориях), поэтому ключ из пары
          <ProductCard key={`${product.category}-${product.name}`} product={product} />
        ))}
      </CardsGrid>
    );
  }

  /*
   Во время загрузки экран фиксируется по высоте (fitViewport)
   скелетоны обрезаются фейдом, чтобы не было скролла из пустых рядов
   */
  return (
    <div className={loading ? classes.fitViewport : undefined}>
      <Title order={1} size={28} mb="xs">
        {texts.title}
      </Title>
      <Text c="dimmed" mb="lg">
        {texts.subtitle}
      </Text>
      {loading ? <div className={classes.cropFade}>{content}</div> : content}
    </div>
  );
}
