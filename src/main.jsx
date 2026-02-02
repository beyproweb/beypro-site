import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register.jsx';
import App from './App.jsx'
import Pricing from './pages/Pricing.jsx'
import Features from './pages/Features.jsx'
import './index.css'
import './i18n'
import Login from './pages/Login.jsx';
import DriverRegister from './pages/DriverRegister.jsx';
import RestaurantRegister from './pages/RestaurantRegister.jsx';
import StandaloneRegister from './pages/StandaloneRegister.jsx';
import StandaloneRedirect from './pages/StandaloneRedirect.jsx';
// Feature pages
import POS from './pages/features/POS.jsx';
import Kitchen from './pages/features/Kitchen.jsx';
import Delivery from './pages/features/Delivery.jsx';
import Reports from './pages/features/Reports.jsx';
import Inventory from './pages/features/Inventory.jsx';
import Staff from './pages/features/Staff.jsx';
import Automation from './pages/features/Automation.jsx';
// Pricing pages
import Trial from './pages/pricing/Trial.jsx';
import Pro from './pages/pricing/Pro.jsx';
import Enterprise from './pages/pricing/Enterprise.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/features" element={<Features />} />
        <Route path="/features/pos" element={<POS />} />
        <Route path="/features/kitchen" element={<Kitchen />} />
        <Route path="/features/delivery" element={<Delivery />} />
        <Route path="/features/reports" element={<Reports />} />
        <Route path="/features/inventory" element={<Inventory />} />
        <Route path="/features/staff" element={<Staff />} />
        <Route path="/features/automation" element={<Automation />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/pricing/trial" element={<Trial />} />
        <Route path="/pricing/pro" element={<Pro />} />
        <Route path="/pricing/enterprise" element={<Enterprise />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/driver-register" element={<DriverRegister />} />
        <Route path="/restaurant-register" element={<RestaurantRegister />} />
        <Route path="/standalone-register" element={<StandaloneRegister />} />
        <Route path="/standalone/app" element={<StandaloneRedirect />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
