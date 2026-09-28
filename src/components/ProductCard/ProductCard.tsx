import { ActionIcon, Badge, Card, CopyButton, Group, Stack, Text, Tooltip } from '@mantine/core';
import { Check, Copy } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import type { Product } from '../../api/types';
import { texts } from '../../constants/texts';
import { rememberAnchor } from '../../utils/history';
import { resolveCardColors } from '../../utils/resolveCardColors';
import { ProductImage } from '../ProductImage/ProductImage';
import classes from './ProductCard.module.css';

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

/**
 * Карточка товара: фото, название, комментарий, цена, бейдж.
 *
 * Ссылок две (фото и название), а не оверлей на всю карточку, чтобы не ломать выделение текста.
 */
export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { id, name, comment, price, category, imageURL, mantineColorBg } = product;
  const { color, style } = resolveCardColors(mantineColorBg);
  const [location] = useLocation();

  const href = `/product/${encodeURIComponent(id)}`;

  function handleNavigate() {
    rememberAnchor(id);
  }

  return (
    <Card withBorder className={classes.card} style={style} data-product-id={id}>
      <Card.Section>
        <Link
          href={href}
          state={{ from: location }}
          onClick={handleNavigate}
          className={classes.imageLink}
          tabIndex={-1}
          aria-hidden="true"
        >
          <ProductImage src={imageURL} alt="" />
        </Link>
      </Card.Section>

      <Stack gap="xs" flex={1}>
        <Text size="lg" fw={600} className={classes.name}>
          <Link href={href} state={{ from: location }} onClick={handleNavigate} className={classes.nameLink}>
            {name}
          </Link>

          <span className={classes.copyGlue}>
            {' '}
            <CopyButton value={`${category} ${name}`}>
              {({ copied, copy }) => (
                <Tooltip position="top" color="gray.8" label={texts.copied} opened={copied}>
                  <ActionIcon
                    variant="subtle"
                    size="md"
                    color={color}
                    aria-label={texts.copyNameOf(category, name)}
                    onClick={copy}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </span>
        </Text>

        {!compact && comment && (
          <Text size="md" c="var(--mantine-color-text)" className={classes.comment}>
            {comment}
          </Text>
        )}

        <Group justify="space-between" align="center" mt="auto">
          {price && <Text fw={600}>≈ {price} ₽</Text>}
          <Badge color={color} fw={600} variant="light">
            {category}
          </Badge>
        </Group>
      </Stack>
    </Card>
  );
}
