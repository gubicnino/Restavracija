import React, { use } from 'react';
import { Mail, Phone, Shield, Edit, Trash2 } from 'lucide-react';

export default function UsersTable({ 
    users, 
    onEdit, 
    onDelete 
}) {
    const getRoleBadge = (role) => {
        const styles = {
            administrator: 'bg-red-500/20 text-red-400 border-red-500/30',
            upravljalec: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        };
        
        const labels = {
            administrator: 'Administrator',
            upravljalec: 'Upravljalec',
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[role]}`}>
                {labels[role]}
            </span>
        );
    };

    return (
        <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-900/50 border-b border-gray-700">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Uporabnik
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Kontakt
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Vloga
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Akcije
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {users.map((user) => (
                        <tr key={user.user_id} className="hover:bg-gray-700/30 transition-colors">
                            <td className="px-6 py-4">
                                <div>
                                    <p className="font-semibold text-white">{user.ime} {user.priimek}</p>
                                    <p className="text-sm text-gray-400">ID: {user.user_id}</p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-300 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-3 h-3" />
                                        <span>{user.email}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {getRoleBadge(user.vloga)}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => onEdit(user.user_id)}
                                        className="p-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition-colors"
                                        title="Uredi"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>

                                    <button
                                        onClick={() => onDelete(user.user_id)}
                                        className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors"
                                        title="Izbriši"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
