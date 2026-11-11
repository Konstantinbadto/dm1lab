# Архитектура проекта — Collection Tracker

## Контекст
Collection Tracker — REST API для ведения личных коллекций книг, винила и настольных игр. ЛР1 описывает предметную область и модель данных, ЛР2 — REST API и OpenAPI 3.0. Этот этап создаёт каркас серверного приложения.

## Слои
- **API / Transport**: `routes/`, `controllers/` — HTTP-маршрутизация, разбор запроса и формирование ответа.
- **Service / Application**: `services/` — сценарии приложения; не должен зависеть от Express, HTTP-заголовков или JSON-формата.
- **Repository / Data Access**: `repositories/` — слой доступа к хранилищу; в текущей работе подготовлена заготовка.
- **Configuration**: `config/` — чтение и проверка параметров окружения.
- **Composition / Entry point**: `app.ts`, `server.ts` — сборка приложения и запуск HTTP-сервера.

## Поток health-check
```text
HTTP Client
    |
    v
Route: /api/v1/health
    |
    v
Controller
    |
    v
HealthService
    |
    v
JSON response: 200 OK
```

## Переменные окружения
- `APP_NAME` — имя сервиса;
- `APP_VERSION` — версия;
- `APP_ENV` — окружение;
- `HTTP_PORT` — порт.

Загрузка выполняется через `dotenv` в `src/config/env.ts`. Порт проверяется на целое число от 1 до 65535. `.env` находится в `.gitignore`, `.env.example` содержит только безопасные примерные значения.

## Health check
`GET /api/v1/health` возвращает `status`, `app_name`, `version`, `environment`, `uptime_seconds`. Это проверка доступности процесса; readiness-проверка зависимостей, например PostgreSQL, может быть добавлена после подключения БД.

## Инверсия зависимостей
Контроллер вызывает сервис, а не содержит бизнес-правила. При добавлении функциональности сервисы должны зависеть от интерфейсов репозиториев, а конкретные реализации БД подключаются на внешнем уровне приложения.
