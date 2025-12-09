import React from 'react';
import { Edit, Trash2, Users } from 'lucide-react';

export default function TableCard({ 
    table, 
    onEdit, 
    onDelete 
}) {
    return (
        <div className="p-6 hover:bg-gray-700/30 transition-colors">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="font-semibold text-white text-lg mb-1">
                        Miza {table.stevilka}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{table.kapaciteta} oseb</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(table.table_id)}
                    className="flex-1 px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                >
                    <Edit className="w-4 h-4" />
                    Uredi
                </button>
                <button
                    onClick={() => onDelete(table.table_id)}
                    className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                >
                    <Trash2 className="w-4 h-4" />
                    Izbriši
                </button>
            </div>
        </div>
    );
}
