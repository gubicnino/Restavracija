import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GalleryGrid from '../gallery/GalleryGrid';

const galleryImages = [{
  src: '/assets/jackandjoe1.jpg',
  alt: 'Krušna peč',
  category: 'interior'
}, {
  src: '/assets/jackandjoe2.jpg',
  alt: 'Two people working in the kitchen',
  category: 'interior'
}, {
  src: '/assets/jackandjoe3.jpg',
  alt: 'Premium slice of meat',
  category: 'food'
}, {
  src: '/assets/jackandjoe4.jpg',
  alt: 'Person grilling steaks',
  category: 'interior'
}, {
  src: '/assets/jackandjoe5.jpg',
  alt: 'A big burger',
  category: 'food'
}, {
  src: '/assets/jackandjoe7.jpg',
  alt: 'A meal being served',
  category: 'food'
}, {
  src: '/assets/jackandjoe8.jpg',
  alt: 'A hamburger ready to be eaten',
  category: 'food'
}, {
  src: '/assets/jackandjoe6.jpg',
  alt: 'A person preparing a pizza',
  category: 'food'
}];

export function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  
  return (
    <section id="gallery" className="relative py-32 px-6 bg-black-card">
      {/* Background texture */}
      <div className="absolute inset-0 texture-overlay" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.3em] uppercase text-sm font-inter mb-4">
            Vizualno potovanje
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Naša <span className="text-gold-gradient">galerija</span>
          </h2>
          <div className="w-24 h-px bg-gold mx-auto" />
        </motion.div>

        {/* Gallery Grid */}
        <GalleryGrid images={galleryImages}/>
      </div>

      
    </section>
  );
}