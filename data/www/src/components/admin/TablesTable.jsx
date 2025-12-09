import React from 'react';
import { Edit, Trash2, Users } from 'lucide-react';

export default function TablesTable({ 
    tables, 
    onEdit, 
    onDelete 
}) {
    return (
        <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-900/50 border-b border-gray-700">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Številka
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Kapaciteta
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Akcije
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {tables.map((table) => (
                        <tr key={table.table_id} className="hover:bg-gray-700/30 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-white">Miza {table.stevilka}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Users className="w-4 h-4" />
                                    <span>{table.kapaciteta} oseb</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => onEdit(table.table_id)}
                                        className="p-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition-colors"
                                        title="Uredi"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>

                                    <button
                                        onClick={() => onDelete(table.table_id)}
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
