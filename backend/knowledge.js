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

    // Читаем данные из листа "knowledge" (A - Question, B - Answer)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'knowledge!A2:B', // A - Question, B - Answer (пропускаем заголовок в строке 1)
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
 * Ищет лучшее совпадение в базе знаний (улучшенный алгоритм)
 */
export function findBestMatch(query, knowledgeBase) {
  if (!knowledgeBase || knowledgeBase.length === 0) {
    return null;
  }

  const queryLower = query.toLowerCase().trim();
  
  // Синонимы и ключевые слова для лучшего поиска
  const synonyms = {
    'услуги': ['сервисы', 'что делаете', 'чем занимаетесь', 'what services', 'services', 'offer'],
    'цены': ['стоимость', 'сколько стоит', 'prices', 'cost', 'how much'],
    'контакт': ['связаться', 'менеджер', 'поддержка', 'contact', 'manager', 'support'],
    'гарантия': ['гарантии', 'warranty', 'guarantee'],
    'оплата': ['payment', 'pay', 'платить'],
    'запись': ['записаться', 'бронирование', 'book', 'appointment'],
    'локация': ['где находитесь', 'location', 'адрес', 'where'],
  };

  let bestMatch = null;
  let bestScore = 0;
  let allMatches = [];

  for (const item of knowledgeBase) {
    const questionLower = item.question.toLowerCase();
    
    // 1. Точное совпадение (score = 1.0)
    if (queryLower === questionLower) {
      return item;
    }

    // 2. Частичное совпадение
    if (questionLower.includes(queryLower) || queryLower.includes(questionLower)) {
      allMatches.push({ item, score: 0.9 });
      continue;
    }

    // 3. Поиск по словам с учетом синонимов
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
    const questionWords = questionLower.split(/\s+/).filter(w => w.length > 2);
    
    let matchCount = 0;
    
    for (const qWord of queryWords) {
      // Прямое совпадение слова
      for (const kwWord of questionWords) {
        if (kwWord.includes(qWord) || qWord.includes(kwWord)) {
          matchCount += 2; // Больший вес прямому совпадению
          break;
        }
      }
      
      // Совпадение через синонимы
      for (const [key, syns] of Object.entries(synonyms)) {
        if (syns.some(syn => qWord.includes(syn) || syn.includes(qWord))) {
          if (questionLower.includes(key) || syns.some(syn => questionLower.includes(syn))) {
            matchCount += 1.5; // Средний вес синониму
          }
        }
      }
    }

    const score = matchCount / (queryWords.length + questionWords.length);
    
    if (score > 0) {
      allMatches.push({ item, score });
    }
  }

  // Сортируем по score и берем лучший
  allMatches.sort((a, b) => b.score - a.score);
  
  if (allMatches.length > 0 && allMatches[0].score > 0.15) { // Понизили порог с 0.3 до 0.15
    bestMatch = allMatches[0].item;
    bestScore = allMatches[0].score;
    
    console.log(`[🎯 Match] Найдено совпадение (${(bestScore * 100).toFixed(0)}%): "${bestMatch.question.substring(0, 50)}..."`);
  } else {
    console.log(`[❌ No Match] Совпадений не найдено для: "${query.substring(0, 50)}..."`);
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
