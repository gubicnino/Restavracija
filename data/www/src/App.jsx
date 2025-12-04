import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './pages/Home'
import RegisterForm from './components/auth/RegisterForm'
import About from './pages/About'
import Menu from './pages/Menu'
import Mize from './pages/Mize'
import Contact from './pages/Contact'
import { UserContextProvider } from './context/UserContext';
import './App.css'
import Navigation from './components/Navigation'

function AppContent() {
  return (
    <>
      <div className="steakhouse-landing min-h-screen w-full bg-black-rich">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/o-nas" element={<About />} />
          <Route path="/meni" element={<Menu />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/mize" element={<Mize />} />
        </Routes>
        <Footer />
      </div>
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

