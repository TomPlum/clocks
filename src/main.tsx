import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ClocksApplication from './ClocksApplication'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClocksApplication />
  </StrictMode>,
)
