import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ClocksApplication from './ClocksApplication.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClocksApplication />
  </StrictMode>,
)
