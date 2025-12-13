export default function KeyInsights(props) {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
                {props.type === "red" ? (
                    <span className="w-6 h-6 text-red-400">{props.icon}</span>
                ) : (
                    <span className="w-6 h-6 text-gold">{props.icon}</span>
                )}
                <h3 className="font-semibold text-white">{props.title}</h3>
            </div>
            {props.type === "red" ? (
                <p className="text-3xl font-bold text-red-400">{props.value}</p>
            ) : (
                <p className="text-3xl font-bold text-gold">{props.value}</p>
            )}
        </div>
    )
}
