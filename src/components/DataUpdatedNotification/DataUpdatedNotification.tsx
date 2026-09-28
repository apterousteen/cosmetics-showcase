import { Affix, Notification, Transition } from '@mantine/core';
import { useEffect, useState } from 'react';
import { UPDATE_NOTIFICATION_MS } from '../../constants/config';
import { texts } from '../../constants/texts';
import { useCatalog } from '../../context/CatalogContext';
import classes from './DataUpdatedNotification.module.css';

/** Уведомление о фоновом обновлении данных. */
export function DataUpdatedNotification() {
  const { updatedAt } = useCatalog();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 0 — обновления с изменением данных ещё не было, в т.ч. при первой загрузке
    if (updatedAt === 0) return;

    setVisible(true);
    const id = setTimeout(() => setVisible(false), UPDATE_NOTIFICATION_MS);
    return () => clearTimeout(id);
  }, [updatedAt]);

  return (
    <Affix position={{ top: 20, left: '50%' }} style={{ transform: 'translateX(-50%)' }}>
      <Transition transition="slide-down" mounted={visible}>
        {(styles) => (
          <Notification
            style={styles}
            className={classes.root}
            withBorder
            radius="md"
            onClose={() => setVisible(false)}
          >
            {texts.dataUpdated}
          </Notification>
        )}
      </Transition>
    </Affix>
  );
}
