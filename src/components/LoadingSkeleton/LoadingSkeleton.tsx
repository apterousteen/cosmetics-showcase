import { Card, Group, Skeleton, Stack } from '@mantine/core';
import { CardsGrid } from '../CardsGrid/CardsGrid';
import classes from './LoadingSkeleton.module.css';

/** С запасом: лишние ряды обрежет обёртка div.cropFade в Showcase, точное число не важно */
const MAX_SKELETONS = 24;

/**
 * Скелетон экрана загрузки: заглушка фильтра + сетка карточек под вид {@link ProductCard}.
 */
export function LoadingSkeleton() {
  return (
    <>
      <Skeleton h={36} mb="xs" />
      <Skeleton h={14} width={120} mb="lg" />
      <CardsGrid>
        {Array.from({ length: MAX_SKELETONS }, (_, i) => i).map((i) => (
          <Card withBorder key={i} className={classes.card}>
            <Skeleton h={200} radius="lg" mb="md" />

            <Stack gap="xs" flex={1}>
              <Skeleton height={18} width="70%" />
              <Skeleton height={14} />
              <Group justify="space-between" align="center" mt="auto">
                <Skeleton height={18} width={50} />
                <Skeleton height={22} width={70} radius="xl" />
              </Group>
            </Stack>
          </Card>
        ))}
      </CardsGrid>
    </>
  );
}
