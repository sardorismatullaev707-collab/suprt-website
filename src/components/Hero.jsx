import React from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n.jsx'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Hero(){
  const { t } = useI18n()
  const bullets = t('hero.bullets')
  return (
    <section className="hero container">
      <motion.div 
        className="hero-text"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1 variants={item}>
          {t('hero.title')}
        </motion.h1>
        <motion.p className="lead" variants={item}>
          {t('hero.lead')}
        </motion.p>
        <motion.ul className="bullets" variants={item}>
          {Array.isArray(bullets) && bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </motion.ul>
        <motion.div className="hero-ctas" variants={item}>
          <motion.a 
            className="btn primary large" 
            href="https://t.me/suprt1_bot"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(31, 122, 237, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            {t('hero.ctaBot')}
          </motion.a>
          <motion.a 
            className="btn large" 
            href="#demo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('hero.ctaWeb')}
          </motion.a>
        </motion.div>
        <motion.p className="micro-trust" variants={item}>
          {t('hero.micro')}
        </motion.p>
      </motion.div>
      <motion.div 
        className="hero-media"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div 
          className="phone-mock"
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
        >
          <div className="chat-sample">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: '14px', color: '#666' }}
            >
              💬 {t('hero.title')}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
