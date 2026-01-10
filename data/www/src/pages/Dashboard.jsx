import { useEffect, useState } from 'react';
import BottomNavigation from '../components/admin/BottomNavigation';
import DashboardSidebar from '../components/admin/DashboardSidebar';
import ReservationsTab from '../components/admin/tabs/ReservationsTab';
import StatisticsTab from '../components/admin/tabs/StatisticsTab';
import TablesTab from '../components/admin/tabs/TablesTab';
import UsersTab from '../components/admin/tabs/UsersTab';
import { useUser } from '../context/UserContext';
import { izbrisiRezervacijo, potrdiRezervacijo, pridobiRezervacije, urediRezervacijo, zavrniRezervacijo } from '../services/rezervacije';
import '../styles/Dashboard.css';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('reservations');
    const [reservations, setReservations] = useState([]);
    const [waitingReservations, setWaitingReservations] = useState([]);
    const [confirmedReservations, setConfirmedReservations] = useState([]);
    const [todayReservations, setTodayReservations] = useState([]);

    useEffect(() => {
        pridobiRezervacije().then(data => {
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
            <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="dashboard-content lg:ml-64 pt-32 lg:pt-40 pb-24 lg:pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="dashboard-header mb-6 lg:mb-8 text-center pt-4 lg:pt-12">
                        <h1 className="dashboard-title font-playfair text-3xl md:text-4xl lg:text-5xl text-white mb-2">
                            Dashboard
                        </h1>
                        <p className="font-inter text-sm md:text-base text-gray-400">
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