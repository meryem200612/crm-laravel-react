import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Interventions from './pages/Interventions';
import Technicians from './pages/Technicians';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Page d'accueil publique */}
          <Route path="/" element={<Home />} />
          
          {/* Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Espace protégé */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/interventions" element={<Interventions />} />
            <Route path="/techniciens" element={<Technicians />} />
          </Route>

          {/* Redirection par défaut vers l'accueil ou le dashboard si connecté (géré dans Layout/Home) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
