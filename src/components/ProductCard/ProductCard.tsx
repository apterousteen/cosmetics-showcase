import { Badge, Card, Center, CopyButton, Group, Stack, Text, Tooltip } from '@mantine/core';
import { useState } from 'react';
import type { Product } from '../../api/types';
import { texts } from '../../constants/texts';
import classes from './ProductCard.module.css';

type ProductCardProps = {
  product: Product;
};

/**
 * Карточка товара: фото, название, комментарий, цена, бейдж.
 *
 * - Битая картинка заменяется пастельной плашкой-фолбеком.
 * - Нажатие названия копирует категорию и название.
 */
export function ProductCard({ product }: ProductCardProps) {
  const { name, comment, price, category, imageURL } = product;
  // Картинки часто не отдаются (российские CDN + VPN) — ловим onError
  const [imageBroken, setImageBroken] = useState(false);
  const showImage = imageURL !== '' && !imageBroken;

  return (
    <Card withBorder className={classes.card}>
      <Card.Section className={classes.imageWrapper}>
        {showImage ? (
          <img
            src={imageURL}
            alt={name}
            loading="lazy"
            className={classes.image}
            onError={() => setImageBroken(true)}
          />
        ) : (
          <Center className={classes.imageFallback}>
            <Text>{texts.imageFallback}</Text>
          </Center>
        )}
      </Card.Section>

      <Stack gap="xs" flex={1}>
        <CopyButton value={`${category} ${name}`}>
          {({ copied, copy }) => (
            <Tooltip
              position="top-start"
              color="rgba(0, 0, 0, 0.7)"
              label={texts.copied}
              opened={copied}
            >
              <Text size="lg" fw={600} lineClamp={3} style={{ cursor: 'pointer' }} onClick={copy}>
                {name}
              </Text>
            </Tooltip>
          )}
        </CopyButton>
        {comment && (
          <Text size="md" c="dimmed" lineClamp={5}>
            {comment}
          </Text>
        )}
        <Group justify="space-between" align="center" mt="auto">
          {price && <Text fw={600}>≈ {price} ₽</Text>}
          <Badge color="pink" fw={600} variant="light">
            {category}
          </Badge>
        </Group>
      </Stack>
    </Card>
  );
}
