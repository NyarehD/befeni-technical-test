import '@smastrom/react-rating/style.css'
import 'react-multi-carousel/lib/styles.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/fabrics",
        element: <App />
      },
      {
        path: "/fabrics/:fabricCode",
        element: <App />
      }
    ]
  }
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    <ReactQueryDevtools client={queryClient}/>
    </QueryClientProvider>
  </React.StrictMode>,
)
