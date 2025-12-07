import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../../styles/PageTitle.css';

export default function PageTitle({ PageTitle, title, titleGold, backgroundImage }) {
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className="relative h-[60vh] w-full overflow-hidden">
        {/* Parallax Background */}
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black-rich/70 via-black-rich/50 to-black-rich" />
          <div className="absolute inset-0 texture-overlay" />
        </motion.div>

        {/* Content */}
        <motion.div 
          style={{ opacity }} 
          className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="w-24 h-px bg-gold mb-8"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gold tracking-[0.3em] uppercase text-sm md:text-base font-inter font-light mb-4"
          >
            {PageTitle}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-playfair text-5xl md:text-7xl font-medium text-white mb-6"
          >
            {title} <br />
            <span className="text-gold-gradient">{titleGold}</span>
          </motion.h1>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black-rich to-transparent z-20" />
      </section>
  );
}