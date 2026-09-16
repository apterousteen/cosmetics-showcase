import { ActionIcon, Badge, Card, CopyButton, Group, Stack, Text, Title, Tooltip } from '@mantine/core';
import { Check, Copy, Share2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Product } from '../../api/types';
import { COPIED_TOOLTIP_MS } from '../../constants/config';
import { texts } from '../../constants/texts';
import { resolveCardColors } from '../../utils/resolveCardColors';
import { shareOrCopy } from '../../utils/share';
import { ProductImage } from '../ProductImage/ProductImage';
import classes from './ProductDetails.module.css';

type ProductDetailsProps = {
  product: Product;
};

type ShareNotification = 'copied' | 'failed';

/** Крупный блок товара на его странице: фото, название, комментарий, цена, бейдж. Есть 2 кнопки: поделиться и копирования категории + названия. */
export function ProductDetails({ product }: ProductDetailsProps) {
  const { name, comment, price, category, imageURL, mantineColorBg } = product;
  const { color, badgeBg, style } = resolveCardColors(mantineColorBg);

  const [shareNotification, setShareNotification] = useState<ShareNotification | null>(null);
  const notificationTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(notificationTimerRef.current), []);

  async function handleShare() {
    const result = await shareOrCopy(texts.productTitle(category, name), window.location.href);

    if (result === 'shared' || result === 'cancelled') return;

    setShareNotification(result);
    clearTimeout(notificationTimerRef.current);
    notificationTimerRef.current = setTimeout(() => setShareNotification(null), COPIED_TOOLTIP_MS);
  }

  return (
    <Card withBorder className={classes.card} style={style}>
      <Tooltip
        label={shareNotification === 'failed' ? texts.linkCopyFailed : texts.linkCopied}
        opened={shareNotification !== null}
        color="rgba(0, 0, 0, 0.7)"
        position="left"
      >
        <ActionIcon
          className={classes.share}
          variant="light"
          size="lg"
          color={color}
          aria-label={texts.share}
          onClick={handleShare}
        >
          <Share2 size={18} />
        </ActionIcon>
      </Tooltip>

      <div className={classes.layout}>
        <ProductImage src={imageURL} alt={name} />

        <Stack gap="sm">
          <Group gap="xs" align="flex-start" wrap="nowrap">
            <Title order={1} size={24}>
              {name}
            </Title>

            <CopyButton value={`${category} ${name}`}>
              {({ copied, copy }) => (
                <Tooltip label={texts.copied} opened={copied} color="rgba(0, 0, 0, 0.7)" position="top-end">
                  <ActionIcon variant="subtle" size="lg" color={color} aria-label={texts.copyName} onClick={copy}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Group>

          {comment && (
            <Text size="md" c="var(--mantine-color-text)">
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
      </div>
    </Card>
  );
}
