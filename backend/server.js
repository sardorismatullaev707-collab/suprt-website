import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { askAI } from './ai.js';
import { getKnowledgeBase, findBestMatch } from './knowledge.js';

dotenv.config({ path: '../.env' });

const app = express();

// CORS для фронтенда
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://suprt.org',
    'https://www.suprt.org',
    'https://suprt-website.vercel.app',
    'https://suprt-website-git-main-sardorismatullaev707-collab.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { message, chatHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: 'Message is required',
        reply: 'Пожалуйста, введите сообщение' 
      });
    }

    console.log(`[💬 Chat] Получено: "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}"`);

    // Получаем базу знаний
    const knowledgeBase = await getKnowledgeBase();
    
    // Ищем лучшее совпадение
    const bestMatch = findBestMatch(message, knowledgeBase);

    // Форматируем историю для AI
    const formattedHistory = chatHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Вызываем AI
    const reply = await askAI(
      message,
      knowledgeBase,
      bestMatch,
      formattedHistory
    );

    console.log(`[✓ Chat] Ответ: "${reply.substring(0, 50)}${reply.length > 50 ? '...' : ''}"`);

    res.json({ 
      reply,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[❌ Chat Error]:', error.message);
    
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
  console.log('');
  console.log('╔════════════════════════════════════════╗');
  console.log('║   🚀 SUPRT Backend Server Started     ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  console.log(`[✓] Server:     http://localhost:${PORT}`);
  console.log(`[✓] Chat API:   http://localhost:${PORT}/chat`);
  console.log(`[✓] Health:     http://localhost:${PORT}/health`);
  console.log('');
  console.log('[✓] DeepSeek AI initialized');
  console.log('[✓] Google Sheets connected');
  console.log('');
  console.log('Waiting for chat requests...');
  console.log('');
});

export default app;
