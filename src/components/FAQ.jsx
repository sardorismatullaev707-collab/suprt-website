import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../i18n.jsx'

export default function FAQ(){
  const { t } = useI18n()
  const faqs = t('faq') || []
  const [openIndex, setOpenIndex] = useState(null)
  
  return (
    <section id="faq" className="faq container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('nav.contact') === 'Contact' ? 'FAQ' : 'Часто задаваемые вопросы'}
      </motion.h2>
      <div className="faq-list">
        {faqs.map((f,i)=> (
          <motion.div 
            className="faq-item" 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <motion.strong
              style={{ cursor: 'pointer', display: 'block' }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              whileHover={{ color: "#1f7aed" }}
            >
              {openIndex === i ? '▼' : '▶'} {f.q}
            </motion.strong>
            <AnimatePresence>
              {openIndex === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden', marginTop: '8px' }}
                >
                  {f.a}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
