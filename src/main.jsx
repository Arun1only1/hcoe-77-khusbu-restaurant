import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AddFood from './pages/AddFood';
import EditFood from './pages/EditFood';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/product-detail/:id', element: <ProductDetail /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/add-food', element: <AddFood /> },
  { path: '/edit-food/:id', element: <EditFood /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
