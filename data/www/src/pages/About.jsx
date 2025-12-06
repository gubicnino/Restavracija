import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, Clock, ChefHat, MapPin, UtensilsCrossed } from 'lucide-react';
import { GoldButton } from '../components/common/Button';
import PageTitle from '../components/common/PageTitle';
import { Reservation } from '../components/steakhouse/Reservation';

function About() {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const philosophyRef = useRef(null);
  const locationsRef = useRef(null);
  
  const isStoryInView = useInView(storyRef, { once: true, margin: '-100px' });
  const isValuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const isPhilosophyInView = useInView(philosophyRef, { once: true, margin: '-100px' });
  const isLocationsInView = useInView(locationsRef, { once: true, margin: '-100px' });

  const [activeTab, setActiveTab] = useState('limbus');

  const locations = {
    limbus: {
      name: 'Jack&Joe BBQ & Pizza',
      location: 'Limbuš',
      subtitle: 'Umik v naravo ob reki Dravi',
      image: '/assets/limbus.jpg',
      description: 'Umeščena v idilično naravno okolje Limbuškega nabrežja je ta restavracija pravi pobeg od mestnega vrveža. Obkrožena z zelenjem in pomirjajočim pogledom na reko Dravo ustvarja sproščujoče vzdušje, ki gostom omogoča, da se umaknejo od vsakdana in uživajo v počasnejšem ritmu.',
      highlights: [
        'Edinstvena lokacija v osrčju narave, le nekaj minut izven mesta',
        'Kulinarična raznolikost, ki združuje vrhunske steake, sočne burgerje, gurmanske pizze in domače testenine',
        'Pristno sproščen ambient, popoln za družinske obede, romantične večerje ali druženje s prijatelji',
        'Čudovit razgled na reko, ki ustvarja nepozabno kulinarično izkušnjo v naravi'
      ]
    },
    lent: {
      name: 'Jack&Joe Steak & Burger Club',
      location: 'Lent, Maribor',
      subtitle: 'Urbana energija ob zgodovinskem nabrežju',
      image: '/assets/lenti.jpg',
      description: 'V središču obnovljenega Lenta, ob zgodovinskih ulicah in živahni energiji reke Drave, se nahaja lokacija, kjer se klasični ameriški okusi prepletajo z azijskimi in mehiškimi vplivi. To je prostor za tiste, ki radi raziskujejo – za gurmane, ki si želijo dinamičnih, drznih in sodobnih kombinacij.',
      highlights: [
        'Izjemna ponudba steakov in burgerjev, pripravljenih iz vrhunskega mesa',
        'Pestri vplivi azijske in mehiške kuhinje, ki ustvarjajo edinstvene in drzne jedi',
        'Privlačna lokacija na mariborskem Lentu, ob slikovitem sprehajališču ob reki',
        'Sodoben in toplo zasnovan ambient, ki združuje urbano energijo in sproščenost'
      ]
    }
  };

  return (
    <div className="bg-black-rich">
      {/* Hero Section */}
      <PageTitle
        PageTitle="O nas"
        title="Strast do mesa,"
        titleGold="predanost odličnosti"
        backgroundImage="/assets/jackandjoe4.jpg"
      />

      {/* Story Section */}
      <section ref={storyRef} className="relative py-32 px-6 bg-black-rich overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="/assets/fotojj-p-126.jpg"
                  alt="Premium aged steak"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-4 border border-gold/30 pointer-events-none" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                className="absolute -bottom-8 -right-8 w-48 h-48 lg:w-64 lg:h-64 hidden md:block"
              >
                <img
                  src="/assets/fotojj-p-08.jpg"
                  alt="Restaurant interior"
                  className="w-full h-full object-cover shadow-2xl"
                />
                <div className="absolute inset-2 border border-gold/30 pointer-events-none" />
              </motion.div>
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
              className="lg:pl-8"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-gold tracking-[0.3em] uppercase text-sm font-inter mb-4"
              >
                Naša Zgodba
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight"
              >
                Kulinarična izkušnja
                <span className="block text-gold-gradient">ob Dravi</span>
              </motion.h2>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={isStoryInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-24 h-px bg-gold mb-8 origin-left"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-6 text-gray-400 font-inter font-light leading-relaxed"
              >
                <p>
                  Jack & Joe ni le še ena steak & burger restavracija – je prostor, 
                  kjer se vonj žara prepleta z rečnim vetričem, tradicija z drznostjo, 
                  ter meso z zgodbo. Naši dve restavraciji, umeščeni ob slikovito reko Dravo, 
                  sta nastali iz želje ustvariti pristno zatočišče za ljubitelje 
                  visokokakovostnega mesa in dovršene kulinarike.
                </p>
                <p>
                  Od prvega dne si prizadevamo gostu ponuditi več kot obrok. Želimo 
                  ustvariti občutek, da je vsak obisk majhno kulinarično potovanje – 
                  sproščeno, avtentično in z izjemnim spoštovanjem do surovin.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Kitchen Section */}
      <section className="relative py-32 px-6 bg-black-card overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-30" />
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="lg:pr-8"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gold tracking-[0.3em] uppercase text-sm font-inter mb-4"
              >
                Odprtost & Preglednost
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight"
              >
                Srce naše
                <span className="block text-gold-gradient">kuhinje</span>
              </motion.h2>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-24 h-px bg-gold mb-8 origin-left"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-6 text-gray-400 font-inter font-light leading-relaxed"
              >
                <p>
                  Ko vstopite v Jack & Joe, vas najprej objame ambient topline, lesa 
                  in modernih linij. A pravi čar se skriva prav tam, kjer se dogaja – 
                  v naši <strong className="text-gold">odprti kuhinji</strong>.
                </p>
                <p>
                  Ta ni le estetska odločitev, temveč naša zaveza preglednosti in 
                  mojstrstva. Gostom ponuja neposreden vpogled v kulinarični balet 
                  naše ekipe: precizne reze, značilen zvok mesa na vroči plošči, 
                  pozorno izbiro vsake sestavine in usklajenost ekipe, ki ustvarja 
                  krožnike, na katere smo ponosni.
                </p>
                <p>
                  Vsaka jed je skrbno izdelana zgodba – od surovine do zadnjega 
                  detajla na krožniku.
                </p>
              </motion.div>
            </motion.div>

            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
              className="relative"
            >
              <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                <img
                  src="/assets/naslovna2-fotojj-l-big-02.jpg"
                  alt="Open kitchen at Jack & Joe"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-4 border border-gold/30 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black-card/80 via-transparent to-transparent" />
              </div>
              
              {/* Decorative Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                className="absolute -bottom-8 -left-8 bg-black-rich border border-gold/20 p-8 shadow-2xl hidden md:block"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-playfair text-5xl text-gold-gradient">100%</span>
                  <span className="text-white/60 font-inter text-sm">Preglednost</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section ref={locationsRef} className="relative py-32 px-6 bg-black-rich overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-20" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2" />
        
        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLocationsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-gold tracking-[0.3em] uppercase text-sm font-inter mb-4">
              Naši Lokaciji
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-8">
              Dve lokaciji, <span className="text-gold-gradient">ena zgodba</span>
            </h2>
            <div className="w-24 h-px bg-gold mx-auto mb-8" />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLocationsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl mx-auto text-gray-400 font-inter font-light leading-relaxed text-lg"
            >
              Jack & Joe danes živi na dveh edinstvenih lokacijah ob reki Dravi – vsaka s svojo zgodbo, 
              značajem in izkušnjo. Čeprav ju povezuje ista strast do mesa, kulinarike in prijetnega 
              ambienta, vsaka ponuja nekaj povsem svojega.
            </motion.p>
          </motion.div>

          {/* Tabs Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLocationsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center gap-4 mb-12"
          >
            <button
              onClick={() => setActiveTab('limbus')}
              className={`group relative px-8 py-4 font-inter font-light tracking-wide transition-all duration-300 ${
                activeTab === 'limbus' 
                  ? 'text-gold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Limbuš
              </span>
              <div className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${
                activeTab === 'limbus' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>

            <button
              onClick={() => setActiveTab('lent')}
              className={`group relative px-8 py-4 font-inter font-light tracking-wide transition-all duration-300 ${
                activeTab === 'lent' 
                  ? 'text-gold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5" />
                Lent
              </span>
              <div className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${
                activeTab === 'lent' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black-card border border-gold/10 overflow-hidden"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                <img
                  src={locations[activeTab].image}
                  alt={locations[activeTab].name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black-card/50 to-transparent lg:from-black-card/80" />
                <div className="absolute inset-6 border border-gold/20 pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12">
                <div className="mb-6">
                  <h3 className="font-playfair text-3xl md:text-4xl text-white mb-2">
                    {locations[activeTab].name}
                  </h3>
                  <p className="text-gold tracking-[0.2em] uppercase text-sm font-inter">
                    {locations[activeTab].location}
                  </p>
                </div>

                <div className="w-16 h-px bg-gold mb-6" />

                <p className="font-playfair text-xl text-white/80 mb-6 italic">
                  {locations[activeTab].subtitle}
                </p>

                <p className="text-gray-400 font-inter font-light leading-relaxed mb-8">
                  {locations[activeTab].description}
                </p>

                <div className="space-y-4">
                  <h4 className="font-playfair text-xl text-white mb-4">
                    Zakaj jo gostje obožujejo:
                  </h4>
                  {locations[activeTab].highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-400 font-inter font-light leading-relaxed">
                        {highlight}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLocationsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16 p-8 bg-black-card/50 border border-gold/10"
          >
            <p className="text-gray-300 font-inter font-light leading-relaxed text-lg max-w-4xl mx-auto">
              Ne glede na to, ali si želite umirjenega kulinaričnega pobega v Limbušu ali živahnega 
              doživetja na Lentu, vas na obeh lokacijah povezuje enaka <span className="text-gold">Jack&Joe filozofija</span>: 
              kakovost, strast do mesa, pristen ambient in nepozabna izkušnja.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="relative py-32 px-6 bg-black-card">
        <div className="absolute inset-0 texture-overlay" />
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-gold tracking-[0.3em] uppercase text-sm font-inter mb-4">
              Naše vrednote
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Kar nas <span className="text-gold-gradient">opredeljuje</span>
            </h2>
            <div className="w-24 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Kakovost',
                description: 'Uporabljamo samo najboljše sestavine, od premium mesa do svežih lokalnih izdelkov.'
              },
              {
                icon: ChefHat,
                title: 'Mojstrstvo',
                description: 'Naši chefi so strokovnjaki, ki obvladajo umetnost priprave popolnega steaka.'
              },
              {
                icon: Users,
                title: 'Izkušnja',
                description: 'Vsak obisk je več kot le obrok - to je nepozabna kulinarična dogodivščina.'
              },
              {
                icon: Clock,
                title: 'Tradicija',
                description: 'Več kot 30 let predanosti vrhunski gastronomiji in zadovoljstvu gostov.'
              }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group relative p-8 bg-black-rich/50 border border-white/5 hover:border-gold/20 transition-all duration-500"
                >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-gold group-hover:h-full transition-all duration-500" />
                  
                  <Icon className="w-12 h-12 text-gold mb-6" />
                  
                  <h3 className="font-playfair text-2xl text-white mb-4 group-hover:text-gold transition-colors duration-300">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-400 font-inter font-light leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={philosophyRef} className="relative py-32 px-6 bg-black-rich overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isPhilosophyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-gold tracking-[0.3em] uppercase text-sm font-inter mb-4">
              Naša Filozofija
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-8">
              Popolnost v <span className="text-gold-gradient">vsakem detajlu</span>
            </h2>
            <div className="w-24 h-px bg-gold mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isPhilosophyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6 text-gray-400 font-inter font-light leading-relaxed text-center text-lg"
          >
            <p>
              Verjamemo, da je popoln steak kombinacija najboljšega mesa, strokovne priprave in 
              pozornosti do vsakega detajla. Vsaka jed, ki zapusti našo kuhinjo, je mojstrovina.
            </p>
            <p>
              Naša zaveza je ponuditi vsakemu gostu edinstveno izkušnjo, kjer se srečata tradicija 
              in sodobna kulinarika, vse v elegantni in ekskluzivni atmosferi.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isPhilosophyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center mt-12"
          >
          </motion.div>
        </div>
      </section>
      <Reservation />
    </div>
  );
}

export default About;
