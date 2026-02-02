import React, {useState} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../i18n.jsx'

function ChatModal({onClose}){
  const [messages, setMessages] = useState([
    {from: 'bot', text: 'Привет! Чем помочь? — Попробуйте написать "запись" или "цены".'}
  ])
  const [input, setInput] = useState('')

  function send(){
    if(!input) return
    setMessages(m => [...m, {from: 'user', text: input}])
    let reply = 'Извините, не понял. Менеджер свяжется с вами.'
    if(input.toLowerCase().includes('цена') || input.toLowerCase().includes('стоим')) reply = 'Наши цены зависят от услуги. Пришлите услугу, и я скажу цену.'
    if(input.toLowerCase().includes('запис')) reply = 'Отлично — укажите удобную дату и время, и мы запишем вас.'
    setTimeout(()=> setMessages(m => [...m, {from: 'bot', text: reply}]), 800)
    setInput('')
  }

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>Демо веб-чата</h3>
          <motion.button 
            onClick={onClose} 
            className="close"
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </div>
        <div className="chat-window">
          <AnimatePresence>
            {messages.map((m,i)=> (
              <motion.div 
                key={i} 
                className={`msg ${m.from}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="msg-text">{m.text}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="chat-input">
          <input 
            value={input} 
            onChange={e=>setInput(e.target.value)} 
            onKeyPress={e => e.key === 'Enter' && send()}
            placeholder="Напишите сообщение..." 
          />
          <motion.button 
            className="btn" 
            onClick={send}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Отправить
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Demo(){
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  return (
    <section id="demo" className="demo container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('demo.title')}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {t('demo.note')}
      </motion.p>
      <motion.div 
        className="demo-ctas"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <motion.a 
          className="btn primary" 
          href="https://t.me/suprt1_bot"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(31, 122, 237, 0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          {t('demo.tryBot')}
        </motion.a>
        <motion.a 
          className="btn" 
          href="https://docs.google.com/spreadsheets/d/1EVZ5-YdlfiIk6qoL7tyHA2CStz5-D-UYYb8KoD-ZYLE/view"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('demo.openSheet')}
        </motion.a>
        <motion.a 
          className="btn" 
          href="https://t.me/sardor_ismatillaev"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('demo.contact')}
        </motion.a>
        <motion.button 
          className="btn" 
          onClick={()=>setOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Открыть демо веб-чата
        </motion.button>
      </motion.div>
      <div className="demo-note">Если виджет ещё не готов, откройте демо‑окно — это имитация поведения чат‑виджета.</div>
      <AnimatePresence>
        {open && <ChatModal onClose={()=>setOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}
