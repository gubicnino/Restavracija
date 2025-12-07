import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, SendIcon } from 'lucide-react';
import PageTitle from '../components/common/PageTitle';
import { GoldButton } from '../components/common/Button';

export default function Contact() {
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, margin: '-100px' });
  const isMapInView = useInView(mapRef, { once: true, margin: '-100px' });

  const [activeLocation, setActiveLocation] = useState('limbus');

  const locations = {
    limbus: {
      name: 'Jack&Joe BBQ & Pizza',
      location: 'Limbuš',
      address: 'Limbuška cesta 110, 2341 Limbuš',
      phone: '+386 2 460 70 00',
      email: 'limbus@jackandjoe.si',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2743.191903012671!2d15.586562376691946!3d46.56367027111328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476f9de22eae1ee9%3A0xdc2494f3aa42c63c!2sJack%20%26%20Joe%20BBQ%20%26%20Pizza!5e0!3m2!1sen!2ssi!4v1765040938675!5m2!1sen!2ssi',
      hours: [
        { day: 'Ponedeljek', time: '12:00 - 22:00' },
        { day: 'Torek', time: '12:00 - 22:00' },
        { day: 'Sreda', time: '12:00 - 22:00' },
        { day: 'Četrtek', time: '12:00 - 22:00' },
        { day: 'Petek', time: '12:00 - 23:00' },
        { day: 'Sobota', time: '12:00 - 23:00' },
        { day: 'Nedelja', time: '12:00 - 22:00' }
      ]
    },
    lent: {
      name: 'Jack&Joe Steak & Burger Club',
      location: 'Lent, Maribor',
      address: 'Lent 11, 2000 Maribor',
      phone: '+386 2 460 70 10',
      email: 'lent@jackandjoe.si',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2743.5055605068146!2d15.637683100000004!3d46.55746690000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476f77a54c218647%3A0x6dbc0ba740b7048b!2sJack%20%26%20Joe%20Steak%20and%20Burger%20Club!5e0!3m2!1sen!2ssi!4v1765040508090!5m2!1sen!2ssi',
      hours: [
        { day: 'Ponedeljek', time: '12:00 - 23:00' },
        { day: 'Torek', time: '12:00 - 23:00' },
        { day: 'Sreda', time: '12:00 - 23:00' },
        { day: 'Četrtek', time: '12:00 - 23:00' },
        { day: 'Petek', time: '12:00 - 00:00' },
        { day: 'Sobota', time: '12:00 - 00:00' },
        { day: 'Nedelja', time: '12:00 - 22:00' }
      ]
    }
  };

  return (
    <div className="bg-black-rich">
      {/* Hero Section */}
      <PageTitle
        PageTitle="Kontakt"
        title="Obrnite se na nas"
        titleGold="za rezervacije ali vprašanja"
        backgroundImage="/assets/jackandjoe5.jpg"
      />

      {/* Intro Section */}
      <section className="relative py-20 px-6 bg-black-card">
        <div className="absolute inset-0 texture-overlay opacity-20" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-400 font-inter font-light leading-relaxed text-lg mb-6">
              Veselimo se vašega obiska! Ne glede na to, ali želite rezervirati mizo, 
              poizvedeti o posebnih dogodkih ali preprosto pozdraviti našo ekipo, 
              smo vam vedno na voljo.
            </p>
            <p className="text-gray-400 font-inter font-light leading-relaxed text-lg">
              Izberite eno od naših dveh lokacij – umirjeni <span className="text-gold">Limbuš</span> ob 
              naravi ali živahni <span className="text-gold">Lent</span> v srcu Maribora. 
              Kontaktirajte nas telefonsko, preko emaila ali nas obiščite osebno.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="relative py-32 px-6 bg-black-rich overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-gold tracking-[0.3em] uppercase text-sm font-inter mb-4">
              Naši Lokaciji
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Obiščite nas na <span className="text-gold-gradient">dveh lokacijah</span>
            </h2>
            <div className="w-24 h-px bg-gold mx-auto" />
          </motion.div>

          {/* Location Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center gap-4 mb-12"
          >
            <button
              onClick={() => setActiveLocation('limbus')}
              className={`px-8 py-3 font-inter tracking-wide transition-all duration-300 ${
                activeLocation === 'limbus'
                  ? 'text-gold border-b-2 border-gold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Limbuš
            </button>
            <button
              onClick={() => setActiveLocation('lent')}
              className={`px-8 py-3 font-inter tracking-wide transition-all duration-300 ${
                activeLocation === 'lent'
                  ? 'text-gold border-b-2 border-gold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Lent
            </button>
          </motion.div>

          {/* Location Info Cards */}
          <motion.div
            key={activeLocation}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Address Card */}
            <div className="group bg-black-card border border-white/5 p-8 hover:border-gold/20 transition-all duration-500">
              <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-6">
                <MapPinIcon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-playfair text-2xl text-white mb-4">Naslov</h3>
              <p className="text-gray-400 font-inter font-light leading-relaxed">
                {locations[activeLocation].address}
              </p>
            </div>

            {/* Phone Card */}
            <div className="group bg-black-card border border-white/5 p-8 hover:border-gold/20 transition-all duration-500">
              <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-6">
                <PhoneIcon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-playfair text-2xl text-white mb-4">Telefon</h3>
              <a
                href={`tel:${locations[activeLocation].phone}`}
                className="text-gray-400 font-inter font-light hover:text-gold transition-colors"
              >
                {locations[activeLocation].phone}
              </a>
              <p className="text-gray-500 font-inter font-light text-sm mt-2">
                Za rezervacije in informacije
              </p>
            </div>

            {/* Email Card */}
            <div className="group bg-black-card border border-white/5 p-8 hover:border-gold/20 transition-all duration-500">
              <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-6">
                <MailIcon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-playfair text-2xl text-white mb-4">Email</h3>
              <a
                href={`mailto:${locations[activeLocation].email}`}
                className="text-gray-400 font-inter font-light hover:text-gold transition-colors break-all"
              >
                {locations[activeLocation].email}
              </a>
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            key={`hours-${activeLocation}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 bg-black-card border border-white/5 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <ClockIcon className="w-6 h-6 text-gold" />
              <h3 className="font-playfair text-2xl text-white">Delovni Čas</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {locations[activeLocation].hours.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-white font-inter text-sm">{item.day}</span>
                  <span className="text-gold font-inter font-light text-sm">{item.time}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-500 font-inter font-light text-sm mt-6">
              * Kuhinja zaprta 30 minut pred zaprtjem restavracije
            </p>
          </motion.div>

          {/* Google Maps */}
          <motion.div
            key={`map-${activeLocation}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <h3 className="font-playfair text-2xl text-white mb-6 flex items-center gap-3">
              <MapPinIcon className="w-6 h-6 text-gold" />
              Lokacija na Zemljevidu
            </h3>
            <div className="relative w-full h-96 bg-black-card border border-white/5 overflow-hidden">
              <iframe
                src={locations[activeLocation].mapEmbed}
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
                style={{ border: 0 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section ref={formRef} className="relative py-32 px-6 bg-black-card overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-30" />
        
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-gold tracking-[0.3em] uppercase text-sm font-inter mb-4">
              Pošljite Nam Sporočilo
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-6">
              Kontaktirajte Nas
            </h2>
            <div className="w-24 h-px bg-gold mx-auto" />
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 font-inter text-sm mb-2">
                  Ime in Priimek
                </label>
                <input
                  type="text"
                  className="w-full bg-black-rich border border-white/10 px-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors"
                  placeholder="Vaše ime"
                />
              </div>
              <div>
                <label className="block text-gray-400 font-inter text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-black-rich border border-white/10 px-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors"
                  placeholder="vas@email.si"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 font-inter text-sm mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  className="w-full bg-black-rich border border-white/10 px-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors"
                  placeholder="+386 ..."
                />
              </div>
              <div>
                <label className="block text-gray-400 font-inter text-sm mb-2">
                  Lokacija
                </label>
                <select
                  className="w-full bg-black-rich border border-white/10 px-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors"
                >
                  <option value="limbus">Limbuš</option>
                  <option value="lent">Lent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 font-inter text-sm mb-2">
                Sporočilo
              </label>
              <textarea
                rows={6}
                className="w-full bg-black-rich border border-white/10 px-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors resize-none"
                placeholder="Vaše sporočilo..."
              />
            </div>

            <div className="flex justify-center">
              <GoldButton type="submit">
                <span className="flex items-center gap-2">
                  <SendIcon className="w-4 h-4" />
                  Pošlji Sporočilo
                </span>
              </GoldButton>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Map/Social Section */}
      <section ref={mapRef} className="relative py-32 px-6 bg-black-rich">
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isMapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-gold tracking-[0.3em] uppercase text-sm font-inter mb-4">
              Sledite Nam
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-6">
              Bodite Del <span className="text-gold-gradient">Naše Zgodbe</span>
            </h2>
            <div className="w-24 h-px bg-gold mx-auto mb-8" />
            <p className="text-gray-400 font-inter font-light max-w-2xl mx-auto">
              Pridružite se nam na družbenih omrežjih za ekskluzivne ponudbe, 
              kulinarične dogodke in novosti iz naše kuhinje.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto"
          >
            <a
              href="https://www.instagram.com/jackandjoe.si"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-black-card border border-white/5 p-8 hover:border-gold/20 transition-all duration-500 text-center"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <h3 className="font-playfair text-xl text-white mb-2">Instagram</h3>
              <p className="text-gray-400 font-inter text-sm">@jackandjoe.si</p>
            </a>

            <a
              href="https://www.facebook.com/jackandjoe.si"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-black-card border border-white/5 p-8 hover:border-gold/20 transition-all duration-500 text-center"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <h3 className="font-playfair text-xl text-white mb-2">Facebook</h3>
              <p className="text-gray-400 font-inter text-sm">Jack & Joe</p>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}