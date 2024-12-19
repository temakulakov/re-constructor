# FINCH-CLOUD React Constructor

## [Архитектура проекта](docs/architecture.md)

## [Codestyle](docs/codestyle.md)

## [Gitflow](docs/gitflow.md)

## Локальный запуск

### Добавление CMS endpoint'а:

```
export CMS_ENDPOINT=<url админки>
export CMS_ENDPOINT=https://moex-cms.dev.finch.fm
```

### Добавление авторизационного токена для публикации/установки пакетов:

Авторизационный токен можно взять отсюда https://git.finch.fm/finch-cloud/react-constructor/-/settings/ci_cd -> раздел Variables

Linux-подобные OS - ввести в терминале:

```bash
export AUTH_TOKEN=<токен>
```

Для того, чтобы использовать пакеты @finch-cloud/\* в других проектах, добавьте файл `.npmrc` к себе в проект, добавьте авторизационный токен и установите необходимые пакеты через npm

### Установка зависимостей и запуск локального dev сервера:

```bash
npm i
npm run dev
```
