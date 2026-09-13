// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import AuthProvider from './Auth/AuthProvider.jsx'
// import { RouterProvider } from 'react-router'
// import router from './Router/Router.jsx'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//       <AuthProvider>
//         <RouterProvider router={router}></RouterProvider>
//       </AuthProvider>
//   </StrictMode>,
// )


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './Auth/AuthProvider.jsx'
import { RouterProvider } from 'react-router'
import router from './Router/Router.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)