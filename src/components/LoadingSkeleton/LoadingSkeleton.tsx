import { Skeleton } from '@mantine/core';
import { CardSkeleton } from '../CardSkeleton/CardSkeleton';
import { CardsGrid } from '../CardsGrid/CardsGrid';

/** С запасом: лишние ряды обрежет обёртка div.cropFade в Showcase, точное число не важно. */
const MAX_SKELETONS = 24;

/** Скелетон экрана загрузки: заглушка фильтра + сетка карточек. */
export function LoadingSkeleton() {
  return (
    <>
      <Skeleton h={36} mb="xs" />
      <Skeleton h={14} width={120} mb="lg" />
      <CardsGrid>
        {Array.from({ length: MAX_SKELETONS }, (_, i) => i).map((i) => (
          <CardSkeleton key={i} />
        ))}
      </CardsGrid>
    </>
  );
}
