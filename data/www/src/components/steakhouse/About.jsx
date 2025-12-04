import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  
  return (
    <section id="about" className="relative py-32 px-6 bg-black-rich overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={isInView ? { opacity: 1, x: 0 } : {}} 
            transition={{ duration: 1, ease: 'easeOut' }} 
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop" 
                alt="Premium aged steak on wooden board" 
                className="w-full h-full object-cover" 
              />
              {/* Gold border accent */}
              <div className="absolute inset-4 border border-gold/30 pointer-events-none" />
            </div>
            {/* Floating accent image */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }} 
              className="absolute -bottom-8 -right-8 w-48 h-48 lg:w-64 lg:h-64 hidden md:block"
            >
              <img 
                src="https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2031&auto=format&fit=crop" 
                alt="Restaurant interior ambiance" 
                className="w-full h-full object-cover shadow-2xl" 
              />
              <div className="absolute inset-2 border border-gold/30 pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={isInView ? { opacity: 1, x: 0 } : {}} 
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }} 
            className="lg:pl-8"
          >
            {/* Section label */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ duration: 0.8, delay: 0.3 }} 
              className="text-gold tracking-[0.3em] uppercase text-sm font-inter mb-4"
            >
              Naša Zgodba
            </motion.p>

            {/* Heading */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ duration: 0.8, delay: 0.4 }} 
              className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight"
            >
              Kulinarični raj
              <span className="block text-gold-gradient">za ljubitelje mesa</span>
            </motion.h2>

            {/* Divider */}
            <motion.div 
              initial={{ scaleX: 0 }} 
              animate={isInView ? { scaleX: 1 } : {}} 
              transition={{ duration: 0.8, delay: 0.5 }} 
              className="w-24 h-px bg-gold mb-8 origin-left" 
            />

            {/* Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ duration: 0.8, delay: 0.6 }} 
              className="space-y-6 text-gray-400 font-inter font-light leading-relaxed"
            >
              <p>
                Jack & Joe, restavraciji ob reki Dravi, sta svetilnik za tiste, 
                ki so predani okusu mesa. Srce restavracije je odprta kuhinja, kjer se vidi, kako ekipa 
                izvaja kulinarični balet. Obiskovalci imajo edinstveno priložnost, 
                da so priča natančni pripravi vsake jedi in opazujejo, kako se 
                vsaka sestavina spreminja pod spretnimi rokami kuharske ekipe.
              </p>
              <p>
                Za vas izbiramo le najboljše sestavine – od premium irske Black Angus 
                govedine, ameriške, avstralske in slovenske govedine, ki jo sami suho 
                zorimo »dry age«, do home made burger kruhkov in krompirčka. Vse v 
                skladu z našim vodilom: <strong className="text-gold">"Sveže. Lokalno. Okusno."</strong>
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ duration: 0.8, delay: 0.7 }} 
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/10"
            >
              {[
                { number: '2', label: 'Lokaciji' },
                { number: '45+', label: 'Dni Zorenja' },
                { number: '100%', label: 'Premium Meso' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-playfair text-3xl md:text-4xl text-gold mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs tracking-[0.2em] uppercase text-gray-500 font-inter">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}