import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n/i18n.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <App />
          <Analytics />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  </StrictMode>,
)
