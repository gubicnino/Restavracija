import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { GoldButton } from '../common/Button';
export function Hero() {
  const ref = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{
      y
    }} className="absolute inset-0 w-full h-[120%]">
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop')`
      }} />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black-rich/70 via-black-rich/50 to-black-rich" />
        {/* Texture overlay */}
        <div className="absolute inset-0 texture-overlay" />
      </motion.div>

      {/* Content */}
      <motion.div style={{
      opacity
    }} className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Decorative element */}
        <motion.div initial={{
        scaleX: 0
      }} animate={{
        scaleX: 1
      }} transition={{
        duration: 1,
        delay: 0.5,
        ease: 'easeOut'
      }} className="w-24 h-px bg-gold mb-8" />

        {/* Subtitle */}
        <motion.p initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.3
      }} className="text-gold tracking-[0.3em] uppercase text-sm md:text-base font-inter font-light mb-4">
          Est. 1987 • Sveže. Lokalno. Okusno
        </motion.p>

        {/* Main Title */}
        <motion.h1 initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1,
        delay: 0.5
      }} className="font-playfair text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-6">
          JACK <span className="text-gold-gradient">&</span> JOE
        </motion.h1>

        {/* Tagline */}
        <motion.p initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.7
      }} className="font-inter text-lg md:text-xl text-gray-300 font-light max-w-xl mb-12">
          Kulinarični raj za ljubitelje mesa
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <GoldButton href="#reservation">
            Rezerviraj mizo
          </GoldButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 1,
        delay: 1.5
      }} className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <motion.div animate={{
          y: [0, 8, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }} className="flex flex-col items-center text-gold/60">
            <span className="text-xs tracking-[0.2em] uppercase mb-2 font-inter">
              Scroll
            </span>
            <ChevronDownIcon className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black-rich to-transparent z-20" />
    </section>;
}