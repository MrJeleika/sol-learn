import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import '@xyflow/react/dist/style.css'
import { Buffer } from 'buffer'
import { ErrorBoundary } from './components/ui/error-boundary'

window.Buffer = Buffer

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
)
