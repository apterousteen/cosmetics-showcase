import { DEFAULT_THEME } from '@mantine/core';
import type { CSSProperties } from 'react';

/** Цвет по умолчанию, когда mantineColorBg пустой или неизвестен. */
const DEFAULT_COLOR = 'pink';

/** Имена цветов из Mantine-палитры. */
const VALID_COLORS = new Set(Object.keys(DEFAULT_THEME.colors));

/**
 * По имени Mantine-цвета собирает гамму карточки.
 *
 * Из одного цвета выводятся фон (-0), рамка (-1) и текст (-9) той же палитры.
 *
 * @param mantineColorBg - имя Mantine-цвета из таблицы
 * @returns color - имя цвета (для Badge); style — CSS-переменные для .card
 */
export function resolveCardColors(mantineColorBg: string): {
  color: string;
  style: CSSProperties;
} {
  const requested = mantineColorBg || DEFAULT_COLOR;
  const color = VALID_COLORS.has(requested) ? requested : DEFAULT_COLOR;
  return {
    color,
    style: {
      '--card-bg': `var(--mantine-color-${color}-0)`,
      '--card-shade': `var(--mantine-color-${color}-1)`,
      '--card-text': `var(--mantine-color-${color}-9)`,
    } as CSSProperties,
  };
}
