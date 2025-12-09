import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Check } from 'lucide-react';
import StatsCard from '../components/admin/StatsCard';
import ReservationFilters from '../components/admin/ReservationFilters';
import ReservationTable from '../components/admin/ReservationTable';
import ReservationCard from '../components/admin/ReservationCard';
import { pridobiRezervacije } from '../services/rezervacije';
import { potrdiRezervacijo, zavrniRezervacijo, urediRezervacijo, izbrisiRezervacijo } from '../services/rezervacije';

export default function Dashboard() {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [reservations, setReservations] = useState([]);
    const [waitingReservations, setWaitingReservations] = useState([]);
    const [confirmedReservations, setConfirmedReservations] = useState([]);
    const [todayReservations, setTodayReservations] = useState([]);

    useEffect(() => {
        pridobiRezervacije().then(data => {
            console.log('Pridobljene rezervacije:', data);
            setReservations(data.data);
            setCardsData(data.data);
        });
    }, []);
    const handleConfirm = async (id) => {
        await potrdiRezervacijo(id);
        const data = await pridobiRezervacije();
        setReservations(data.data);
        setCardsData(data.data);

    };
    function setCardsData(data) {
        setWaitingReservations(data.filter(reservation => reservation.status === 'pending'));
        setConfirmedReservations(data.filter(reservation => reservation.status === 'confirmed'));
        const today = new Date().toISOString().split('T')[0];
        setTodayReservations(data.filter(reservation => reservation.datum === today));
    }

    const handleReject = async (id) => {
        await zavrniRezervacijo(id);
        const data = await pridobiRezervacije();
        setReservations(data.data);
        setCardsData(data.data);
    };

    const handleEdit = async (id) => {
        await urediRezervacijo(id);
        const data = await pridobiRezervacije();
        setReservations(data.data);
    };

    const handleDelete = async (id) => {
        await izbrisiRezervacijo(id);
        const data = await pridobiRezervacije();
        setReservations(data.data);
        setCardsData(data.data);
    };

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
        <div className="min-h-screen bg-gradient-to-br from-black-rich via-gray-900 to-black-rich pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 text-center pt-24 ">
                    <h1 className="font-playfair text-4xl md:text-5xl text-white mb-2">
                        Dashboard
                    </h1>
                    <p className="font-inter text-gray-400">
                        Upravljanje z rezervacijami
                    </p>
                </div>

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
                        onConfirm={handleConfirm}
                        onReject={handleReject}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    {/* Mobile Card View */}
                    <div className="lg:hidden divide-y divide-gray-700">
                        {reservations.map((reservation) => (
                            <ReservationCard
                                key={reservation.id}
                                reservation={reservation}
                                onConfirm={handleConfirm}
                                onReject={handleReject}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}