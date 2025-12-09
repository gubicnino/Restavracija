import React, { useState } from 'react';
import { Calendar, Clock, Check } from 'lucide-react';
import StatsCard from '../StatsCard';
import ReservationFilters from '../ReservationFilters';
import ReservationTable from '../ReservationTable';
import ReservationCard from '../ReservationCard';

export default function ReservationsTab({ 
    reservations, 
    waitingReservations,
    confirmedReservations,
    todayReservations,
    onConfirm,
    onReject,
    onEdit,
    onDelete 
}) {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReservations = reservations.filter(reservation => {
        const dateString = new Date(reservation.datum).toLocaleDateString('sl-SI', { day: 'numeric', month: 'long', year: 'numeric' });
        const matchesSearch = searchTerm === '' ||
            reservation.polno_ime.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dateString.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filter === 'all' || reservation.status === filter ||
            (filter === 'today' && reservation.datum === new Date().toISOString().split('T')[0]);

        return matchesSearch && matchesFilter;
    });

    return (
        <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatsCard title="V čakanju" value={waitingReservations.length} icon={Clock} color="yellow" />
                <StatsCard title="Potrjeno" value={confirmedReservations.length} icon={Check} color="green" />
                <StatsCard title="Danes" value={todayReservations.length} icon={Calendar} color="gold" />
            </div>

            {/* Filters & Search */}
            <ReservationFilters 
                filter={filter}
                setFilter={setFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            {/* Reservations Table/List */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden">
                {/* Desktop Table View */}
                <ReservationTable
                    reservations={filteredReservations}
                    onConfirm={onConfirm}
                    onReject={onReject}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />

                {/* Mobile Card View */}
                <div className="lg:hidden divide-y divide-gray-700">
                    {filteredReservations.map((reservation) => (
                        <ReservationCard
                            key={reservation.reservation_id}
                            reservation={reservation}
                            onConfirm={onConfirm}
                            onReject={onReject}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
