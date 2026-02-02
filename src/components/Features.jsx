import React from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n.jsx'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
}

export default function Features(){
  const { t } = useI18n()
  const items = t('features') || []
  return (
    <section id="features" className="features container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('features') ? ( (Array.isArray(items) && items.length) ? 'Что умеет' : 'Features' ) : 'Что умеет'}
      </motion.h2>
      <div className="cards">
        {items.map((it, i) => (
          <motion.div 
            className="card" 
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
              transition: { duration: 0.3 }
            }}
          >
            <motion.h4
              whileHover={{ color: "#1f7aed" }}
            >
              {it.title}
            </motion.h4>
            <p>{it.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
