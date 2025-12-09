import React from 'react';
import { Calendar, Clock, Users, Phone, Mail } from 'lucide-react';
import StatusBadge from './StatusBadge';
import ReservationActions from './ReservationActions';

export default function ReservationTable({ 
    reservations, 
    onConfirm, 
    onReject, 
    onEdit, 
    onDelete 
}) {
    return (
        <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-900/50 border-b border-gray-700">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Gost
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Kontakt
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Datum & Čas
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Osebe & Miza
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Akcije
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {reservations.map((reservation) => {
                        const mappedReservation = {
                            id: reservation.reservation_id,
                            customerName: reservation.polno_ime,
                            email: reservation.email,
                            phone: reservation.telefon,
                            date: new Date(reservation.datum).toLocaleDateString('sl-SI', { day: 'numeric', month: 'long', year: 'numeric' }),
                            time: reservation.cas_zacetek.slice(0, 5),
                            guests: reservation.stevilo_oseb,
                            table: reservation.stevilka,
                            status: reservation.status,
                            specialOccasion: reservation.posebna_priloznost || '',
                            specialRequests: reservation.posebne_zelje || ''
                        };
                        
                        return (
                        <tr key={mappedReservation.id} className="hover:bg-gray-700/30 transition-colors">
                            <td className="px-6 py-4">
                                <div>
                                    <p className="font-semibold text-white">{mappedReservation.customerName}</p>
                                    {mappedReservation.specialOccasion && (
                                        <p className="text-xs text-gold mt-1">
                                            🎉 {mappedReservation.specialOccasion}
                                        </p>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-300 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-3 h-3" />
                                        <span>{mappedReservation.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-3 h-3" />
                                        <span>{mappedReservation.phone}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-300 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3 h-3" />
                                        <span>{mappedReservation.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3" />
                                        <span>{mappedReservation.time}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-300 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-3 h-3" />
                                        <span>{mappedReservation.guests} oseb</span>
                                    </div>
                                    <div>
                                        <span className="text-gold">Miza: {mappedReservation.table}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <StatusBadge status={mappedReservation.status} />
                            </td>
                            <td className="px-6 py-4">
                                <ReservationActions
                                    reservation={mappedReservation}
                                    onConfirm={onConfirm}
                                    onReject={onReject}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
