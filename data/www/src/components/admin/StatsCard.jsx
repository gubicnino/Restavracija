import React from 'react';

export default function StatsCard({ title, value, icon: Icon, color }) {
    const colorClasses = {
        yellow: 'text-yellow-400',
        green: 'text-green-400',
        gold: 'text-gold'
    };

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm font-inter mb-1">{title}</p>
                    <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
                </div>
                <Icon className={`w-10 h-10 ${colorClasses[color]}/50`} />
            </div>
        </div>
    );
}
