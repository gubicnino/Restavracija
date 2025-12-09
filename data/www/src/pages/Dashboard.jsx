import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import DashboardSidebar from '../components/admin/DashboardSidebar';
import ReservationsTab from '../components/admin/tabs/ReservationsTab';
import UsersTab from '../components/admin/tabs/UsersTab';
import StatisticsTab from '../components/admin/tabs/StatisticsTab';
import TablesTab from '../components/admin/tabs/TablesTab';
import { pridobiRezervacije } from '../services/rezervacije';
import { potrdiRezervacijo, zavrniRezervacijo, urediRezervacijo, izbrisiRezervacijo } from '../services/rezervacije';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('reservations');
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

    const renderTabContent = () => {
        const { currentUser } = useUser();
        switch (activeTab) {
            case 'reservations':
                return (
                    <ReservationsTab
                        reservations={reservations}
                        waitingReservations={waitingReservations}
                        confirmedReservations={confirmedReservations}
                        todayReservations={todayReservations}
                        onConfirm={handleConfirm}
                        onReject={handleReject}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                );
            case 'users':
                if (currentUser?.vloga !== 'administrator') {
                    return (
                        <div className="text-center py-12">
                            <p className="text-red-400 text-lg">Nimate dostopa do te strani.</p>
                        </div>
                    );
                }
                return <UsersTab />;
            case 'statistics':
                return <StatisticsTab />;
            case 'tables':
                return <TablesTab />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black-rich via-gray-900 to-black-rich">
            <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="ml-64 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 text-center pt-12">
                        <h1 className="font-playfair text-4xl md:text-5xl text-white mb-2">
                            Dashboard
                        </h1>
                        <p className="font-inter text-gray-400">
                            {activeTab === 'reservations' && 'Upravljanje z rezervacijami'}
                            {activeTab === 'users' && 'Upravljanje uporabnikov'}
                            {activeTab === 'statistics' && 'Statistike rezervacij'}
                            {activeTab === 'tables' && 'Upravljanje miz'}
                        </p>
                    </div>

                    {/* Tab Content */}
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
}