import { BarChart3, Calendar, Table, Users } from 'lucide-react';

export default function BottomNavigation({ activeTab, setActiveTab }) {
    const menuItems = [
        { id: 'reservations', label: 'Rezervacije', icon: Calendar },
        { id: 'users', label: 'Uporabniki', icon: Users },
        { id: 'statistics', label: 'Statistike', icon: BarChart3 },
        { id: 'tables', label: 'Mize', icon: Table }
    ];

    return (
        <nav className=" py-3 lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-t border-gray-700">
            <div className="flex items-center justify-around px-2">
                {menuItems.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => {
                            setActiveTab(id);
                            window.scrollTo({ top: 0, behavior: 'instant' });
                        }}
                        className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[70px] ${
                            activeTab === id
                                ? 'text-gold'
                                : 'text-gray-400'
                        }`}
                    >
                        <Icon className={`w-6 h-6 ${activeTab === id ? 'scale-110' : ''} transition-transform`} />
                        <span className="text-xs font-inter font-medium">{label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
}
