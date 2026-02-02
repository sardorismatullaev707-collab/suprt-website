# 🚀 Деплой на Vercel и Render

## Архитектура

```
Vercel (фронтенд)          Render (бэкенд)
├── React + Vite           ├── Express + Node.js
├── ChatWidget             ├── AI (DeepSeek)
└── Static assets          ├── Google Sheets
                           └── Telegram Bot
```

---

## 📦 1. Деплой бэкенда на Render

### Шаг 1: Подготовьте бэкенд репозиторий

Ваш бэкенд должен содержать:
```
backend/
├── server.js (или app.js)
├── ai.js
├── knowledge.js
├── schedule.js
├── package.json
└── .env (НЕ коммитить!)
```

### Шаг 2: Создайте Web Service на Render

1. Зайдите на [render.com](https://render.com)
2. Нажмите **New** → **Web Service**
3. Подключите ваш GitHub репозиторий с бэкендом
4. Настройки:
   - **Name**: `suprt-backend` (или любое имя)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js` (или `npm start`)
   - **Instance Type**: `Free`

### Шаг 3: Добавьте Environment Variables в Render

В разделе **Environment** добавьте все переменные из `.env`:

```
GOOGLE_SHEET_ID=1EVZ5-YdlfiIk6qoL7tyHA2CStz5-D-UYYb8KoD-ZYLE
GOOGLE_SERVICE_ACCOUNT_EMAIL=support-ai@support-ai-478916.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMII...C4=\n-----END PRIVATE KEY-----
PORT=3002
TELEGRAM_BOT_TOKEN=6859322175:AAGFk2IuuCxlEqCbNV3XG5zqlBW_BIHznFY
DEEPSEEK_API_KEY=sk-9e53766bf7e24d1ea27433d6294cb509
```

⚠️ **Важно:** Private key должен быть в **одну строку** с `\n` для переносов

### Шаг 4: Добавьте CORS в бэкенд

В `server.js` добавьте:

```javascript
import cors from 'cors';

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://suprt.org',
    'https://www.suprt.org',
    'https://suprt-website.vercel.app'  // Ваш URL на Vercel
  ],
  credentials: true
}));
```

### Шаг 5: Deploy

Нажмите **Create Web Service** — Render автоматически задеплоит ваш бэкенд.

**Ваш бэкенд URL:** `https://suprt-backend.onrender.com`

---

## 🌐 2. Деплой фронтенда на Vercel

### Шаг 1: Обновите `.env.example`

```env
# Backend API URL - измените на ваш Render URL после деплоя
VITE_API_URL=https://suprt-backend.onrender.com
```

### Шаг 2: Deploy на Vercel

1. Зайдите на [vercel.com](https://vercel.com)
2. Нажмите **Add New** → **Project**
3. Import ваш GitHub репозиторий `suprt-website`
4. Настройки:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Шаг 3: Добавьте Environment Variables в Vercel

В разделе **Settings** → **Environment Variables** добавьте:

```
VITE_API_URL=https://suprt-backend.onrender.com
```

⚠️ Используйте **реальный URL** вашего бэкенда с Render!

### Шаг 4: Deploy

Нажмите **Deploy** — Vercel задеплоит фронтенд автоматически.

**Ваш сайт:** `https://suprt-website.vercel.app`

---

## 🔄 3. Обновление после деплоя

### После первого деплоя бэкенда:

1. Скопируйте URL с Render (например: `https://suprt-backend-abc123.onrender.com`)
2. Обновите в Vercel:
   - Settings → Environment Variables
   - `VITE_API_URL` → ваш реальный URL
3. Redeploy фронтенд (Vercel → Deployments → три точки → Redeploy)

### Локальная разработка:

```bash
# .env (локально)
VITE_API_URL=http://localhost:3002
```

```bash
# Запуск локально
npm run dev
```

---

## ✅ 4. Проверка работоспособности

### Проверьте бэкенд:

```bash
curl https://suprt-backend.onrender.com/health
# Должен вернуть 200 OK
```

Или откройте в браузере логи Render — там должны быть:
```
[✓] DeepSeek AI initialized
[✓] Chat API running on http://0.0.0.0:3002
```

### Проверьте фронтенд:

1. Откройте `https://suprt-website.vercel.app`
2. Кликните на кнопку чата 💬 в правом нижнем углу
3. Напишите "Привет"
4. Бот должен ответить

Если не работает:
- Откройте консоль браузера (F12) — проверьте ошибки
- Проверьте CORS настройки на бэкенде
- Убедитесь что `VITE_API_URL` указывает на правильный URL

---

## 🔧 5. Troubleshooting

### Ошибка CORS:

**Проблема:** "Access to fetch blocked by CORS policy"

**Решение:** Добавьте домен Vercel в CORS на бэкенде:

```javascript
app.use(cors({
  origin: ['https://suprt-website.vercel.app'],
  credentials: true
}));
```

### Бэкенд не отвечает:

**Проблема:** Timeout или 502 Bad Gateway

**Решение:**
- Render Free tier "засыпает" после 15 минут неактивности
- Первый запрос может занять 30-60 секунд (пока сервис "просыпается")
- Upgrade до платного плана для постоянной работы

### Private key ошибка:

**Проблема:** "Error: error:0909006C:PEM routines"

**Решение:** Private key в Render должен быть **в одну строку** с `\n`:

```
-----BEGIN PRIVATE KEY-----\nMIIEv...C4=\n-----END PRIVATE KEY-----
```

---

## 📝 6. Custom Domain (опционально)

### Для Vercel:

1. Settings → Domains
2. Добавьте `suprt.org` и `www.suprt.org`
3. Обновите DNS записи у регистратора:
   ```
   A    @    76.76.21.21
   CNAME www  cname.vercel-dns.com
   ```

### Для Render:

1. Settings → Custom Domain
2. Добавьте `api.suprt.org`
3. Обновите DNS:
   ```
   CNAME api  your-app.onrender.com
   ```

4. Обновите `VITE_API_URL` в Vercel:
   ```
   VITE_API_URL=https://api.suprt.org
   ```

---

## 🎉 Готово!

**Фронтенд:** https://suprt.org  
**Бэкенд:** https://api.suprt.org  
**Чат работает!** 💬

---

## 📊 Мониторинг

- **Vercel:** Dashboard → Analytics (бесплатно)
- **Render:** Dashboard → Logs (real-time логи)
- **Ошибки:** Vercel автоматически показывает runtime errors

---

**Контакты:** @sardor_ismatillaev | ceo@suprt.org
