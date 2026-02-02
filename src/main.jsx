import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { I18nProvider } from './i18n'
import { ThemeProvider } from './theme'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <App />
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>
)
