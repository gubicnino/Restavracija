import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import ReservationForm from '../ReservationForm';


export function Reservation() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [reservationData, setReservationData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    occasion: '',
    requests: ''
  });

  
  const occasions = ['Brez', 'Rojstni dan', 'Obletnica', 'Poslovno kosilo', 'Zmenek', 'Praznovanje', 'Drugo'];
  
  return (
    <section id="reservation" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop" 
          alt="" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black-rich/90" />
        <div className="absolute inset-0 texture-overlay" />
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.3em] uppercase text-sm font-inter mb-4">
            Pridružite se nam
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Naredite <span className="text-gold-gradient">Rezervacijo</span>
          </h2>
          <p className="text-gray-400 font-inter font-light max-w-xl mx-auto">
            Doživite nepozaben večer. Rezervirajte svojo mizo in dovolite nam,
            da ustvarimo nepozabno kulinarično izkušnjo za vas.
          </p>
          <div className="w-24 h-px bg-gold mx-auto mt-8" />
        </motion.div>
      </div>
      <ReservationForm />
    </section>
  );
}