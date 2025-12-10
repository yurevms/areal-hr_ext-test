# areal-hr-test-2025

Веб-приложение для учета сотрудников в нескольких организациях.  
Специалист по кадрам может управлять организациями, отделами, должностями, сотрудниками, кадровыми операциями и пользователями.

---

## Стек технологий

**Frontend:**
- Vue.js 3.5
- Vite
- TypeScript
- ESLint + Prettier

**Backend:**
- Node.js 22
- NestJS 10
- PostgreSQL 17 (через Docker)
- pg (чистые SQL-запросы)
- node-pg-migrate
- Joi (валидация)
- TypeScript
- ESLint + Prettier
- @nestjs/passport (Passport Local Strategy)

**Инфраструктура:**
- Docker / Docker Compose
- Nginx
- VitePress (документация)
- Draw.io (схема базы данных)
- Git / GitHub

---

## Среда разработки

- Операционная система: Windows 11 с WSL2
- IDE: IntelliJ IDEA
- PostgreSQL: запуск через Docker-контейнер
- Node.js: установлен локально
- Git: работа через консоль и интеграцию IDE

---

## Git

Используется система контроля версий **Git**.

**Основные команды:**

```bash
# Клонировать репозиторий
git clone https://github.com/yurevms/areal-hr_ext-test.git

# Создать новую ветку для разработки
git checkout -b feature/<название_разработки>

# Проверить статус изменений
git status

# Добавить файлы к коммиту
git add .

# Сделать коммит с описанием изменений
git commit -m "Комментарий к комиту"

# Отправить ветку на GitHub
git push origin feature/<название_разработки>

# Слить ветку с master/main после проверки
git checkout main
git merge feature/<название_разрабокти>
git push origin main

