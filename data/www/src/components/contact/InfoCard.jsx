export default function InfoCard(props) {
    return (
        <div className="group bg-black-card border border-white/5 p-8 hover:border-gold/20 transition-all duration-500">
              <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-6">
                {/*<MapPinIcon className="w-6 h-6 text-gold" />*/}
                <span className="text-gold text-2xl">{props.icon}</span>
              </div>
              <h3 className="font-playfair text-2xl text-white mb-4">{props.title}</h3>
              <p className="text-gray-400 font-inter font-light leading-relaxed">
                {props.description}
              </p>
        </div>
    )
}