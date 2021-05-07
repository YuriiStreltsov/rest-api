## Учебный проект REST-API написаный на Node.js

### О проекте

Это учебный проект, созданый во время обучения в компании
[GoIt](https://goit.ua/) на курсе Full-Stack Developer (Node.js). Используя
фреймворк `Express` создаётся Rest-Api приложение телефонной книги. Для хранения
данных использовалась база данных `MongoDB`.

### Основные возможности

В проекте реализованы следующие возможности:

#### для пользователя

1. регистрация, аутентификация и авторизация пользователя, используя електронную
   почту и пароль;
2. получение данных текущего пользователя
3. изменение статуса пользователя

#### для контактов

1. создание своего списка контактов после логина пользователя;
2. получение всех контактов и сортировка по полю "избранное"
3. обновление контакта
4. удаление контакта

### Маршруты REST_API

#### + For contacts

---

**GET**

`/contacts` - получение всех контактов пользователя 

`/contacts/:contactId` - получение контакта пользователя по ID

---

**POST**


`/contacts` - создание нового контакта пользователя

---

**PATCH**

`/contacts/:contactId` - обновление контакта пользователя 

`/:contactId/favorite` - обновление статуса поля "избранный"

---

**DELETE**

`/contacts/:contactId` - удаление контакта пользователя

#### **For contacts**

---

**GET**

`/users/current` - получение данных о текущем пользователе

---

**POST**

`/users/signup` - регистрация пользователя

`/users/login` - авторизация пользователя

`/users/logout` - разлогинивание пользователя

---
