import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CalendarIcon, ClockIcon, UsersIcon, PhoneIcon, MailIcon, CheckIcon } from 'lucide-react';

export function Reservation() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  
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
  
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };
  
  const timeSlots = ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'];
  const occasions = ['None', 'Birthday', 'Anniversary', 'Business Dinner', 'Date Night', 'Celebration', 'Other'];
  
  return (
    <section id="reservation" className="relative py-32 px-6 overflow-hidden">
      {/* Background Image */}
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
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.3em] uppercase text-sm font-inter mb-4">
            Join Us
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Make a <span className="text-gold-gradient">Reservation</span>
          </h2>
          <p className="text-gray-400 font-inter font-light max-w-xl mx-auto">
            Experience an unforgettable evening. Reserve your table and let us
            create a memorable dining experience for you.
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
              Reservation Confirmed
            </h3>
            <p className="text-gray-400 font-inter font-light mb-8">
              Thank you for choosing Prime & Oak. A confirmation email has been
              sent to {formData.email}. We look forward to welcoming you.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)} 
              className="text-gold font-inter text-sm tracking-wider uppercase hover:text-gold-light transition-colors"
            >
              Make Another Reservation
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
              {/* Name */}
              <div>
                <label className="block text-sm text-gray-400 font-inter mb-2 tracking-wider uppercase">
                  Full Name *
                </label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="w-full bg-black-rich border border-white/10 px-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors" 
                  placeholder="John Smith" 
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-400 font-inter mb-2 tracking-wider uppercase">
                  Email Address *
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
                    placeholder="john@example.com" 
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-gray-400 font-inter mb-2 tracking-wider uppercase">
                  Phone Number *
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
                    placeholder="(555) 123-4567" 
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm text-gray-400 font-inter mb-2 tracking-wider uppercase">
                  Date *
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <input 
                    type="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-black-rich border border-white/10 pl-12 pr-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors" 
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm text-gray-400 font-inter mb-2 tracking-wider uppercase">
                  Time *
                </label>
                <div className="relative">
                  <ClockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <select 
                    name="time" 
                    value={formData.time} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-black-rich border border-white/10 pl-12 pr-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select Time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-sm text-gray-400 font-inter mb-2 tracking-wider uppercase">
                  Number of Guests *
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
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                    <option value="9+">9+ Guests (Private Dining)</option>
                  </select>
                </div>
              </div>

              {/* Occasion */}
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 font-inter mb-2 tracking-wider uppercase">
                  Special Occasion
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

              {/* Special Requests */}
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 font-inter mb-2 tracking-wider uppercase">
                  Special Requests
                </label>
                <textarea 
                  name="requests" 
                  value={formData.requests} 
                  onChange={handleChange} 
                  rows={4} 
                  className="w-full bg-black-rich border border-white/10 px-4 py-3 text-white font-inter focus:border-gold focus:outline-none transition-colors resize-none" 
                  placeholder="Dietary restrictions, seating preferences, or any special requests..." 
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-10 text-center">
              <motion.button 
                type="submit" 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }} 
                className="px-12 py-4 bg-gold text-black-rich font-inter font-semibold tracking-wider uppercase text-sm gold-glow transition-all duration-500 hover:bg-gold-light"
              >
                Confirm Reservation
              </motion.button>
              <p className="text-gray-500 text-sm font-inter mt-4">
                For parties of 9 or more, please call us at (555) 123-4567
              </p>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}