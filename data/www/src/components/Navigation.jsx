import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/Header.css';
import { GoldButton } from './common/Button';
import Modal from './common/Modal';
import ReservationForm from './ReservationForm';
export default function Navigation() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, currentUser } = useUser();
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const handleReservationClick = e => {
    setIsReservationModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsReservationModalOpen(false);
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', latest => {
    setIsScrolled(latest > 50);
  });
  const navLinks = [
    {
      name: 'O nas',
      href: '/o-nas',
    },
    {
      name: 'Meni',
      href: '/meni',
    },
    {
      name: 'Galerija',
      href: '/galerija',
    },
    {
      name: 'Kontakt',
      href: '/kontakt',
    },
  ];
  return (
    <>
      <motion.header
        initial={{
          y: -100,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black-rich/95 backdrop-blur-md' : 'bg-transparent'}`}
      >
        <nav className="max-w-7xl mx-auto py-4 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="font-playfair text-2xl text-white">
            <img
              src="/assets/logo-gold-200.png"
              alt="Logo"
              style={{ width: '100px', marginBottom: '16px' }}
            />
          </NavLink>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <li key={link.name}>
                <NavLink
                  to={link.href}
                  className="text-gray-300 font-inter text-base tracking-wider uppercase hover:text-gold transition-colors duration-300"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            {isLoggedIn &&
              (currentUser.vloga === 'administrator' || currentUser.vloga === 'upravljalec') && (
                <li>
                  <NavLink
                    to="/dashboard"
                    className="text-gray-300 font-inter text-base tracking-wider uppercase hover:text-gold transition-colors duration-300"
                  >
                    Admin Panel
                  </NavLink>
                </li>
              )}
          </ul>

          {/* CTA Button - Desktop Only */}
          <div className="hidden md:block">
            <GoldButton onClick={handleReservationClick}>Rezerviraj mizo</GoldButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <XIcon className="w-10 h-10" />
            ) : (
              <MenuIcon className="w-10 h-10" />
            )}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={
          isMobileMenuOpen
            ? {
                opacity: 1,
                x: 0,
              }
            : {
                opacity: 0,
                x: '100%',
              }
        }
        transition={{
          duration: 0.3,
        }}
        className={`fixed inset-0 z-40 bg-black-rich px-6 md:hidden ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={
                isMobileMenuOpen
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              transition={{
                duration: 0.3,
                delay: 0.1 * index,
              }}
            >
              <NavLink
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-playfair text-3xl text-white hover:text-gold transition-colors"
              >
                {link.name}
              </NavLink>
            </motion.div>
          ))}
          {isLoggedIn &&
            (currentUser.vloga === 'administrator' || currentUser.vloga === 'upravljalec') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <NavLink
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-playfair text-3xl text-white hover:text-gold transition-colors"
                >
                  Admin Panel
                </NavLink>
              </motion.div>
            )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="mt-4"
          >
            <GoldButton
              onClick={() => {
                handleReservationClick();
                setIsMobileMenuOpen(false);
              }}
            >
              Rezerviraj mizo
            </GoldButton>
          </motion.div>
        </div>
      </motion.div>
      <Modal isOpen={isReservationModalOpen} onClose={handleCloseModal}>
        <ReservationForm />
      </Modal>
    </>
  );
}
