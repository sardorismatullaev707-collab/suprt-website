import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../i18n.jsx'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)
  const { lang } = useI18n()

  // Приветственное сообщение при открытии
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = lang === 'ru' 
        ? 'Привет! 👋 Я AI-помощник Suprt. Чем могу помочь?' 
        : 'Hi! 👋 I\'m Suprt AI assistant. How can I help?'
      
      setMessages([{
        role: 'assistant',
        content: greeting,
        timestamp: new Date()
      }])
    }
  }, [isOpen, lang])

  // Автоскролл к последнему сообщению
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      // Отправка через Vite прокси на ваш бэкенд (localhost:3002)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          chatHistory: messages.slice(-6) // последние 6 сообщений для контекста
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply || (lang === 'ru' ? 'Извините, не могу ответить' : 'Sorry, cannot reply'),
        timestamp: new Date()
      }])
    } catch (error) {
      console.error('[ChatWidget] Error:', error)
      
      // Fallback сообщение при ошибке
      const errorMsg = lang === 'ru'
        ? 'Упс, что-то пошло не так 😔 Попробуйте позже или напишите мне: @sardor_ismatillaev'
        : 'Oops, something went wrong 😔 Try later or contact: @sardor_ismatillaev'
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMsg,
        timestamp: new Date()
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Кнопка открытия чата (правый нижний угол) */}
      <motion.button
        className="chat-widget-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          rotate: isOpen ? 180 : 0,
          backgroundColor: isOpen ? '#764ba2' : '#667eea'
        }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>

      {/* Окно чата */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-widget-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Заголовок */}
            <div className="chat-widget-header">
              <div>
                <strong>Suprt AI</strong>
                <div style={{ fontSize: 12, opacity: 0.9 }}>
                  {lang === 'ru' ? 'Онлайн' : 'Online'} 🟢
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="chat-widget-close">
                ✕
              </button>
            </div>

            {/* Сообщения */}
            <div className="chat-widget-messages">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  className={`chat-widget-message ${msg.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="chat-widget-message-content">
                    {msg.content}
                  </div>
                  <div className="chat-widget-message-time">
                    {msg.timestamp.toLocaleTimeString(lang === 'ru' ? 'ru-RU' : 'en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  className="chat-widget-message assistant"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="chat-widget-typing">
                    <span></span><span></span><span></span>
                  </div>
                </motion.div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Поле ввода */}
            <div className="chat-widget-input">
              <input
                type="text"
                placeholder={lang === 'ru' ? 'Напишите сообщение...' : 'Type a message...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
              />
              <button onClick={sendMessage} disabled={!input.trim() || isTyping}>
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
