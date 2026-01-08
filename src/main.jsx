import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register.jsx';
import App from './App.jsx'
import Pricing from './pages/Pricing.jsx'
import './index.css'
import './i18n'
import Login from './pages/Login.jsx';
import DriverRegister from './pages/DriverRegister.jsx';
import RestaurantRegister from './pages/RestaurantRegister.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/driver-register" element={<DriverRegister />} />
        <Route path="/restaurant-register" element={<RestaurantRegister />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
