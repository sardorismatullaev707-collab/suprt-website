import React from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n.jsx'
import { useTheme } from '../theme.jsx'

export default function Header(){
  const { t, lang, setLang } = useI18n()
  const { theme, toggle } = useTheme()

  return (
    <motion.header 
      className="site-header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container header-inner">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ fontSize: 28 }}
        >
          suprt
        </motion.div>
        <nav className="main-nav">
          <a href="#how">{t('nav.how')}</a>
          <a href="#use-cases">{t('nav.useCases')}</a>
          <a href="#pricing">{t('nav.pricing')}</a>
          <a href="#demo">{t('nav.demo')}</a>
          <a href="#contact">{t('nav.contact')}</a>
        </nav>
        <div className="header-ctas">
          <motion.a 
            className="btn primary" 
            href="https://t.me/suprt1_bot"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('header.tryBot')}
          </motion.a>
          <motion.a 
            className="btn" 
            href="#demo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('header.addChat')}
          </motion.a>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 8 }}>
            <button className="btn" onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}>{lang === 'ru' ? 'EN' : 'RU'}</button>
            <button className="btn" onClick={toggle}>{theme === 'light' ? 'Dark' : 'Light'}</button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
