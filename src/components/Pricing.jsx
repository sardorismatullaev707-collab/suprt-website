import React from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n.jsx'

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5
    }
  })
}

export default function Pricing(){
  const { t } = useI18n()
  const data = t('pricing') || {}
  const plans = data.plans || []
  return (
    <section id="pricing" className="pricing container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {data.title || 'Pricing'}
      </motion.h2>
      <div className="pricing-grid">
        {plans.map((p, i) => (
          <motion.div 
            className="pricing-card"
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ 
              y: -10,
              boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
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
            <p>{p.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.p 
        className="early"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        {data.early}
      </motion.p>
    </section>
  )
}
