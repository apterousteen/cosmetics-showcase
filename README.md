# Витрина топового косметоса 💜

— то, что хочется купить второй раз

Дата создания: 06.2026

Ссылка: https://apterousteen.github.io/cosmetics-showcase

## Возможности

- каталог товаров с фото, примерной ценой, категорией и личным комментарием
- фильтр по категориям (мультиселект + поиск)
- копирование названия товара по нажатию
- динамический цвет карточек

## Зачем и как

Proof of concept: собрать живой сайт-каталог без админки, бэкенда и базы данных.

Роль БД играет публичная Google-таблица. Сайт берёт данные через [gviz-эндпоинт](https://developers.google.com/chart/interactive/docs/querylanguage) в формате CSV. Их мало, так что фильтрация на клиенте.

Чтобы добавить или поправить запись, я просто редактирую таблицу: деплой не нужен.

## Стек

- React + Vite + TypeScript
- [Mantine](https://mantine.dev/) — UI
- [PapaParse](https://www.papaparse.com/) — парсинг CSV
- [Biome](https://biomejs.dev/) — линт/формат
- GitHub Pages — хостинг

## Скриншоты

<img src="#" alt="desktop" width="77%">
<img src="#" alt="mobile" width="21.74%">
