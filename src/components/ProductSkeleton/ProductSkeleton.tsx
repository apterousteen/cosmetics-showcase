import { Card, Group, Skeleton, Stack } from '@mantine/core';
import { CardSkeleton } from '../CardSkeleton/CardSkeleton';
import classes from '../ProductDetails/ProductDetails.module.css';
import rowClasses from '../Recommendations/Recommendations.module.css';

export function ProductSkeleton() {
  return (
    <>
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

      <div className={rowClasses.section}>
        <Skeleton height={22} width={160} mb="sm" />

        <div className={`${rowClasses.row} ${rowClasses.cropFade}`}>
          {Array.from({ length: 4 }, (_, index) => index).map((index) => (
            <div className={rowClasses.item} key={index}>
              <CardSkeleton compact />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
