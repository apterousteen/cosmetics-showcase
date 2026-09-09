import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * GitHub Pages — статический хостинг: адреса, которых нет среди файлов сборки
 * (например, прямой переход на маршрут SPA, отличный от "/"), сервер отдаёт
 * как 404.html. Копия index.html под этим именем превращает такой ответ
 * в точку входа приложения — дальше маршрутизацию по адресу берёт на себя
 * wouter (см. App.tsx), а на несовпавшем пути показывает NotFound.
 */
const dist = resolve(process.cwd(), 'dist');
copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'));
