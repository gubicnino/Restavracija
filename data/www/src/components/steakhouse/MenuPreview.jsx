import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
const menuData = [{
  name: 'Burgers',
  items: [{
    name: 'Smash',
    description: 'Hlebček, 2x "smash" hrustljava pleskavica iz zorjene slovenske govedine, 2x cheddar sir, 2x slanina, hišna omaka, popečena čebula, kisle kumarice',
    price: '13,60',
    image: '/assets/menu/burgers/smash burger.avif',
    tag: "Chef's Choice"
  }, {
    name: 'Cheese Junkie',
    description: 'Črn hlebček, meso, "Bergkäse", dvojna slanina, rukola, ocvrta čebula, pomfri, omaka, injekcija cheddar sira in injekcija smokey BBQ omake',
    price: '14,60',
    image: '/assets/menu/burgers/cheese junkie.avif',
    tag: 'Premium'
  }, {
    name: 'King Kong',
    description: 'Hlebček, tri polpete, cheddar sir, hrustljava slanina, čebula, kisla kumarica, omaka, solata',
    price: '20,59',
    image: '/assets/menu/burgers/king kong.avif'
  }, {
    name: 'Jack & Joe',
    description: 'Črn hlebček, meso, rezine pljučne na žaru, tartufi, tartufata, cheddar sir, omaka, hrustljava slanina, omaka, rukola',
    price: '19,59',
    image: '/assets/menu/burgers/jack and joe.avif'
  }]
}, {
  name: 'Pizze',
  items: [{
    name: 'Pizza Margerita',
    description: 'Pelati, sir mozzarella Fior Di Latte, bazilika',
    price: '12,60',
    image: '/assets/menu/pizze/margerita.avif'
  }, {
    name: 'Pizza Mortadela in tartufi',
    description: 'Zelena omaka, sir mozzarella Fior Di Latte, pol sušeni paradižniki, mortadela, buratta, pistacije, olje s tartufi',
    price: '16,60',
    image: '/assets/menu/pizze/mortadela in tartufi.avif'
  }, {
    name: 'Pizza Jack Wurst',
    description: 'Zelena omaka, specialna mešanica sirov, domača salsiccia, slanina, salama, rdeča čebula, domača gorčična omaka',
    price: '14,20',
    image: '/assets/menu/pizze/jack wurst.avif'
  }, {
    name: 'Pizza Carpaccio',
    description: 'Green sauce, posebna mešanica sirov, carpaccio, tartufata',
    price: '15,60',
    image: '/assets/menu/pizze/carpaccio.avif'
  }]
}, {
  name: 'Ostale jedi',
  items: [{
    name: 'Dimljena rebrca',
    description: 'Dimljena rebrca (500 g) z BBQ in curryjevo omako, domač pomfri',
    price: '18,59',
    image: '/assets/menu/ostale jedi/dimljena rebrca.avif'
  }, {
    name: 'Buffalo perutničke s prilogo',
    description: 'Buffalo perutničke (45 dag) z buffalo omako, dollar chips, kisla smetana',
    price: '15,90',
    image: '/assets/menu/ostale jedi/buffalo perutničke s prilogo.avif'
  }, {
    name: 'Sticky fingers z dollar chipsom',
    description: 'Sticky fingers z BBQ in curryjevo omako, dollar chips',
    price: '13,90',
    image: '/assets/menu/ostale jedi/sticky fingers z dollar chipsom.avif'
  }, {
    name: 'Perutničke s prilogo',
    description: 'Perutničke (45 dag) z BBQ in curryjevo omako, dollar chips',
    price: '14,89',
    image: '/assets/menu/ostale jedi/perutničke s prilogo.avif'
  }]
}];
export function MenuPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const [activeCategory, setActiveCategory] = useState(0);
  return <section id="menu" className="relative py-32 px-6 bg-black-card">
      {/* Background texture */}
      <div className="absolute inset-0 texture-overlay" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.8
      }} className="text-center mb-16">
          <p className="text-gold tracking-[0.3em] uppercase text-sm font-inter mb-4">
             Kulinarna senzacija
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Naš <span className="text-gold-gradient">Meni</span>
          </h2>
          <div className="w-24 h-px bg-gold mx-auto" />
        </motion.div>

        {/* Category Tabs */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.8,
        delay: 0.2
      }} className="flex justify-center gap-2 md:gap-4 mb-16 flex-wrap">
          {menuData.map((category, index) => <button key={category.name} onClick={() => setActiveCategory(index)} className={`relative px-6 py-3 font-inter text-sm tracking-wider uppercase transition-colors duration-300 ${activeCategory === index ? 'text-gold' : 'text-gray-400 hover:text-white'}`}>
              {category.name}
              {activeCategory === index && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-px bg-gold" transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30
          }} />}
            </button>)}
        </motion.div>

        {/* Menu Items Grid */}
        <motion.div key={activeCategory} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="grid md:grid-cols-2 gap-8">
          {menuData[activeCategory].items.map((item, index) => <motion.div key={item.name} initial={{
          opacity: 0,
          y: 30
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.1 * index
        }} className="group flex gap-6 p-6 bg-black-rich/50 border border-white/5 hover:border-gold/20 transition-colors duration-500">
              {/* Image */}
              <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {item.tag && <div className="absolute top-2 left-2 px-2 py-1 bg-gold text-black-rich text-[10px] tracking-wider uppercase font-semibold">
                    {item.tag}
                  </div>}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-playfair text-xl text-white group-hover:text-gold transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="font-playfair text-xl text-gold ml-4">
                    €{item.price}
                  </span>
                </div>
                <p className="text-gray-500 font-inter text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>)}
        </motion.div>

        {/* View Full Menu CTA */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.8,
        delay: 0.6
      }} className="text-center mt-16">
          <a href="/meni" className="inline-flex items-center gap-3 text-gold font-inter text-sm tracking-wider uppercase hover:text-gold-light transition-colors duration-300">
            <span>Prikaži celoten meni</span>
            <span className="w-8 h-px bg-current" />
          </a>
        </motion.div>
      </div>
    </section>;
}