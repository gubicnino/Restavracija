import React from 'react';

export default function ReservationFilters({ filter, setFilter, searchTerm, setSearchTerm }) {
    const filters = [
        { id: 'all', label: 'Vse' },
        { id: 'today', label: 'Danes' },
        { id: 'pending', label: 'V čakanju' },
        { id: 'confirmed', label: 'Potrjeno' },
        { id: 'cancelled', label: 'Preklicano' }
    ];

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                {/* Filter Buttons */}
                <div className="flex gap-2 flex-wrap">
                    {filters.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => setFilter(id)}
                            className={`px-4 py-2 rounded-lg font-inter text-sm transition-all ${
                                filter === id
                                    ? 'bg-gold text-black-rich font-semibold'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {label}
                        </button>
                    ))}

                </div>

                {/* Search */}
                <div className="w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Iskanje po imenu, emailu..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    />
                </div>
            </div>
        </div>
    );
}
