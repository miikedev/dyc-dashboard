import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { ThemeProvider } from './components/theme-provider.jsx'
import { NuqsAdapter } from 'nuqs/adapters/react'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NuqsAdapter>
          <App />
        </NuqsAdapter>
      </ThemeProvider>
  </StrictMode>,
)
