import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './pages/Home'
import RegisterForm from './components/auth/RegisterForm'
import About from './pages/About'
import Menu from './pages/Menu'
import Contact from './pages/Contact'
import { UserContextProvider } from './context/UserContext';
import ScrollToTop from './components/ScrollToTop'
import './App.css'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/o-nas" element={<About />} />
        <Route path="/meni" element={<Menu />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={
        <ProtectedRoute requiredRoles={['administrator', 'upravljalec']}>
          <Dashboard />
        </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <UserContextProvider>
        <AppContent />
      </UserContextProvider>
    </Router>
  )
}

export default App

