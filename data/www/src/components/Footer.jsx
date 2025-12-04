import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, InstagramIcon, FacebookIcon } from 'lucide-react';
export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px'
  });
  const hours = [{
    day: 'Monday - Thursday',
    time: '5:00 PM - 10:00 PM'
  }, {
    day: 'Friday - Saturday',
    time: '5:00 PM - 11:00 PM'
  }, {
    day: 'Sunday',
    time: '4:00 PM - 9:00 PM'
  }];
  const quickLinks = [{
    name: 'Menu',
    href: '#menu'
  }, {
    name: 'Reservations',
    href: '#reservation'
  }, {
    name: 'Private Dining',
    href: '#'
  }, {
    name: 'Gift Cards',
    href: '#'
  }, {
    name: 'Careers',
    href: '#'
  }];
  return <footer ref={ref} className="relative bg-black-rich border-t border-white/5">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6
        }} className="lg:col-span-1">
            <img src="/assets/logo-gold-200.png" alt="" />
            <p className="text-gray-500 font-inter text-sm font-light mb-6">
              Where exceptional cuts meet timeless elegance. A legacy of
              culinary excellence since 1987.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors duration-300" aria-label="Follow us on Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors duration-300" aria-label="Follow us on Facebook">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors duration-300" aria-label="Follow us on X">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Contact Column */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.1
        }}>
            <h4 className="font-playfair text-lg text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 font-inter text-sm font-light">
                  123 Luxury Avenue
                  <br />
                  Manhattan, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-gold flex-shrink-0" />
                <a href="tel:+15551234567" className="text-gray-400 font-inter text-sm font-light hover:text-gold transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="w-5 h-5 text-gold flex-shrink-0" />
                <a href="mailto:reservations@primeandoak.com" className="text-gray-400 font-inter text-sm font-light hover:text-gold transition-colors">
                  reservations@primeandoak.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Hours Column */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <h4 className="font-playfair text-lg text-white mb-6">Hours</h4>
            <ul className="space-y-3">
              {hours.map((item, index) => <li key={index} className="flex items-start gap-3">
                  <ClockIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-inter text-sm block">
                      {item.day}
                    </span>
                    <span className="text-gray-500 font-inter text-sm font-light">
                      {item.time}
                    </span>
                  </div>
                </li>)}
            </ul>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.3
        }}>
            <h4 className="font-playfair text-lg text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => <li key={index}>
                  <a href={link.href} className="text-gray-400 font-inter text-sm font-light hover:text-gold transition-colors duration-300">
                    {link.name}
                  </a>
                </li>)}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6,
        delay: 0.4
      }} className="mt-16 pt-12 border-t border-white/5">
          <div className="max-w-xl mx-auto text-center">
            <h4 className="font-playfair text-2xl text-white mb-3">
              Join Our Circle
            </h4>
            <p className="text-gray-500 font-inter text-sm font-light mb-6">
              Subscribe for exclusive offers, culinary events, and insider
              access.
            </p>
            <form className="flex gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 bg-black-card border border-white/10 px-4 py-3 text-white font-inter text-sm focus:border-gold focus:outline-none transition-colors" />
              <button type="submit" className="px-6 py-3 bg-gold text-black-rich font-inter font-semibold text-sm tracking-wider uppercase hover:bg-gold-light transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 font-inter text-xs">
            © 2024 Prime & Oak. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 font-inter text-xs hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 font-inter text-xs hover:text-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>;
}