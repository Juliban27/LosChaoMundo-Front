// frontend/src/main.jsx (CÓDIGO CORREGIDO)

import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './AppRouter.jsx' // 👈 Importa tu router
import './index.css'                      // Importa tus estilos globales

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter /> {/* 👈 Renderiza tu router */}
  </React.StrictMode>,
)