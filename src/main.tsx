import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import "./styles/global.css"
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <AuthProvider>
            <Toaster
                richColors
                position="top-center"
                theme="dark" 
                toastOptions={{
                    style: {
                        background: "#1e293b", 
                        borderColor: "#334155", 
                    },
                }}
            />
            <RouterProvider router={router} />
        </AuthProvider>
  </StrictMode>,
)
