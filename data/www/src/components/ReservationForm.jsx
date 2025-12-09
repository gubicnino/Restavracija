import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { CalendarIcon, ClockIcon, UsersIcon, PhoneIcon, MailIcon, CheckIcon, AlertCircleIcon, Loader2Icon } from 'lucide-react';
import { ustvariRezervacijo } from '../services/rezervacije';
import { pridobiProsteTermine } from '../services/termini';

export default function ReservationForm() {
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

  useEffect(() => {
  // Počakaj 300ms po zadnji spremembi
  const timer = setTimeout(() => {
    const fetchAvailableSlots = async () => {
      if (!formData.date || !formData.guests) {
        setAvailableSlots([]);
        return;
      }

      setLoadingSlots(true);
      
      try {
        const data = await pridobiProsteTermine(
          formData.date,
          parseInt(formData.guests)
        );

        if (data.success) {
          setAvailableSlots(data.prosti_termini);
        } else {
          console.error('Error fetching slots:', data.message);
          setAvailableSlots([]);
        }
      } catch (error) {
        console.error('Error fetching available slots:', error);
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchAvailableSlots();
  }, 500);

  // Cleanup - prekliči timer če se date/guests spremeni pred 500ms
  return () => clearTimeout(timer);
  }, [formData.date, formData.guests]);
  
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

    if (e.target.name === 'date' || e.target.name === 'guests') {
      setFormData(prev => ({
        ...prev,
        time: ''
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setIsSubmitting(true);
    setSubmitError(null);

    const reservationDetails = {
      polno_ime: formData.name,
      email: formData.email,
      telefon: formData.phone,
      datum: formData.date,
      cas_zacetek: formData.time,
      stevilo_oseb: parseInt(formData.guests),
      posebna_priloznost: formData.occasion || null,
      posebne_zelje: formData.requests || null
    };

    try {
      const response = await ustvariRezervacijo(reservationDetails);
      console.log('Reservation created:', response);
      
      if (response.success) {
        setReservationData(response);
        setIsSubmitted(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: '2',
          occasion: '',
          requests: ''
        });
      } else {
        setSubmitError(response.message || 'Prišlo je do napake pri ustvarjanju rezervacije.');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      setSubmitError('Prišlo je do napake pri povezavi s strežnikom. Prosimo poskusite znova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewReservation = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    setReservationData(null);
  };
  
  const occasions = ['Brez', 'Rojstni dan', 'Obletnica', 'Poslovno kosilo', 'Zmenek', 'Praznovanje', 'Drugo'];
  
  return (
      <div ref={ref} className="relative max-w-5xl mx-auto">
        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="bg-black-card/80 backdrop-blur-sm border border-gold/20 p-12 text-center"
          >
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-playfair text-3xl text-white mb-4">
              Rezervacija Potrjena
            </h3>
            <p className="text-gray-400 font-inter font-light mb-2">
              Hvala, ker ste izbrali Jack & Joe. Potrditveno sporočilo je bilo
              poslano na <span className="text-white">{formData.email}</span>.
            </p>
            
            {reservationData && (
              <div className="bg-black-rich/50 border border-gold/10 p-6 my-6 text-left">
                <h4 className="font-playfair text-xl text-gold mb-4">Podrobnosti rezervacije:</h4>
                <div className="space-y-2 text-sm font-inter">
                  <p className="text-gray-400">
                    <span className="text-white font-medium">Rezervacijska št.:</span> #{reservationData.reservation_id}
                  </p>
                  <p className="text-gray-400">
                    <span className="text-white font-medium">Miza št.:</span> {reservationData.table_id}
                  </p>
                  {reservationData.email_sent && (
                    <p className="text-green-400 flex items-center gap-2 mt-4">
                      <CheckIcon className="w-4 h-4" />
                      Email potrditev uspešno poslana
                    </p>
                  )}
                </div>
              </div>
            )}
            
            <p className="text-gray-500 font-inter text-sm mb-8">
              Veselimo se vašega obiska.
            </p>
            <button 
              onClick={handleNewReservation}
              className="text-gold font-inter text-sm tracking-wider uppercase hover:text-gold-light transition-colors"
            >
              Naredite novo rezervacijo
            </button>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 30 }} 
            animate={isInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            onSubmit={handleSubmit} 
            className="bg-black-card/80 backdrop-blur-sm border border-white/10 p-8 md:p-12"
          >
            {/* Error Message */}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-red-500/10 border border-red-500/20 flex items-start gap-3"
              >
                <AlertCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-red-500 font-inter font-semibold text-sm mb-1">
                    Napaka pri rezervaciji
                  </h4>
                  <p className="text-red-400 font-inter text-sm font-light">
                    {submitError}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitError(null)}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  ✕
                </button>
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm text-gray-400 font-inter mb-2 tracking-wider uppercase">
                  Polno Ime *
                </label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  disabled={isSubmitting}
                  className="w-full bg-black-rich border border-white/10 px-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                  placeholder="Janez Novak" 
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 font-inter mb-2 tracking-wider uppercase">
                  Email Naslov *
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    disabled={isSubmitting}
                    className="w-full bg-black-rich border border-white/10 pl-12 pr-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                    placeholder="janez@primer.si" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 font-inter mb-2 tracking-wider uppercase">
                  Telefonska Številka *
                </label>
                <div className="relative">
                  <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                    disabled={isSubmitting}
                    className="w-full bg-black-rich border border-white/10 pl-12 pr-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                    placeholder="040 123 456" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 font-inter mb-2 tracking-wider uppercase">
                  Datum *
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <input 
                    type="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleChange} 
                    required 
                    disabled={isSubmitting}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-black-rich border border-white/10 pl-12 pr-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 font-inter mb-2 tracking-wider uppercase">
                  Število Oseb *
                </label>
                <div className="relative">
                  <UsersIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <select 
                    name="guests" 
                    value={formData.guests} 
                    onChange={handleChange} 
                    required 
                    disabled={isSubmitting}
                    className="w-full bg-black-rich border border-white/10 pl-12 pr-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Oseba' : num === 2 ? 'Osebi' : num <= 4 ? 'Osebe' : 'Oseb'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 font-inter mb-2 tracking-wider uppercase">
                  Čas *
                </label>
                <div className="relative">
                  <ClockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <select 
                    name="time" 
                    value={formData.time} 
                    onChange={handleChange} 
                    required 
                    disabled={loadingSlots || !formData.date || formData.guests === '9+' || isSubmitting}
                    className="w-full bg-black-rich border border-white/10 pl-12 pr-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {loadingSlots 
                        ? 'Nalagam proste termine...' 
                        : !formData.date 
                        ? 'Najprej izberite datum' 
                        : formData.guests === '9+'
                        ? 'Pokličite nas za rezervacijo'
                        : availableSlots.length === 0 
                        ? 'Ni prostih terminov' 
                        : 'Izberite čas'}
                    </option>
                    {availableSlots.map(slot => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                
                {!loadingSlots && formData.date && formData.guests !== '9+' && (
                  <p className="text-gray-500 text-xs font-inter mt-2">
                    {availableSlots.length > 0 
                      ? `${availableSlots.length} ${availableSlots.length === 1 ? 'prost termin' : 'prosti termini'}`
                      : 'Za izbrani datum ni prostih terminov. Poskusite drug datum ali nas pokličite.'}
                  </p>
                )}
              </div>

              <div className="md:col-span-2" style={{ marginTop: '-8px' }}>
                <label className="block text-sm text-gray-400 font-inter mb-2 tracking-wider uppercase">
                  Posebna Priložnost
                </label>
                <select 
                  name="occasion" 
                  value={formData.occasion} 
                  onChange={handleChange} 
                  disabled={isSubmitting}
                  className="w-full bg-black-rich border border-white/10 px-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {occasions.map(occ => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 font-inter mb-2 tracking-wider uppercase">
                  Posebne Želje
                </label>
                <textarea 
                  name="requests" 
                  value={formData.requests} 
                  onChange={handleChange} 
                  rows={4} 
                  disabled={isSubmitting}
                  className="w-full bg-black-rich border border-white/10 px-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed" 
                  placeholder="Prehranske omejitve, želje glede sedeža ali katere koli druge posebne želje..." 
                />
              </div>
            </div>

            <div className="mt-10 text-center">
              <motion.button 
                type="submit" 
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="relative px-12 py-4 bg-gold text-black-rich font-inter font-semibold tracking-wider uppercase text-sm gold-glow transition-all duration-500 hover:bg-gold-light disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden min-w-[240px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <Loader2Icon className="w-5 h-5 animate-spin" />
                    Obdelujem rezervacijo...
                  </span>
                ) : (
                  'Potrdi Rezervacijo'
                )}
              </motion.button>
              <p className="text-gray-500 text-sm font-inter mt-4">
                Za skupine od 9 ali več oseb nas pokličite na 040 123 456
              </p>
            </div>
          </motion.form>
        )}
      </div>
  );
}