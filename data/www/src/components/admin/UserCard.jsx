import React from 'react';
import { Mail, Phone, Shield, Edit, Trash2 } from 'lucide-react';

export default function UserCard({ 
    user, 
    onEdit, 
    onDelete 
}) {
    const getRoleBadge = (role) => {
        const styles = {
            admin: 'bg-red-500/20 text-red-400 border-red-500/30',
            upravljalec: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        };
        
        const labels = {
            admin: 'Administrator',
            upravljalec: 'Upravljalec',
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[role]}`}>
                {labels[role]}
            </span>
        );
    };

    return (
        <div className="p-6 hover:bg-gray-700/30 transition-colors">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="font-semibold text-white text-lg mb-1">
                        {user.polno_ime}
                    </h3>
                    <p className="text-sm text-gray-400">ID: {user.user_id}</p>
                </div>
                {getRoleBadge(user.vloga)}
            </div>

            <div className="space-y-2 mb-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{user.email}</span>
                </div>
                {user.telefon && (
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{user.telefon}</span>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span>Registriran: {new Date(user.datum_registracije).toLocaleDateString('sl-SI', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                    })}</span>
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(user.user_id)}
                    className="flex-1 px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                >
                    <Edit className="w-4 h-4" />
                    Uredi
                </button>
                <button
                    onClick={() => onDelete(user.user_id)}
                    className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                >
                    <Trash2 className="w-4 h-4" />
                    Izbriši
                </button>
            </div>
        </div>
    );
}
