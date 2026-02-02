import React from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n.jsx'

const stepVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6
    }
  })
}

export default function HowItWorks(){
  const { t } = useI18n()
  return (
    <section id="how" className="how container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('how.title')}
      </motion.h2>
      <div className="steps">
        <motion.div 
          className="step"
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stepVariants}
          whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
        >
          <div className="step-num">1</div>
          <h3>{t('how.step1Title')}</h3>
          <p>{t('how.step1Text')}</p>
          <motion.a 
            className="btn" 
            href="https://docs.google.com/spreadsheets/d/1EVZ5-YdlfiIk6qoL7tyHA2CStz5-D-UYYb8KoD-ZYLE"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('header.addChat') === undefined ? 'Open template' : 'Открыть шаблон таблицы'}
          </motion.a>
        </motion.div>
        <motion.div 
          className="step"
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stepVariants}
          whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
        >
          <div className="step-num">2</div>
          <h3>{t('how.step2Title')}</h3>
          <p>{t('how.step2Text')}</p>
        </motion.div>
        <motion.div 
          className="step"
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stepVariants}
          whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
        >
          <div className="step-num">3</div>
          <h3>{t('how.step3Title')}</h3>
          <p>{t('how.step3Text')}</p>
        </motion.div>
      </div>
    </section>
  )
}
