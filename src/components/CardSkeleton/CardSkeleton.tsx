import { Card, Flex, Skeleton, Stack } from '@mantine/core';
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
        {compact ? (
          <Stack gap={4}>
            <Skeleton height={18} />
            <Skeleton height={18} width="60%" />
          </Stack>
        ) : (
          <>
            <Skeleton height={18} width="70%" />
            <Skeleton height={14} />
          </>
        )}
        <Flex
          mt="auto"
          gap="xs"
          direction={compact ? 'column' : 'row'}
          align={compact ? 'flex-start' : 'center'}
          justify={compact ? 'flex-start' : 'space-between'}
        >
          <Skeleton height={18} width={50} />
          <Skeleton height={18} width={70} radius="xl" />
        </Flex>
      </Stack>
    </Card>
  );
}
