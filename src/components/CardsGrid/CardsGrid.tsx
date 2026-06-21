import { SimpleGrid } from '@mantine/core';
import type { ReactNode } from 'react';
import { GRID_COLS } from '../../constants/config';

type CardsGridProps = {
  children: ReactNode;
};

/** Адаптивная сетка карточек для товаров и скелетонов. */
export function CardsGrid({ children }: CardsGridProps) {
  return (
    <SimpleGrid spacing="md" cols={GRID_COLS}>
      {children}
    </SimpleGrid>
  );
}
