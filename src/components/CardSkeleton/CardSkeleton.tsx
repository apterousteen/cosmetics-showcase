import { Card, Group, Skeleton, Stack } from '@mantine/core';
import classes from './CardSkeleton.module.css';

type CardSkeletonProps = {
  compact?: boolean;
};

/** Заглушка карточки товара. Повторяет пропорции настоящей карточки, чтобы её появление не сдвигало макет. */
export function CardSkeleton({ compact = false }: CardSkeletonProps) {
  return (
    <Card withBorder className={classes.card}>
      {/* Та же переменная, что в ProductImage — её переопределят снаружи. */}
      <Skeleton h="var(--card-media-h, 200px)" radius="lg" mb="md" />

      <Stack gap="xs" flex={1}>
        <Skeleton height={18} width="70%" />
        {!compact && <Skeleton height={14} />}
        <Group justify="space-between" align="center" mt="auto">
          <Skeleton height={18} width={50} />
          <Skeleton height={22} width={70} radius="xl" />
        </Group>
      </Stack>
    </Card>
  );
}
