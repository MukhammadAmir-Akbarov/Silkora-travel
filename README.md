# SILKORA TRAVEL

Премиальный лендинг турагентства (Узбекистан) на **Next.js 16 + Tailwind v4**, трёхъязычный (**RU / EN / UZ**), с **AI-планировщиком маршрутов** на Anthropic Claude.

Стиль — из брендбука: gold `#D4AF37` / black `#0D0D0D` / white, шрифты Cinzel + Playfair Display + Montserrat + Great Vibes.

---

## Деплой (показать сайт другим)

Самый быстрый способ получить публичную ссылку — **Vercel** (бесплатно, родной хостинг для Next.js):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MukhammadAmir-Akbarov/Silkora-travel)

1. Нажмите кнопку выше → войдите через GitHub → импортируйте репозиторий.
2. (Необязательно) добавьте `ANTHROPIC_API_KEY` в **Environment Variables**, чтобы включить реальный AI-планировщик. Без него сайт работает в демо-режиме.
3. Через ~1 минуту получите ссылку вида `https://silkora-travel.vercel.app` — её можно отправлять кому угодно.

---

## Запуск

```bash
npm install
cp .env.example .env.local   # заполните ключи (необязательно для старта)
npm run dev                  # http://localhost:3000  → редирект на /ru
```

Сборка / прод:

```bash
npm run build
npm run start
```

Локали: `/ru` (по умолчанию), `/en`, `/uz`.

---

## Переменные окружения (`.env.local`)

| Переменная | Назначение |
|---|---|
| `ANTHROPIC_API_KEY` | Включает реальный AI-планировщик. **Без неё** работает демо-режим (пример маршрута). |
| `ANTHROPIC_MODEL` | Необязательно. По умолчанию `claude-sonnet-4-6`. Альтернативы: `claude-opus-4-8` (макс. качество), `claude-haiku-4-5-20251001` (дешевле). |
| `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` | Заявки падают в Telegram-чат (рекомендуется). Бот создаётся через @BotFather. |
| `RESEND_API_KEY` + `LEAD_EMAIL` | Альтернатива — заявки на email через [Resend](https://resend.com). |

Если канал не настроен — заявки пишутся в консоль сервера (ничего не теряется).

---

## Структура

```
app/[locale]/        # layout (шрифты, i18n) + page (сборка секций)
app/api/plan         # AI-планировщик (стриминг Claude)
app/api/lead         # приём заявок (Telegram / email / консоль)
components/           # секции лендинга + ui/ примитивы
lib/                  # prompts, anthropic, leads, site (контакты), constants
messages/             # ru.json, en.json, uz.json — весь текст
public/brand/         # логотипы
public/destinations/  # фото направлений
i18n/                 # routing, request, navigation (next-intl)
proxy.ts              # локаль-роутинг (бывш. middleware)
```

## Что заменить на реальные данные

- **Контакты и соцсети** — `lib/site.ts` (сейчас плейсхолдеры: телефон, email, Instagram, Telegram, WhatsApp).
- **Тексты/отзывы/статистику** — `messages/*.json`.
- **Логотип** — для максимального качества положите прозрачный PNG/SVG (сейчас используется `public/brand/logo.jpg`).
- **Фото направлений** — `public/destinations/*` (источники: Wikimedia Commons (CC) для Самарканда/Бухары/Хивы, Unsplash для Мальдив/Дубая/Турции/hero). Перед коммерческим запуском проверьте лицензии/атрибуцию или замените на свои фото.

---

## Деплой

Vercel: импортируйте проект, добавьте env-переменные в настройках, deploy. Локали и API-роуты работают из коробки.

---

## Дорожная карта AI (фаза 2)

AI чат-консультант 24/7 (сайт + Telegram/WhatsApp бот) · AI-визовый ассистент · генератор постов для соцсетей в gold/black стиле · мониторинг цен · AI-аудиогид по Шёлковому пути · CMS для каталога туров · блог · онлайн-оплата.
