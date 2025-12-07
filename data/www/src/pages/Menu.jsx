import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PageTitle from '../components/common/PageTitle';
import MenuPreview from '../components/steakhouse/MenuPreview';
export default function Menu() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState(0);

  const menuData = [
  {
    name: 'Burgers',
    items: [
      {
        name: 'Smash',
        description: 'Hlebček, 2x "smash" hrustljava pleskavica iz zorjene slovenske govedine, 2x cheddar sir, 2x slanina, hišna omaka, popečena čebula, kisle kumarice',
        price: '13,60',
        image: '/assets/menu/burgers/smash burger.avif',
        tag: "Chef's Choice"
      },
      {
        name: 'Cheese Junkie',
        description: 'Črn hlebček, meso, "Bergkäse", dvojna slanina, rukola, ocvrta čebula, pomfri, omaka, injekcija cheddar sira in injekcija smokey BBQ omake',
        price: '14,60',
        image: '/assets/menu/burgers/cheese junkie.avif',
        tag: 'Premium'
      },
      {
        name: 'King Kong',
        description: 'Hlebček, tri polpete, cheddar sir, hrustljava slanina, čebula, kisla kumarica, omaka, solata',
        price: '20,59',
        image: '/assets/menu/burgers/king kong.avif'
      },
      {
        name: 'Jack & Joe',
        description: 'Črn hlebček, meso, rezine pljučne na žaru, tartufi, tartufata, cheddar sir, omaka, hrustljava slanina, omaka, rukola',
        price: '19,59',
        image: '/assets/menu/burgers/jack and joe.avif'
      }
    ]
  },
  {
    name: 'Pizze',
    items: [
      {
        name: 'Pizza Margerita',
        description: 'Pelati, sir mozzarella Fior Di Latte, bazilika',
        price: '12,60',
        image: '/assets/menu/pizze/margerita.avif'
      },
      {
        name: 'Pizza Mortadela in tartufi',
        description: 'Zelena omaka, sir mozzarella Fior Di Latte, pol sušeni paradižniki, mortadela, buratta, pistacije, olje s tartufi',
        price: '16,60',
        image: '/assets/menu/pizze/mortadela in tartufi.avif'
      },
      {
        name: 'Pizza Jack Wurst',
        description: 'Zelena omaka, specialna mešanica sirov, domača salsiccia, slanina, salama, rdeča čebula, domača gorčična omaka',
        price: '14,20',
        image: '/assets/menu/pizze/jack wurst.avif'
      },
      {
        name: 'Pizza Carpaccio',
        description: 'Green sauce, posebna mešanica sirov, carpaccio, tartufata',
        price: '15,60',
        image: '/assets/menu/pizze/carpaccio.avif'
      }
    ]
  },
  {
    name: 'Ostale jedi',
    items: [
      {
        name: 'Dimljena rebrca',
        description: 'Dimljena rebrca (500 g) z BBQ in curryjevo omako, domač pomfri',
        price: '18,59',
        image: '/assets/menu/ostale jedi/dimljena rebrca.avif'
      },
      {
        name: 'Buffalo perutničke s prilogo',
        description: 'Buffalo perutničke (45 dag) z buffalo omako, dollar chips, kisla smetana',
        price: '15,90',
        image: '/assets/menu/ostale jedi/buffalo perutničke s prilogo.avif'
      },
      {
        name: 'Sticky fingers z dollar chipsom',
        description: 'Sticky fingers z BBQ in curryjevo omako, dollar chips',
        price: '13,90',
        image: '/assets/menu/ostale jedi/sticky fingers z dollar chipsom.avif'
      },
      {
        name: 'Perutničke s prilogo',
        description: 'Perutničke (45 dag) z BBQ in curryjevo omako, dollar chips',
        price: '14,89',
        image: '/assets/menu/ostale jedi/perutničke s prilogo.avif'
      }
    ]
  }
];

  return (
    <div className="bg-black-rich">
      {/* Hero Section */}
      <PageTitle
        PageTitle="Naš Meni"
        title="Odkrijte našo ponudbo"
        titleGold="vrhunskih jedi"
        backgroundImage="/assets/naslovna6-fotojj-l-big-19.jpg"
      />

      {/* Menu Section */}
      <MenuPreview
        menuData={menuData}
        showViewAllLink={false}
      />

      {/* Special Info Section */}
      <section className="relative py-20 px-6 bg-black-card">
        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gold text-2xl">🥩</span>
              </div>
              <h3 className="font-playfair text-xl text-white mb-2">Premium Meso</h3>
              <p className="text-gray-400 font-inter text-sm font-light">
                Black Angus govedina, suho zorjena 45+ dni
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gold text-2xl">🌿</span>
              </div>
              <h3 className="font-playfair text-xl text-white mb-2">Sveže Sestavine</h3>
              <p className="text-gray-400 font-inter text-sm font-light">
                Lokalni dobavitelji in sezonski proizvodi
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gold text-2xl">👨‍🍳</span>
              </div>
              <h3 className="font-playfair text-xl text-white mb-2">Odprta Kuhinja</h3>
              <p className="text-gray-400 font-inter text-sm font-light">
                Spremljajte pripravo vaših jedi v živo
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}