import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import './index.css'
import ClocksApplication from './ClocksApplication'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClocksApplication />
  </StrictMode>,
)
