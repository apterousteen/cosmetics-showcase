import { Badge, Card, Center, CopyButton, Group, Stack, Text, Tooltip } from '@mantine/core';
import { useEffect, useState } from 'react';
import type { Product } from '../../api/types';
import { IMAGE_TIMEOUT_MS } from '../../constants/config';
import { texts } from '../../constants/texts';
import { resolveCardColors } from '../../utils/resolveCardColors';
import classes from './ProductCard.module.css';

type ProductCardProps = {
  product: Product;
};

type ImageStatus = 'loading' | 'loaded' | 'broken';

/**
 * Карточка товара: фото, название, комментарий, цена, бейдж.
 *
 * - Битая картинка заменяется пастельной плашкой-фолбеком.
 * - Нажатие названия копирует категорию и название.
 */
export function ProductCard({ product }: ProductCardProps) {
  const { name, comment, price, category, imageURL, mantineColorBg } = product;
  const { color, style } = resolveCardColors(mantineColorBg);
  // Картинки часто не отдаются (российские CDN + VPN)
  // битые/висящие картинки → фолбек (onError + таймаут)
  const [imageStatus, setImageStatus] = useState<ImageStatus>('loading');
  const showImage = imageURL !== '' && imageStatus !== 'broken';

  useEffect(() => {
    if (!showImage || imageStatus === 'loaded') return;
    const id = setTimeout(() => setImageStatus('broken'), IMAGE_TIMEOUT_MS);
    return () => clearTimeout(id);
  }, [showImage, imageStatus]);

  return (
    <Card withBorder className={classes.card} style={style}>
      <Card.Section className={classes.imageWrapper}>
        {showImage ? (
          <img
            src={imageURL}
            alt={name}
            className={classes.image}
            onLoad={() => setImageStatus('loaded')}
            onError={() => setImageStatus('broken')}
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
          <Badge color={color} fw={600} variant="light">
            {category}
          </Badge>
        </Group>
      </Stack>
    </Card>
  );
}
