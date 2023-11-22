import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { StandardProvider } from './standard_context.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StandardProvider>
      <App />
    </StandardProvider>
  </React.StrictMode>,
)
