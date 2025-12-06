import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, InstagramIcon, FacebookIcon } from 'lucide-react';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px'
  });

  const locations = [{
    name: 'Jack&Joe BBQ & Pizza - Limbuš',
    address: 'Limbuška cesta 110\n2341 Limbuš',
    phone: '+386 2 460 70 00',
    email: 'limbus@jackandjoe.si'
  }, {
    name: 'Jack&Joe Steak & Burger Club - Lent',
    address: 'Lent 11\n2000 Maribor',
    phone: '+386 2 460 70 10',
    email: 'lent@jackandjoe.si'
  }];
  const hours = [{
    day: 'Ponedeljek - Četrtek',
    time: '11:00 - 22:00'
  }, {
    day: 'Petek - Sobota',
    time: '11:00 - 23:00'
  }, {
    day: 'Nedelja',
    time: '11:00 - 22:00'
  }];
  const quickLinks = [{
    name: 'Meni',
    href: '/menu'
  }, {
    name: 'O nas',
    href: '/about'
  }, {
    name: 'Kontakt',
    href: '/contact'
  }, {
    name: 'Rezervacije',
    href: '#reservation'
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
            <img src="/assets/logo-gold-200.png" alt="Jack & Joe" className="mb-6" />
            <p className="text-gray-400 font-inter text-sm font-light mb-6 leading-relaxed">
              Kjer se vonj žara prepleta z rečnim vetričem. Dve lokaciji ob Dravi,
              ena strast do mesa in pristne kulinarike.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="https://www.instagram.com/jackandjoe.si" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors duration-300" aria-label="Sledite nam na Instagramu">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/jackandjoe.si" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors duration-300" aria-label="Sledite nam na Facebooku">
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Locations Column */}
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
            <h4 className="font-playfair text-lg text-white mb-6">Naši Lokaciji</h4>
            <div className="space-y-6">
              {locations.map((location, index) => <div key={index}>
                  <h5 className="text-gold font-inter text-sm font-medium mb-2">
                    {location.name}
                  </h5>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <MapPinIcon className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-gray-400 font-inter text-xs font-light whitespace-pre-line">
                        {location.address}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <PhoneIcon className="w-4 h-4 text-gold flex-shrink-0" />
                      <a href={`tel:${location.phone}`} className="text-gray-400 font-inter text-xs font-light hover:text-gold transition-colors">
                        {location.phone}
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <MailIcon className="w-4 h-4 text-gold flex-shrink-0" />
                      <a href={`mailto:${location.email}`} className="text-gray-400 font-inter text-xs font-light hover:text-gold transition-colors">
                        {location.email}
                      </a>
                    </li>
                  </ul>
                </div>)}
            </div>
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
            <h4 className="font-playfair text-lg text-white mb-6">Delovni Čas</h4>
            <ul className="space-y-3">
              {hours.map((item, index) => <li key={index} className="flex items-start gap-3">
                  <ClockIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-inter text-sm block">
                      {item.day}
                    </span>
                    <span className="text-gray-400 font-inter text-sm font-light">
                      {item.time}
                    </span>
                  </div>
                </li>)}
            </ul>
            <div className="mt-6 p-4 bg-black-card border border-gold/10">
              <p className="text-gray-400 font-inter text-xs font-light">
                Kuhinja zaprta 30 minut pred zaprtjem restavracije
              </p>
            </div>
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
              Hitre Povezave
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => <li key={index}>
                  <a href={link.href} className="text-gray-400 font-inter text-sm font-light hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-px bg-gold group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>)}
            </ul>
            <div className="mt-8 pt-8 border-t border-white/5">
              <h5 className="text-white font-inter text-sm font-medium mb-3">
                Posebne Ponudbe
              </h5>
              <a href="#reservation" className="inline-block px-6 py-2.5 border border-gold text-gold font-inter text-xs tracking-wider uppercase hover:bg-gold hover:text-black-rich transition-all duration-300">
                Rezerviraj Mizo
              </a>
            </div>
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
              Pridružite Se Naši Družini
            </h4>
            <p className="text-gray-400 font-inter text-sm font-light mb-6">
              Prijavite se za ekskluzivne ponudbe, kulinarične dogodke in
              novosti iz naše kuhinje.
            </p>
            <form className="flex gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Vnesite vaš email" className="flex-1 bg-black-card border border-white/10 px-4 py-3 text-white font-inter text-sm focus:border-gold focus:outline-none transition-colors" />
              <button type="submit" className="px-6 py-3 bg-gold text-black-rich font-inter font-semibold text-sm tracking-wider uppercase hover:bg-gold-light transition-colors">
                Prijava
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 font-inter text-xs">
            © 2024 Jack & Joe. Vse pravice pridržane.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 font-inter text-xs hover:text-gold transition-colors">
              Politika Zasebnosti
            </a>
            <a href="#" className="text-gray-600 font-inter text-xs hover:text-gold transition-colors">
              Pogoji Uporabe
            </a>
          </div>
        </div>
      </div>
    </footer>;
}