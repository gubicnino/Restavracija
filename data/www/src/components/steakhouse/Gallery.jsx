import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

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
  const [selectedImage, setSelectedImage] = useState(null);
  
  const openLightbox = (index) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const navigateImage = (direction) => {
    if (selectedImage === null) return;
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };
  
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.button 
              key={index} 
              initial={{ opacity: 0, y: 30 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ duration: 0.6, delay: 0.1 * index }} 
              onClick={() => openLightbox(index)} 
              className={`group relative overflow-hidden cursor-pointer ${index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''}`} 
              aria-label={`View ${image.alt}`}
            >
              <div className={`aspect-square ${index === 0 || index === 5 ? 'md:aspect-auto md:h-full' : ''}`}>
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black-rich/0 group-hover:bg-black-rich/40 transition-colors duration-500" />
              {/* Gold border on hover */}
              <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/50 transition-colors duration-500 m-2" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 z-50 bg-black-rich/95 flex items-center justify-center p-4" 
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button 
            onClick={closeLightbox} 
            className="absolute top-6 right-6 text-white/60 hover:text-gold transition-colors z-10" 
            aria-label="Close gallery"
          >
            <XIcon className="w-8 h-8" />
          </button>

          {/* Navigation */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }} 
            className="absolute left-4 md:left-8 text-white/60 hover:text-gold transition-colors z-10" 
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="w-10 h-10" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }} 
            className="absolute right-4 md:right-8 text-white/60 hover:text-gold transition-colors z-10" 
            aria-label="Next image"
          >
            <ChevronRightIcon className="w-10 h-10" />
          </button>

          {/* Image */}
          <motion.img 
            key={selectedImage} 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.3 }} 
            src={galleryImages[selectedImage].src} 
            alt={galleryImages[selectedImage].alt} 
            className="max-w-full max-h-[85vh] object-contain" 
            onClick={(e) => e.stopPropagation()} 
          />

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 font-inter text-sm">
            {selectedImage + 1} / {galleryImages.length}
          </div>
        </motion.div>
      )}
    </section>
  );
}