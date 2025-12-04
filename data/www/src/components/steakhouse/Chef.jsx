import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AwardIcon, StarIcon, BookOpenIcon } from 'lucide-react';
export function Chef() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const accolades = [
    { icon: StarIcon, title: 'Sveže', subtitle: 'Lokalno' },
    { icon: AwardIcon, title: 'Dry Age', subtitle: '45+ Dni' },
    { icon: BookOpenIcon, title: 'Odprta Kuhinja', subtitle: 'Kulinarični Balet' }
  ];
  return <section id="chef" className="relative py-32 px-6 bg-black-rich overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content Column */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 1,
          ease: 'easeOut'
        }} className="order-2 lg:order-1">
            {/* Section label */}
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={isInView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="text-gold tracking-[0.3em] uppercase text-sm font-inter mb-4">
              Naša Ekipa
            </motion.p>

            {/* Heading */}
            <motion.h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
              Igor <span className="text-gold-gradient">&</span>
              <span className="block">Damjan</span>
            </motion.h2>

            {/* Title */}
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={isInView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.8,
            delay: 0.4
          }} className="font-playfair text-xl text-gold/80 italic mb-8">
              Lastnika & Vizionarja Jack & Joe
            </motion.p>

            {/* Divider */}
            <motion.div initial={{
            scaleX: 0
          }} animate={isInView ? {
            scaleX: 1
          } : {}} transition={{
            duration: 0.8,
            delay: 0.5
          }} className="w-24 h-px bg-gold mb-8 origin-left" />

            {/* Description */}
            <motion.div className="space-y-6 text-gray-400 font-inter font-light leading-relaxed mb-12">
              <p>
                Igor in Damjan, dva "divja" protagonista, sta srce in duša Jack & Joe. 
                Z več kot desetletjem izkušenj v gostinstvu sta ustvarila edinstveno 
                destinacijo ob Dravi, kjer se strast do mesa sreča s popolno izvedbo.
              </p>
              <p>
                Njuna filozofija je preprosta: izbiraj najboljše, pripravi s strastjo in 
                postrezi z dušo. Vsak cut mesa, ki zapusti našo odprto kuhinjo, odraža 
                njuno predanost kakovosti in avtentičnosti.
              </p>
            </motion.div>

            {/* Accolades */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={isInView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.8,
            delay: 0.7
          }} className="grid grid-cols-3 gap-6">
              {accolades.map((item, index) => <div key={index} className="text-center">
                  <item.icon className="w-8 h-8 text-gold mx-auto mb-3" strokeWidth={1.5} />
                  <div className="font-playfair text-white text-sm mb-1">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500 font-inter">
                    {item.subtitle}
                  </div>
                </div>)}
            </motion.div>
          </motion.div>

          {/* Image Column */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 1,
          delay: 0.2,
          ease: 'easeOut'
        }} className="order-1 lg:order-2 relative">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src="/assets/onas-fotojj-p-98.jpg" alt="Chef Marcus Wellington in the kitchen" className="w-full h-full object-cover" />
              {/* Gold border accent */}
              <div className="absolute inset-4 border border-gold/30 pointer-events-none" />

              {/* Quote overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black-rich via-black-rich/80 to-transparent">
                <blockquote className="font-playfair text-lg md:text-xl text-white italic">
                  "Sveže. Lokalno. Okusno."
                </blockquote>
              </div>
            </div>

            {/* Decorative frame */}
            <div className="absolute -top-4 -right-4 w-full h-full border border-gold/20 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>;
}