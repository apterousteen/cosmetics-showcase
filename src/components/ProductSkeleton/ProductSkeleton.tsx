import { Card, Group, Skeleton, Stack } from '@mantine/core';
import classes from '../ProductDetails/ProductDetails.module.css';

export function ProductSkeleton() {
  return (
    <Card withBorder className={classes.skeletonCard}>
      <Skeleton className={classes.share} height={34} circle />

      <div className={classes.layout}>
        <Skeleton className={classes.mediaSkeleton} radius="lg" />

        <Stack gap="sm">
          <Skeleton height={26} width="60%" />
          <Skeleton height={16} />
          <Skeleton height={16} width="80%" />
          <Group justify="space-between" align="center">
            <Skeleton height={18} width={60} />
            <Skeleton height={22} width={90} radius="xl" />
          </Group>
        </Stack>
      </div>
    </Card>
  );
}
