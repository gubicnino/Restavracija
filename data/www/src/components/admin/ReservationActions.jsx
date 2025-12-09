import React from 'react';
import { Check, X, Edit, Trash2 } from 'lucide-react';

export default function ReservationActions({ 
    reservation, 
    onConfirm, 
    onReject, 
    onEdit, 
    onDelete,
    isMobile = false 
}) {
    if (isMobile) {
        return (
            <div className="flex gap-2 flex-wrap">
                {reservation.status === 'pending' && (
                    <button
                        onClick={() => onConfirm(reservation.id)}
                        className="flex-1 px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg transition-colors font-semibold text-sm flex items-center justify-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        Potrdi
                    </button>
                )}
                {(reservation.status === 'pending' || reservation.status === 'confirmed') && (
                    <button
                        onClick={() => onReject(reservation.id)}
                        className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors font-semibold text-sm flex items-center justify-center gap-2"
                    >
                        <X className="w-4 h-4" />
                        Prekliči
                    </button>
                )}
                <button
                    onClick={() => onEdit(reservation.id)}
                    className="px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition-colors text-sm flex items-center gap-2"
                >
                    <Edit className="w-4 h-4" />
                    Uredi
                </button>
                <button
                    onClick={() => onDelete(reservation.id)}
                    className="px-4 py-2 bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 rounded-lg transition-colors text-sm flex items-center gap-2"
                >
                    <Trash2 className="w-4 h-4" />
                    Izbriši
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-end gap-2">
            {reservation.status !== 'confirmed' && (
                <button
                    onClick={() => onConfirm(reservation.id)}
                    className="p-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg transition-colors"
                    title="Potrdi"
                >
                    <Check className="w-4 h-4" />
                </button>
            )}
            
            {(reservation.status !== 'denied') && (
                <button
                    onClick={() => onReject(reservation.id)}
                    className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors"
                    title="Prekliči"
                >
                    <X className="w-4 h-4" />
                </button>
            )}

            <button
                onClick={() => onEdit(reservation.id)}
                className="p-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition-colors"
                title="Uredi"
            >
                <Edit className="w-4 h-4" />
            </button>

            <button
                onClick={() => onDelete(reservation.id)}
                className="p-2 bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 rounded-lg transition-colors"
                title="Izbriši"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
