import { Badge, Card, CopyButton, Group, Stack, Text, Tooltip } from '@mantine/core';
import type { Product } from '../../api/types';
import { texts } from '../../constants/texts';
import { resolveCardColors } from '../../utils/resolveCardColors';
import { ProductImage } from '../ProductImage/ProductImage';
import classes from './ProductCard.module.css';

type ProductCardProps = {
  product: Product;
};

/** Карточка товара: фото, название, комментарий, цена, бейдж. Нажатие названия копирует категорию и название. */
export function ProductCard({ product }: ProductCardProps) {
  const { name, comment, price, category, imageURL, mantineColorBg } = product;
  const { color, badgeBg, style } = resolveCardColors(mantineColorBg);

  return (
    <Card withBorder className={classes.card} style={style}>
      <Card.Section>
        <ProductImage src={imageURL} alt={name} />
      </Card.Section>

      <Stack gap="xs" flex={1}>
        <CopyButton value={`${category} ${name}`}>
          {({ copied, copy }) => (
            <Tooltip position="top-start" color="rgba(0, 0, 0, 0.7)" label={texts.copied} opened={copied}>
              <Text size="lg" fw={600} lineClamp={3} style={{ cursor: 'pointer' }} onClick={copy}>
                {name}
              </Text>
            </Tooltip>
          )}
        </CopyButton>
        {comment && (
          <Text size="md" c="var(--mantine-color-text)" lineClamp={5}>
            {comment}
          </Text>
        )}
        <Group justify="space-between" align="center" mt="auto">
          {price && <Text fw={600}>≈ {price} ₽</Text>}
          <Badge color={color} fw={600} variant="light" style={badgeBg ? { backgroundColor: badgeBg } : undefined}>
            {category}
          </Badge>
        </Group>
      </Stack>
    </Card>
  );
}
