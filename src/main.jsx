import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './Auth/AuthProvider.jsx'
import { RouterProvider } from 'react-router'
import router from './Router/Router.jsx'
// import CsrfProvider from './Auth/CsrfProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <CsrfProvider> */}
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    {/* </CsrfProvider> */}
  </StrictMode>,
)
