import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import RegisterForm from './components/auth/RegisterForm';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { UserContextProvider } from './context/UserContext';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import GalleryPage from './pages/GalleryPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Menu from './pages/Menu';

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
        <Route path="/galerija" element={<GalleryPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRoles={['administrator', 'upravljalec']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <UserContextProvider>
        <AppContent />
      </UserContextProvider>
    </Router>
  );
}

export default App;
