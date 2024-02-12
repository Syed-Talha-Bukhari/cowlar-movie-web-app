import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRoutes from './AppRoutes'
import { UserProvider } from './context/userContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  </React.StrictMode>,
)
