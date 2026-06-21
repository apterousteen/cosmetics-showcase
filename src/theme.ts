import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'pink',
  black: '#2e2e2e',
  // Один шрифт на всё (заголовки наследуют fontFamily).
  fontFamily: '"Nunito Sans", sans-serif',
});
