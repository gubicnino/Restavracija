import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, Calendar, Clock, Award, XCircle } from 'lucide-react';
import { 
    PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { pridobiRezervacije } from '../../../services/rezervacije';
import StatsCard from '../StatsCard';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';

export default function StatisticsTab() {
    const [reservations, setReservations] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        confirmed: 0,
        pending: 0,
        denied: 0,
        thisMonth: 0,
        thisWeek: 0,
        avgGuests: 0,
        topTimeSlot: '',
        topDay: ''
    });

    const { isLoggedIn, currentUser } = useUser();

    useEffect(() => {
        pridobiRezervacije().then(data => {
            setReservations(data.data);
            calculateStats(data.data);
        });
    }, []);

    const calculateStats = (reservations) => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());

        const total = reservations.length;
        const confirmed = reservations.filter(r => r.status === 'confirmed').length;
        const pending = reservations.filter(r => r.status === 'pending').length;
        const denied = reservations.filter(r => r.status === 'denied').length;
        
        const thisMonth = reservations.filter(r => 
            new Date(r.datum) >= startOfMonth
        ).length;
        
        const thisWeek = reservations.filter(r => 
            new Date(r.datum) >= startOfWeek
        ).length;

        const avgGuests = reservations.length > 0 
            ? (reservations.reduce((sum, r) => sum + parseInt(r.stevilo_oseb), 0) / reservations.length).toFixed(1)
            : 0;

        // Top time slot
        const timeSlots = {};
        reservations.forEach(r => {
            const time = r.cas_zacetek?.slice(0, 5) || '';
            timeSlots[time] = (timeSlots[time] || 0) + 1;
        });
        const topTimeSlot = Object.keys(timeSlots).reduce((a, b) => 
            timeSlots[a] > timeSlots[b] ? a : b, '');

        // Top day of week
        const days = {};
        const dayNames = ['Nedelja', 'Ponedeljek', 'Torek', 'Sreda', 'Četrtek', 'Petek', 'Sobota'];
        reservations.forEach(r => {
            const dayIndex = new Date(r.datum).getDay();
            const dayName = dayNames[dayIndex];
            days[dayName] = (days[dayName] || 0) + 1;
        });
        const topDay = Object.keys(days).reduce((a, b) => 
            days[a] > days[b] ? a : b, '');

        setStats({
            total,
            confirmed,
            pending,
            denied,
            thisMonth,
            thisWeek,
            avgGuests,
            topTimeSlot,
            topDay
        });
    };

    // Pie chart data for status distribution
    const getStatusPieData = () => {
        return [
            { name: 'Potrjeno', value: stats.confirmed, color: '#10b981' },
            { name: 'V čakanju', value: stats.pending, color: '#f59e0b' },
            { name: 'Zavrnjeno', value: stats.denied, color: '#ef4444' }
        ];
    };

    // Line chart data for monthly reservations
    const getMonthlyLineData = () => {
        const monthlyData = {};
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'];
        
        reservations.forEach(r => {
            const month = new Date(r.datum).getMonth();
            const monthName = months[month];
            monthlyData[monthName] = (monthlyData[monthName] || 0) + 1;
        });

        return months.map(month => ({
            month,
            rezervacije: monthlyData[month] || 0
        }));
    };

    const statusPieData = getStatusPieData();
    const monthlyLineData = getMonthlyLineData();

    const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatsCard title="Skupaj" value={stats.total} icon={Calendar} color="gold" />
                <StatsCard title="Ta mesec" value={stats.thisMonth} icon={TrendingUp} color="green" />
                <StatsCard title="Ta teden" value={stats.thisWeek} icon={Clock} color="yellow" />
                <StatsCard title="Povprečno gostov" value={stats.avgGuests} icon={Users} color="gold" />
            </div>

            {/* Key Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Award className="w-6 h-6 text-gold" />
                        <h3 className="font-semibold text-white">Najbolj priljubljen čas</h3>
                    </div>
                    <p className="text-3xl font-bold text-gold">{stats.topTimeSlot}</p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-6 h-6 text-gold" />
                        <h3 className="font-semibold text-white">Najbolj zaseden dan</h3>
                    </div>
                    <p className="text-3xl font-bold text-gold">{stats.topDay}</p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <XCircle className="w-6 h-6 text-red-400" />
                        <h3 className="font-semibold text-white">Stopnja zavrnitve</h3>
                    </div>
                    <p className="text-3xl font-bold text-red-400">
                        {stats.total > 0 ? ((stats.denied / stats.total) * 100).toFixed(1) : 0}%
                    </p>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Status Pie Chart */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <h3 className="font-playfair text-2xl text-white mb-6">Status rezervacij</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={statusPieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {statusPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                                labelStyle={{ color: '#fff' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Monthly Line Chart */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <h3 className="font-playfair text-2xl text-white mb-6">Mesečne rezervacije</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyLineData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                                labelStyle={{ color: '#fff' }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="rezervacije" 
                                stroke="#d4af37" 
                                strokeWidth={3} 
                                dot={{ fill: '#d4af37', r: 5 }} 
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
