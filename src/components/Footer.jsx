import React from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n.jsx'

export default function Footer(){
  const year = new Date().getFullYear()
  const { t } = useI18n()
  return (
    <motion.footer 
      id="contact" 
      className="site-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container footer-inner">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div>Telegram: <motion.a 
            href="https://t.me/sardor_ismatillaev"
            whileHover={{ color: "#1f7aed", scale: 1.05 }}
          >
            @sardor_ismatillaev
          </motion.a></div>
          <div>Email: <motion.a 
            href="mailto:ceo@suprt.org"
            whileHover={{ color: "#1f7aed", scale: 1.05 }}
          >
            ceo@suprt.org
          </motion.a></div>
        </motion.div>
        <motion.div 
          className="footer-links"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.a 
            href="https://t.me/suprt1_bot"
            whileHover={{ color: "#1f7aed", y: -2 }}
          >
            {t('footer.telegram')}
          </motion.a>
          <motion.a 
            href="https://docs.google.com/spreadsheets/d/1EVZ5-YdlfiIk6qoL7tyHA2CStz5-D-UYYb8KoD-ZYLE"
            whileHover={{ color: "#1f7aed", y: -2 }}
          >
            {t('footer.template')}
          </motion.a>
          <motion.a 
            href="#demo"
            whileHover={{ color: "#1f7aed", y: -2 }}
          >
            {t('footer.demo')}
          </motion.a>
        </motion.div>
      </div>
      <motion.div 
        className="container copyright"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        © {year} suprt
      </motion.div>
    </motion.footer>
  )
}
