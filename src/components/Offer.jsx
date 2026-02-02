import React from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n.jsx'

const packageVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6
    }
  })
}

export default function Offer(){
  const { t } = useI18n()
  const data = t('offer') || {}
  const packages = data.packages || []
  return (
    <section id="pricing" className="offer container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {data.title || 'Offer'}
      </motion.h2>
      <div className="package-grid">
        {packages.map((p,i)=> (
          <motion.div 
            className="package" 
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={packageVariants}
            whileHover={{ 
              y: -15,
              boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
              transition: { duration: 0.3 }
            }}
          >
            <h4>{p.title}</h4>
            <motion.div 
              className="price"
              whileHover={{ scale: 1.1, color: "#1f7aed" }}
            >
              {p.price}
            </motion.div>
            <ul>
              {p.items.map((it,idx)=> <li key={idx}>{it}</li>)}
            </ul>
            <motion.a 
              className="btn" 
              href="https://t.me/sardor_ismatillaev"
              whileHover={{ scale: 1.05, boxShadow: "0 5px 20px rgba(31, 122, 237, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Подключить →
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
