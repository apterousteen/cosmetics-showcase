import { Text } from '@mantine/core';
import { texts } from '../../constants/texts';
import classes from './Footer.module.css';

/** Подпись внизу страницы. */
export function Footer() {
  return (
    <Text component="footer" c="dimmed" size="sm" ta="center" className={classes.footer} pt="md">
      {texts.footer}
    </Text>
  );
}
