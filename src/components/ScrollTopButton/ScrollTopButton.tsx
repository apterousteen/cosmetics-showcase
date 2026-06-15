import { ActionIcon, Affix, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { ArrowUp } from 'lucide-react';

/**
 * Появляется при прокрутке вниз, по клику плавно возвращает к началу страницы.
 * */
export function ScrollTopButton() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(styles) => (
          <ActionIcon
            style={styles}
            size="xl"
            radius="lg"
            aria-label="Наверх"
            onClick={() => scrollTo({ y: 0 })}
          >
            <ArrowUp />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
}
