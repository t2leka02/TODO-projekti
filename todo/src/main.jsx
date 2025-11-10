

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/useUser.jsx'; 
import ProtectedRoute from './components/ProtectedRoute.jsx'; 
import App from './screens/App.jsx'
import Login from './components/Login.jsx'; 
import Register from './components/Register.jsx'; 
import NotFound from './screens/NotFound.jsx'; 
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute> <App /> </ProtectedRoute>} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>,
)