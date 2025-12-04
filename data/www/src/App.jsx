import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import RegisterForm from './components/auth/RegisterForm'
import About from './pages/About'
import Menu from './pages/Menu'
import Mize from './pages/Mize'
import Contact from './pages/Contact'
import { UserContextProvider } from './context/UserContext';
import './App.css'

function App() {
  return (
    <Router>
      <UserContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/o-nas" element={<About />} />
          <Route path="/meni" element={<Menu />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/mize" element={<Mize />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </Router>
  )
}

export default App

