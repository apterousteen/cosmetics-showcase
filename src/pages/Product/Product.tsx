import { Button, Text } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { useLayoutEffect, useMemo } from 'react';
import { Link, useParams } from 'wouter';
import { Footer } from '../../components/Footer/Footer';
import { ProductDetails } from '../../components/ProductDetails/ProductDetails';
import { ProductSkeleton } from '../../components/ProductSkeleton/ProductSkeleton';
import { Recommendations } from '../../components/Recommendations/Recommendations';
import { StatusMessage } from '../../components/StatusMessage/StatusMessage';
import { texts } from '../../constants/texts';
import { useCatalog } from '../../context/CatalogContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { getHistoryState } from '../../utils/history';
import { selectRecommendations } from '../../utils/selectRecommendations';
import classes from './Product.module.css';

/** Страница товара: возврат к витрине и сам товар. */
export function Product() {
  const { id } = useParams<{ id: string }>();
  const { state, retry, products } = useCatalog();

  // Чтобы товар не открывался на положении прокрутки витрины
  // Пустых зависимостей ([]) хватает потому, что Product перемонтируется на каждом товаре.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Товары общие для всех страниц: при переходе с витрины товар уже здесь, по прямой ссылке — только после загрузки.
  const currentIndex = products.findIndex((item) => item.id === id);
  const product = currentIndex === -1 ? undefined : products[currentIndex];

  // Если предыдущая запись истории — витрина, кнопка возвращается назад, а не переходит заново:
  // так восстанавливается прокрутка и не растёт стек истории.
  const cameFromShowcase = getHistoryState().from === '/';

  const recommendations = useMemo(
    () => (product ? selectRecommendations(products, currentIndex) : []),
    [products, currentIndex, product],
  );

  useDocumentTitle(product ? texts.productTitle(product.category, product.name) : texts.siteTitle);

  const loading = state.status === 'loading';

  const backProps = cameFromShowcase ? { onClick: () => history.back() } : { component: Link, href: '/' };

  return (
    <div className={loading ? classes.fitViewport : classes.page}>
      <Text fz={20} fw={700} lh="var(--mantine-h2-line-height)" mb="xs">
        {texts.productPageTitle}
      </Text>

      <Button variant="subtle" leftSection={<ArrowLeft size={16} />} mb="lg" w="fit-content" {...backProps}>
        {texts.toFullShowcase}
      </Button>

      {loading && (
        <div className={classes.cropFade}>
          <ProductSkeleton />
        </div>
      )}
      {state.status === 'error' && (
        <StatusMessage {...texts.error[state.reason]} action={{ label: texts.retry, onClick: retry }} />
      )}
      {state.status === 'ready' &&
        (product ? (
          <>
            <ProductDetails product={product} />
            <Recommendations products={recommendations} />
          </>
        ) : (
          <StatusMessage {...texts.productNotFound} />
        ))}

      {!loading && <Footer />}
    </div>
  );
}
