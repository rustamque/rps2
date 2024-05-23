# Лабораторная работа №3

Студент И. С. Рябченко, группа 425

Разработка веб-приложения для работы с программой Блочной сортировки, реализованной в рамках 2 лабораторной с интеграцией базы данных.

http://bucket-sort.ru/ - веб-приложение развернутое на сервере.

## Технологический стек

- Django
- DRF
- React
- Bootstrap
- Docker
- PostgreSQL
- Nginx
- pytest-django

## Локальный запуск
**Docker:**

`$ docker-compose -f docker-compose.dev.yml up --build -d`

**Django:**

1. Создать виртуальное окружение:

`$ python3 -m venv .venv`

2. Активировать виртуальное окружение:

`$ source .venv/bin/activate`

3. Установить зависимости:

`$ pip install -r requirements.txt`

4. Применить миграции:

`$ python manage.py migrate`

5. Запустить локальный сервер:

`$ python manage.py runserver`

API будет доступен на **localhost:8000/api/**.

**React:**

1. Установить зависимости:

`$ yarn install`

2. Запустить локальный сервер:

`$ yarn start`

Приложение будет доступно на **localhost:3000**.

## Тесты

По условию задачи были реализованы программные тесты работы с базой данных:

- Добавление 100, 1000, 10000 случайных массивов;
- Выгрузка и сортировка 100, 1000, 10000 случайных массивов;
- Удаление 100, 1000, 10000 случайных массивов;

Для написания тестов использовался **pytest-django**.

**Запуск тестов (внутри директории с Django-проектом):**

`$ pytest`

**Пример результатов:**

![Результат запуска тестов](https://i.imgur.com/aa6yzJT.png)

## Переменные окружения

Переменные окружения представлены внутри **docker-compose**, для локального запуска создайте файл **.env** указав следующие значения:

```
DJANGO_SECRET_KEY=secret_key
REACT_APP_API_URL=domain.com

[POSTGRESQL // НЕОБЯЗАТЕЛЬНО]
DJANGO_DB_HOST=postgres
DJANGO_DB_NAME=postgres
DJANGO_DB_USER=postgres
DJANGO_DB_PASSWORD=postgres
DJANGO_DB_PORT=5432
```

Обратите внимание, что для локального запуска по умолчанию используется **SQLite**, для запуска с **PostgreSQL**, укажите необходимые переменные внутри **.env**.

Сгенерировать **DJANGO_SECRET_KEY**:

`$ openssl rand -hex32`
