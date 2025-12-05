import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import Modal from './common/Modal';
import LoginForm from './auth/LoginForm';

import { useUser } from '../context/UserContext';
export default function Navigation() {
  const navigate = useNavigate();
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    scrollY
  } = useScroll();
  useMotionValueEvent(scrollY, 'change', latest => {
    setIsScrolled(latest > 50);
  });
  const navLinks = [{
    name: 'O nas',
    href: '/o-nas'
  }, {
    name: 'Meni',
    href: '/meni'
  }, {
    name: 'Galerija',
    href: '/galerija'
  }, {
    name: 'Kontakt',
    href: '/kontakt'
  },{
    name: 'Mize',
    href: '/mize'
  }];
  return ( <>
      <motion.header initial={{
      y: -100
    }} animate={{
      y: 0
    }} transition={{
      duration: 0.6,
      ease: 'easeOut'
    }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black-rich/95 backdrop-blur-md' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="font-playfair text-2xl text-white">
            <img src="/assets/logo-gold-200.png" alt="Logo" style={{width: "100px", marginBottom: "16px"}} />
          </NavLink>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(link => <li key={link.name}>
                <NavLink to={link.href} className="text-gray-300 font-inter text-sm tracking-wider uppercase hover:text-gold transition-colors duration-300">
                  {link.name}
                </NavLink>
              </li>)}
          </ul>

          {/* CTA Button */}
          {isLoggedIn ? (
                <>
                    <a onClick={handleLogout} className="hidden md:block px-6 py-2 border border-gold text-gold font-inter text-sm tracking-wider uppercase hover:bg-gold hover:text-black-rich transition-all duration-300 cursor-pointer">
                        Odjava
                    </a>
                </>
                ) : (
                  <a onClick={handleAccountClick}className="hidden md:block px-6 py-2 border border-gold text-gold font-inter text-sm tracking-wider uppercase hover:bg-gold hover:text-black-rich transition-all duration-300 cursor-pointer">
                      Prijava
                  </a>
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white p-2" aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}>
            {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div initial={false} animate={isMobileMenuOpen ? {
      opacity: 1,
      x: 0
    } : {
      opacity: 0,
      x: '100%'
    }} transition={{
      duration: 0.3
    }} className={`fixed inset-0 z-40 bg-black-rich md:hidden ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => <motion.a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} initial={{
          opacity: 0,
          y: 20
        }} animate={isMobileMenuOpen ? {
          opacity: 1,
          y: 0
        } : {
          opacity: 0,
          y: 20
        }} transition={{
          duration: 0.3,
          delay: 0.1 * index
        }} className="font-playfair text-3xl text-white hover:text-gold transition-colors">
              {link.name}
            </motion.a>)}
          <motion.a href="#reservation" onClick={() => setIsMobileMenuOpen(false)} initial={{
          opacity: 0,
          y: 20
        }} animate={isMobileMenuOpen ? {
          opacity: 1,
          y: 0
        } : {
          opacity: 0,
          y: 20
        }} transition={{
          duration: 0.3,
          delay: 0.5
        }} className="mt-4 px-8 py-3 bg-gold text-black-rich font-inter font-semibold tracking-wider uppercase">
            Reserve a Table
          </motion.a>
        </div>
      </motion.div>
      <Modal isOpen={isLoginModalOpen} onClose={handleCloseModal}>
        <LoginForm onSuccess={handleCloseModal} />
      </Modal>
    </>);
}