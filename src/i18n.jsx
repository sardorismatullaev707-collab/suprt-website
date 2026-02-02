import React, { createContext, useContext, useState } from 'react'

const translations = {
  ru: {
    nav: { how: 'Как работает', useCases: 'Кому подходит', pricing: 'Цены', demo: 'Демо', contact: 'Контакты' },
    header: { tryBot: 'Попробовать в Telegram', addChat: 'Добавить чат на сайт' },
    hero: {
      title: 'AI администратор для малого бизнеса — отвечает клиентам 24/7 в Telegram и на сайте',
      lead: 'Снимает 80% типовых вопросов: цены, услуги, расписание, запись. Подключение за 10–20 минут — без CRM и без сложных настроек.',
      bullets: ['Не упускаете заявки — клиенты получают ответ сразу', 'Google Таблицы как база знаний — редактируете ответы как таблицу', 'Безопасная передача человеку — если не уверен, просит уточнение или передаёт менеджеру'],
      ctaBot: 'Запустить демо в Telegram →',
      ctaWeb: 'Посмотреть веб-чат →',
      micro: 'Только входящие сообщения • Можно выключить в любой момент • Подходит для салонов, клиник, курсов, сервисов'
    },
    how: { title: 'Как это работает — 3 шага', step1Title: 'Добавляете знания', step1Text: 'Загружаете Google Таблицу или используете шаблон (цены, услуги, FAQ, расписание).', step2Title: 'Выбираете канал', step2Text: 'Telegram бот (быстрее) или веб-чат (виджет на сайт).', step3Title: 'Бот отвечает и собирает заявки', step3Text: 'Отвечает на вопросы, просит имя/контакт и сохраняет заявки в таблицу или пересылает менеджеру.' },
    features: [
      { title: 'Ответы на FAQ', text: 'Цены, услуги, правила, адрес — всё автоматически.' },
      { title: 'Запись и заявки', text: 'Собирает время, услугу, имя и контакт клиента.' },
      { title: 'Google Таблицы как панель управления', text: 'Меняете ответы в таблице — изменения применяются сразу.' },
      { title: 'Передача человеку', text: 'Если бот не уверен — помечает запрос и пересылает менеджеру.' },
      { title: 'Человечные ответы', text: 'Задержка 3–5 сек, короткие естественные ответы.' },
      { title: 'Логи и аналитика', text: 'Счётчики обращений и топ вопросов в таблице.' }
    ],
    useCases: [
      { title: 'Салоны красоты', text: 'Цены, запись, услуги.', icon: '💇' },
      { title: 'Клиники и wellness', text: 'Расписание, услуги, вопросы пациентов.', icon: '🏥' },
      { title: 'Курсы и обучение', text: 'Программы, слоты, цены.', icon: '📚' },
      { title: 'Локальные сервисы', text: 'Ремонт, клининг, консультации.', icon: '🔧' }
    ],
    offer: {
      title: 'Нужен сайт с ботом внутри? Сделаем под ключ.',
      packages: [
        { title: 'Настройка Telegram бота', price: '$49–$79 / месяц', items: ['Подключение Telegram бота','Шаблон Google Таблицы','Настройка FAQ + заявок'] },
        { title: 'Веб-чат на сайт', price: '$79–$99 / месяц', items: ['Чат‑виджет на сайт','AI ответы из таблиц','Форма заявок'] },
        { title: 'Сайт + бот под ключ', price: 'Разовый $200–$500 + $79–$99/мес', items: ['Лендинг 1–3 стр.','Чат‑бот внутри','Telegram бот','Настройка FAQ/заявок'] }
      ]
    },
    pricing: {
      title: 'Цены',
      plans: [
        { title: 'Стартовый (Telegram)', price: '$49 / месяц', desc: 'Telegram бот, шаблон таблицы, базовый FAQ, сбор заявок.' },
        { title: 'Про (Веб-чат)', price: '$79 / месяц', desc: 'Чат‑виджет, интеграция с таблицами, базовая аналитика.' },
        { title: 'Под ключ', price: 'Настройка + абонплата', desc: 'Разовая настройка $200–$500 + $79–$99 / месяц.' }
      ],
      early: 'Ранний доступ — ограниченное количество мест в этом месяце.'
    },
    faq: [
      { q: 'Это официальный Telegram бот?', a: 'Да — вы подключаете собственного бота через безопасные токены.' },
      { q: 'Можно ли настроить ответы без программиста?', a: 'Да — все ответы редактируются в Google Таблице.' },
      { q: 'Можно ли отключить автоответ?', a: 'Да — полностью выключается в любой момент.' },
      { q: 'На каких языках отвечает?', a: 'Русский и английский (можно расширить по запросу).' },
      { q: 'Что если бот не знает ответ?', a: 'Бот пометит запрос и менеджер получит уведомление в Telegram.' },
      { q: 'Как быстро подключите?', a: '10–20 минут для Telegram, 1–2 часа для виджета на сайт.' }
    ],
    demo: { title: 'Демо', tryBot: 'Попробовать Telegram бот', openSheet: 'Открыть демо Google Таблицу', contact: 'Написать мне в Telegram', openChat: 'Открыть демо веб-чата', note: 'Если виджет ещё не готов, откройте демо‑окно — это имитация поведения чат‑виджета.' },
    footer: { telegram: 'Попробовать бота', template: 'Шаблон таблицы', demo: 'Демо чат' }
  },
  en: {
    nav: { how: 'How it works', useCases: 'Use cases', pricing: 'Pricing', demo: 'Demo', contact: 'Contact' },
    header: { tryBot: 'Try Telegram Bot', addChat: 'Add Website Chat' },
    hero: {
      title: 'AI receptionist for small businesses — replies 24/7 in Telegram and on your site',
      lead: 'Solves 80% of common questions: prices, services, schedule, bookings. Setup in 10–20 minutes — no CRM, no devs.',
      bullets: ['No missed leads — customers get an immediate reply', 'Google Sheets as knowledge base — edit answers in a sheet', 'Human handoff — asks for clarification or forwards to a manager if unsure'],
      ctaBot: 'Start Telegram Demo →',
      ctaWeb: 'See Website Chat →',
      micro: 'Inbound only • Can be turned off anytime • Fits salons, clinics, courses, services'
    },
    how: { title: 'How it works — 3 steps', step1Title: 'Add knowledge', step1Text: 'Upload a Google Sheet or use a template (prices, services, FAQ, schedule).', step2Title: 'Choose channel', step2Text: 'Telegram bot (fast) or website chat (widget).', step3Title: 'Bot replies and collects leads', step3Text: 'Answers questions, asks for name/contact and stores leads in a sheet or notifies manager.' },
    features: [
      { title: 'FAQ Answers', text: 'Prices, services, rules, address — all automatically.' },
      { title: 'Booking & Requests', text: 'Collects time, service, name and contact.' },
      { title: 'Google Sheets control panel', text: 'Edit answers in the sheet — changes apply instantly.' },
      { title: 'Human handoff', text: 'If unsure, marks the request and forwards to manager.' },
      { title: 'Human-like replies', text: '3–5s delay, short natural replies.' },
      { title: 'Logs & Analytics', text: 'Counts of requests and top questions in the sheet.' }
    ],
    useCases: [
      { title: 'Beauty / salons', text: 'Prices, bookings, services.', icon: '💇' },
      { title: 'Clinics / wellness', text: 'Schedule, services, patient questions.', icon: '🏥' },
      { title: 'Tuition / courses', text: 'Programs, slots, prices.', icon: '📚' },
      { title: 'Local services', text: 'Repairs, cleaning, consultations.', icon: '🔧' }
    ],
    offer: {
      title: 'Need a site with bot inside? We do it end-to-end.',
      packages: [
        { title: 'Telegram Bot Setup', price: '$49–$79 / month', items: ['Telegram bot setup','Google Sheet template','FAQ and leads setup'] },
        { title: 'Website Chat', price: '$79–$99 / month', items: ['Chat widget on site','AI answers from sheets','Leads form'] },
        { title: 'Website + Bot (Done-for-you)', price: 'One-time $200–$500 + $79–$99/mo', items: ['Landing 1–3 pages','Chat bot inside','Telegram bot','FAQ/leads setup'] }
      ]
    },
    pricing: {
      title: 'Pricing',
      plans: [
        { title: 'Starter (Telegram)', price: '$49 / month', desc: 'TG bot, sheet template, basic FAQ, lead collection.' },
        { title: 'Pro (Website chat)', price: '$79 / month', desc: 'Chat widget, sheet integration, basic analytics.' },
        { title: 'Done-for-you', price: 'Setup + monthly', desc: 'One-time setup $200–$500 + $79–$99 / month.' }
      ],
      early: 'Early access pricing — limited slots this month.'
    },
    faq: [
      { q: 'Is this an official Telegram bot?', a: 'Yes — you connect your own bot with secure tokens.' },
      { q: 'Can I set up answers without a developer?', a: 'Yes — answers are edited in a Google Sheet.' },
      { q: 'Can I disable auto-reply?', a: 'Yes — you can completely turn it off.' },
      { q: 'Which languages does it support?', a: 'Russian and English (can be extended).' },
      { q: 'What if the bot does not know?', a: 'The bot will flag the request and manager will be notified.' },
      { q: 'How fast is setup?', a: '10–20 minutes for Telegram, 1–2 hours for the widget.' }
    ],
    demo: { title: 'Demo', tryBot: 'Try Telegram Bot', openSheet: 'Open Demo Google Sheet', contact: 'Message me on Telegram', openChat: 'Open Website Chat Demo', note: 'If widget is not ready, open the demo modal — it simulates the chat widget.' },
    footer: { telegram: 'Try bot', template: 'Sheet template', demo: 'Demo chat' }
  }
}

const I18nContext = createContext()

export function I18nProvider({ children }){
  const [lang, setLang] = useState('ru')
  const t = (path) => {
    const parts = path.split('.')
    let cur = translations[lang]
    for(const p of parts){
      if(!cur) return path
      cur = cur[p]
    }
    return cur || path
  }
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n(){
  return useContext(I18nContext)
}
