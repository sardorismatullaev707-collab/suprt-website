// Добавьте этот код в ваш основной server.js или app.js файл бэкенда

import express from 'express';
import cors from 'cors';
import { askAI } from './ai.js'; // путь к вашему файлу с функцией askAI
import { getKnowledgeBase, findBestMatch } from './knowledge.js'; // ваши функции работы с базой знаний

const app = express();

// CORS для разрешения запросов с фронтенда
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // порты Vite
  credentials: true
}));

app.use(express.json());

// Endpoint для чата
app.post('/chat', async (req, res) => {
  try {
    const { message, chatHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: 'Message is required',
        reply: 'Пожалуйста, введите сообщение' 
      });
    }

    console.log(`[Chat API] Received: "${message.substring(0, 50)}..."`);

    // Получаем базу знаний из Google Sheets
    const knowledgeBase = await getKnowledgeBase();
    
    // Ищем лучшее совпадение
    const bestMatch = findBestMatch(message, knowledgeBase);

    // Форматируем историю для AI
    const formattedHistory = chatHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Вызываем вашу AI функцию
    const reply = await askAI(
      message,
      knowledgeBase,
      bestMatch,
      formattedHistory
    );

    console.log(`[Chat API] Replying: "${reply.substring(0, 50)}..."`);

    res.json({ 
      reply,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[Chat API] Error:', error);
    
    const isRussian = /[а-яА-Я]/.test(req.body.message || '');
    res.status(500).json({ 
      error: error.message,
      reply: isRussian 
        ? 'Извините, произошла ошибка. Попробуйте позже 😔'
        : 'Sorry, an error occurred. Please try again later 😔'
    });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`[✓] Chat API running on http://localhost:${PORT}`);
  console.log(`[✓] Accepting requests from Vite dev server`);
});

export default app;
