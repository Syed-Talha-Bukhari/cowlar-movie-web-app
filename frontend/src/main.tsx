import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRoutes from './AppRoutes'
import { UserProvider } from './context/userContext'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <Toaster />
      <AppRoutes />
    </UserProvider>
  </React.StrictMode>,
)
