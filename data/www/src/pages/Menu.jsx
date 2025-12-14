import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import PageTitle from '../components/common/PageTitle';
import MenuPreview from '../components/steakhouse/MenuPreview';
import { pridobiMeniIteme } from '../services/meni';
export default function Menu() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [menuData, setMenuData] = useState([]);


  useEffect(() => {
    pridobiMeniIteme().then(data => {
      console.log('Pridobljeni meni itemi:', data);
      const transformedData = transformMenuData(data.data);
      console.log('Transformed Menu Data:', transformedData);
      setMenuData(transformedData);
    });
  }, []);
  function transformMenuData(apiData) {
    // Group by location, then by category
    const locations = {};
    const allLocationItems = []; // Shranjujemo vse iteme z lokacijo "vse"
    
    apiData.forEach(item => {
      const locationId = item.lokacija || 'all';
      const categoryName = item.category_name || item.kategorija;
      
      // Če je lokacija "vse", shranimo posebej
      if (locationId === 'vse' || locationId === 'all') {
        allLocationItems.push(item);
      }
      
      // Create location if doesn't exist
      if (!locations[locationId]) {
        locations[locationId] = {};
      }
      
      // Create category within location if doesn't exist
      if (!locations[locationId][categoryName]) {
        locations[locationId][categoryName] = {
          name: categoryName,
          items: []
        };
      }
      
      locations[locationId][categoryName].items.push({
        name: item.ime,
        description: item.opis,
        price: item.cena,
        image: item.slika,
        tag: item.oznaka || undefined
      });
    });
    
    // Dodaj vse iteme iz "vse" v ostale lokacije (limbus, lent)
    const specificLocations = Object.keys(locations).filter(loc => loc !== 'vse' && loc !== 'all');
    
    allLocationItems.forEach(item => {
      const categoryName = item.category_name || item.kategorija;
      
      specificLocations.forEach(locationId => {
        // Create location if doesn't exist
        if (!locations[locationId]) {
          locations[locationId] = {};
        }
        
        // Create category within location if doesn't exist
        if (!locations[locationId][categoryName]) {
          locations[locationId][categoryName] = {
            name: categoryName,
            items: []
          };
        }
        
        // Dodaj item samo če že ne obstaja (preprečimo duplikate)
        const itemExists = locations[locationId][categoryName].items.some(
          existingItem => existingItem.name === item.ime
        );
        
        if (!itemExists) {
          locations[locationId][categoryName].items.push({
            name: item.ime,
            description: item.opis,
            price: item.cena,
            image: item.slika,
            tag: item.oznaka || undefined
          });
        }
      });
    });
    
    // Convert to format: { locationId: [categories] }
    const result = {};
    Object.keys(locations).forEach(locationId => {
      result[locationId] = Object.values(locations[locationId]);
    });
    
    return result;
  }
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
        showLocationTabs={true}
        isCustomData={true}
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