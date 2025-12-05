import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { CalendarIcon, ClockIcon, UsersIcon, PhoneIcon, MailIcon, CheckIcon } from 'lucide-react';
import { ustvariRezervacijo } from '../../services/rezervacije';
import { pridobiProsteTermine } from '../../services/termini';

export function Reservation() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const reservationDetails = {
      polno_ime: formData.name,
      email: formData.email,
      telefon: formData.phone,
      datum: formData.date,
      cas_zacetek: formData.time,
      stevilo_oseb: parseInt(formData.guests),
      posebna_priloznost: formData.occasion,
      posebne_zelje: formData.requests
    };

    ustvariRezervacijo(reservationDetails)
      .then(response => {
        console.log('Reservation created:', response);
        setIsSubmitted(true);
      })
      .catch(error => {
        console.error('Error creating reservation:', error);
      });
  };
  
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
            <p className="text-gray-400 font-inter font-light mb-8">
              Hvala, ker ste izbrali Prime & Oak. Potrditveno sporočilo je bilo
              poslano na {formData.email}. Veselimo se vašega obiska.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)} 
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
                  className="w-full bg-black-rich border border-white/10 px-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors" 
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
                    className="w-full bg-black-rich border border-white/10 pl-12 pr-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors" 
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
                    className="w-full bg-black-rich border border-white/10 pl-12 pr-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors" 
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
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-black-rich border border-white/10 pl-12 pr-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors" 
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
                    className="w-full bg-black-rich border border-white/10 pl-12 pr-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Oseba' : num === 2 ? 'Osebi' : num <= 4 ? 'Osebe' : 'Oseb'}
                      </option>
                    ))}
                    <option value="9+">9+ Oseb (Pokličite nas)</option>
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
                    disabled={loadingSlots || !formData.date || formData.guests === '9+'}
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

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 font-inter mb-2 tracking-wider uppercase">
                  Posebna Priložnost
                </label>
                <select 
                  name="occasion" 
                  value={formData.occasion} 
                  onChange={handleChange} 
                  className="w-full bg-black-rich border border-white/10 px-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors appearance-none cursor-pointer"
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
                  className="w-full bg-black-rich border border-white/10 px-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors resize-none" 
                  placeholder="Prehranske omejitve, želje glede sedeža ali katere koli druge posebne želje..." 
                />
              </div>
            </div>

            <div className="mt-10 text-center">
              <motion.button 
                type="submit" 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }} 
                className="px-12 py-4 bg-gold text-black-rich font-inter font-semibold tracking-wider uppercase text-sm gold-glow transition-all duration-500 hover:bg-gold-light"
              >
                Potrdi Rezervacijo
              </motion.button>
              <p className="text-gray-500 text-sm font-inter mt-4">
                Za skupine od 9 ali več oseb nas pokličite na 040 123 456
              </p>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}