export default function DayTime(props) {
    return (
        <div key={props.index} className="flex justify-between items-center border-b border-white/5 pb-3">
            <span className="text-white font-inter text-sm">{props.item.day}</span>
            <span className="text-gold font-inter font-light text-sm">{props.item.time}</span>
        </div>
    )
}