import DayTime from './DayTime'
export default function TimeTable(props) {
    return (
            <div className="hours-wrapper">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-6 text-gold">{props.icon}</span>
                  <h3 className="font-playfair text-2xl text-white">{props.title}</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {props.hours.map((item, index) => (
                    <DayTime index={index} item={item} />
                  ))}
                </div>
                <p className="text-gray-500 font-inter font-light text-sm mt-6">
                  {props.note}
                </p>
            </div>
    )
}