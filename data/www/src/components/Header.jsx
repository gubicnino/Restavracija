import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Header.css';
import Modal from './common/Modal';
import LoginForm from './auth/LoginForm';
import { useUser } from '../context/UserContext';

function Header() {
  const { isLoggedIn, logout } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const handleAccountClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setIsLoginModalOpen(true);
    }
  };
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const handleCloseModal = () => {
    setIsLoginModalOpen(false); 
  };
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">STEAK HOUSE</h1>
        <nav>
          <ul className="nav-list">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Domov
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/o-nas" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                O Nas
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/meni" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Meni
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/mize" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Mize
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/kontakt" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Kontakt
              </NavLink>
            </li>
            {isLoggedIn ? (
                <>
                    <li>
                      <a onClick={handleLogout} className={`nav-link`}>
                          Logout
                      </a>
                    </li>
                </>
                ) : (
                <li>
                    <a onClick={handleAccountClick} className={`nav-link`}>
                        LOGIN
                    </a>
                </li>
            )}
          </ul>
        </nav>
      </div>
      <Modal isOpen={isLoginModalOpen} onClose={handleCloseModal}>
        <LoginForm onSuccess={handleCloseModal} />
      </Modal>
    </header>
    
  );
}

export default Header;
