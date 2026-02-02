import React from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n.jsx'

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5
    }
  })
}

export default function UseCases(){
  const { t } = useI18n()
  const list = t('useCases') || []
  return (
    <section id="use-cases" className="use-cases container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('nav.useCases')}
      </motion.h2>
      <div className="use-grid">
        {list.map((it, i) => (
          <motion.div 
            className="use-item" 
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            whileHover={{ 
              y: -10,
              boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
              transition: { duration: 0.3 }
            }}
          >
            <motion.div 
              style={{ fontSize: '48px', marginBottom: '12px' }}
              whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
            >
              {it.icon}
            </motion.div>
            <h4>{it.title}</h4>
            <p>{it.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
