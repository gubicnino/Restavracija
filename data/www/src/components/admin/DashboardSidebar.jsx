import React from 'react';
import { Calendar, Users, BarChart3, Table } from 'lucide-react';

export default function DashboardSidebar({ activeTab, setActiveTab }) {
    const menuItems = [
        { id: 'reservations', label: 'Rezervacije', icon: Calendar },
        { id: 'users', label: 'Uporabniki', icon: Users },
        { id: 'statistics', label: 'Statistike', icon: BarChart3 },
        { id: 'tables', label: 'Mize', icon: Table }
    ];

    return (
        <aside className="w-64 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 min-h-screen fixed left-0 top-0 pt-24">
            <nav className="p-6">
                <h2 className="font-playfair text-xl text-white mb-6">Admin Panel</h2>
                <ul className="space-y-2">
                    {menuItems.map(({ id, label, icon: Icon }) => (
                        <li key={id}>
                            <button
                                onClick={() => setActiveTab(id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-inter ${
                                    activeTab === id
                                        ? 'bg-gold text-black-rich font-semibold'
                                        : 'text-gray-300 hover:bg-gray-700/50'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
