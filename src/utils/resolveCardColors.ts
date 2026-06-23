import { DEFAULT_THEME } from '@mantine/core';
import type { CSSProperties } from 'react';

/** Цвет по умолчанию, когда mantineColorBg пустой или неизвестен. */
const DEFAULT_COLOR = 'pink';

/** Имена цветов из Mantine-палитры. */
const VALID_COLORS = new Set(Object.keys(DEFAULT_THEME.colors));

/**
 * По имени Mantine-цвета собирает гамму карточки.
 *
 * Из одного цвета выводятся фон, рамка и текст (-9) той же палитры.
 * Частный случай — gray: его шкала сдвинута глубже.
 *
 * @param mantineColorBg - имя Mantine-цвета из таблицы
 * @returns color — имя цвета (для Badge); badgeBg — фон бейджа для gray; style — CSS-переменные для .card
 */
export function resolveCardColors(mantineColorBg: string): {
  color: string;
  badgeBg?: string;
  style: CSSProperties;
} {
  const requested = mantineColorBg || DEFAULT_COLOR;
  const color = VALID_COLORS.has(requested) ? requested : DEFAULT_COLOR;

  const isGray = color === 'gray';
  const bg = isGray ? 1 : 0;
  const shade = isGray ? 3 : 1;

  return {
    color,
    // У gray variant="light" бейджа почти белый — задаём фон глубже (-3).
    badgeBg: isGray ? `var(--mantine-color-${color}-3)` : undefined,
    style: {
      '--card-bg': `var(--mantine-color-${color}-${bg})`,
      '--card-shade': `var(--mantine-color-${color}-${shade})`,
      '--card-text': `var(--mantine-color-${color}-9)`,
    } as CSSProperties,
  };
}
