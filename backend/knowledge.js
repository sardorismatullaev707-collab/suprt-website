import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');

let cachedKnowledgeBase = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

/**
 * Получает базу знаний из Google Sheets
 */
export async function getKnowledgeBase() {
  try {
    // Используем кэш, если данные свежие
    const now = Date.now();
    if (cachedKnowledgeBase && (now - lastFetchTime) < CACHE_DURATION) {
      console.log('[📚 Knowledge] Используется кэш');
      return cachedKnowledgeBase;
    }

    console.log('[📚 Knowledge] Загрузка из Google Sheets...');

    // Аутентификация
    const auth = new google.auth.JWT(
      SERVICE_ACCOUNT_EMAIL,
      null,
      PRIVATE_KEY,
      ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );

    const sheets = google.sheets({ version: 'v4', auth });

    // Читаем данные из листа "Knowledge Base"
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Knowledge Base!A2:B', // A - вопрос, B - ответ (пропускаем заголовок)
    });

    const rows = response.data.values || [];

    // Формируем базу знаний
    cachedKnowledgeBase = rows
      .filter(row => row[0] && row[1]) // Только заполненные строки
      .map(row => ({
        question: row[0].trim(),
        answer: row[1].trim()
      }));

    lastFetchTime = now;

    console.log(`[✓ Knowledge] Загружено ${cachedKnowledgeBase.length} записей`);

    return cachedKnowledgeBase;

  } catch (error) {
    console.error('[❌ Knowledge Error]:', error.message);
    
    // Если ошибка, но есть кэш - используем его
    if (cachedKnowledgeBase) {
      console.log('[📚 Knowledge] Используется старый кэш из-за ошибки');
      return cachedKnowledgeBase;
    }

    // Возвращаем пустой массив, если нет данных
    return [];
  }
}

/**
 * Ищет лучшее совпадение в базе знаний
 */
export function findBestMatch(query, knowledgeBase) {
  if (!knowledgeBase || knowledgeBase.length === 0) {
    return null;
  }

  const queryLower = query.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const item of knowledgeBase) {
    const questionLower = item.question.toLowerCase();
    
    // Простой алгоритм совпадения по словам
    const queryWords = queryLower.split(/\s+/);
    const questionWords = questionLower.split(/\s+/);
    
    let matchCount = 0;
    for (const word of queryWords) {
      if (word.length < 3) continue; // Игнорируем короткие слова
      
      for (const qWord of questionWords) {
        if (qWord.includes(word) || word.includes(qWord)) {
          matchCount++;
          break;
        }
      }
    }

    const score = matchCount / Math.max(queryWords.length, questionWords.length);

    if (score > bestScore && score > 0.3) { // Минимальный порог совпадения
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch) {
    console.log(`[🎯 Match] Найдено совпадение (${(bestScore * 100).toFixed(0)}%): "${bestMatch.question.substring(0, 50)}..."`);
  }

  return bestMatch;
}

/**
 * Очищает кэш (для принудительного обновления)
 */
export function clearCache() {
  cachedKnowledgeBase = null;
  lastFetchTime = 0;
  console.log('[🗑️ Knowledge] Кэш очищен');
}
