import { Text, Title } from '@mantine/core';
import type { ReactNode } from 'react';
import { CardsGrid } from '../../components/CardsGrid/CardsGrid';
import { CategoryFilter } from '../../components/CategoryFilter/CategoryFilter';
import { LoadingSkeleton } from '../../components/LoadingSkeleton/LoadingSkeleton';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ScrollTopButton } from '../../components/ScrollTopButton/ScrollTopButton';
import { StatusMessage } from '../../components/StatusMessage/StatusMessage';
import { texts } from '../../constants/texts';
import { useCatalog } from '../../context/CatalogContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import classes from './Showcase.module.css';

/** Страница витрины: список товаров с фильтром по категориям. */
export function Showcase() {
  const { state, retry, products, categories, selected, setSelected, filteredProducts } = useCatalog();

  useDocumentTitle(texts.siteTitle);

  const loading = state.status === 'loading';
  let content: ReactNode;

  if (state.status === 'loading') {
    content = <LoadingSkeleton />;
  } else if (state.status === 'error') {
    content = <StatusMessage {...texts.error[state.reason]} action={{ label: texts.retry, onClick: retry }} />;
  } else if (products.length === 0) {
    content = <StatusMessage {...texts.noData} />;
  } else {
    // Есть товары: фильтр виден всегда, под фильтром сетка или «ничего не нашлось»
    content = (
      <>
        <CategoryFilter categories={categories} value={selected} onChange={setSelected} />
        <Text size="sm" mb="lg">
          {texts.counter(filteredProducts.length, products.length)}
        </Text>
        {filteredProducts.length > 0 ? (
          <CardsGrid>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </CardsGrid>
        ) : (
          // Сейчас недостижимо, но понадобится, если добавим поиск
          <StatusMessage {...texts.emptyFilter} />
        )}
      </>
    );
  }

  /*
   Во время загрузки экран фиксируется по высоте (fitViewport)
   скелетоны обрезаются фейдом, чтобы не было скролла из пустых рядов
   */
  return (
    <div className={loading ? classes.fitViewport : classes.page}>
      <Title order={1} size={28} mb="xs">
        {texts.title}
      </Title>
      <Text mb="lg">{texts.subtitle}</Text>
      {loading ? <div className={classes.cropFade}>{content}</div> : content}
      {!loading && (
        <Text component="footer" c="dimmed" size="sm" ta="center" className={classes.footer} pt="md">
          {texts.footer}
        </Text>
      )}
      <ScrollTopButton />
    </div>
  );
}
