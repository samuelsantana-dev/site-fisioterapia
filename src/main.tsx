import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/home.tsx';
import {LoginForm} from './pages/login.tsx';
import { ToastContainer } from 'react-bootstrap';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  <ToastContainer />
</React.StrictMode>,
)
