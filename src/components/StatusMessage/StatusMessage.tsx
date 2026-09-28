import { Anchor, Button, Center, Stack, Text, Title } from '@mantine/core';

type StatusMessageProps = {
  title: string;
  description?: string;
  /** Кнопка действия (например «Повторить» для ошибки сети). */
  action?: { label: string; onClick: () => void };
  /** Ссылка-контакт (например на tg разработчика). */
  contact?: { label: string; href: string };
  /** Уровень заголовка: 1, если сообщение заменяет собой содержимое страницы. */
  titleOrder?: 1 | 2;
};

/** Универсальный центрированный компонент-сообщение: ошибка / нет данных / пустой фильтр. */
export function StatusMessage({ title, description, action, contact, titleOrder = 2 }: StatusMessageProps) {
  return (
    <Center mih={240}>
      <Stack align="center" gap="xs">
        <Title order={titleOrder} size="h3" ta="center">
          {title}
        </Title>
        {description && (
          <Text c="dimmed" ta="center">
            {description}
          </Text>
        )}
        {contact && (
          <Anchor href={contact.href} target="_blank" rel="noopener">
            {contact.label}
          </Anchor>
        )}
        {action && (
          <Button variant="light" mt="xs" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </Stack>
    </Center>
  );
}
