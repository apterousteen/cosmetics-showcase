import { Button, Text } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'wouter';
import { ProductDetails } from '../../components/ProductDetails/ProductDetails';
import { ProductSkeleton } from '../../components/ProductSkeleton/ProductSkeleton';
import { StatusMessage } from '../../components/StatusMessage/StatusMessage';
import { texts } from '../../constants/texts';
import { useCatalog } from '../../context/CatalogContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { getHistoryState } from '../../utils/history';
import classes from './Product.module.css';

/** Страница товара: возврат к витрине и сам товар. */
export function Product() {
  const { id } = useParams<{ id: string }>();
  const { state, retry, products } = useCatalog();

  // Товары общие для всех страниц: при переходе с витрины товар уже здесь, по прямой ссылке — только после загрузки.
  const product = products.find((item) => item.id === id);

  // Если предыдущая запись истории — витрина, кнопка возвращается назад, а не переходит заново:
  // так восстанавливается прокрутка и не растёт стек истории.
  const cameFromShowcase = getHistoryState().from === '/';

  useDocumentTitle(product ? texts.productTitle(product.category, product.name) : texts.siteTitle);

  const backProps = cameFromShowcase ? { onClick: () => history.back() } : { component: Link, href: '/' };

  return (
    <div className={classes.page}>
      <Text fz={20} fw={700} lh="var(--mantine-h2-line-height)" mb="xs">
        {texts.productPageTitle}
      </Text>

      <Button variant="subtle" leftSection={<ArrowLeft size={16} />} mb="lg" w="fit-content" {...backProps}>
        {texts.toFullShowcase}
      </Button>

      {state.status === 'loading' && <ProductSkeleton />}
      {state.status === 'error' && (
        <StatusMessage {...texts.error[state.reason]} action={{ label: texts.retry, onClick: retry }} />
      )}
      {state.status === 'ready' &&
        (product ? <ProductDetails product={product} /> : <StatusMessage {...texts.productNotFound} />)}
    </div>
  );
}
