import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router';
import { router } from './routes/Router.jsx';
import AuthProvider from './contexts/AuthProvider/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 
 
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  
  <StrictMode>
    <QueryClientProvider client={queryClient}> 
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        
      />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
