import React from 'react';
import { Calendar, Clock, Users, Phone, Mail } from 'lucide-react';
import StatusBadge from './StatusBadge';
import ReservationActions from './ReservationActions';

export default function ReservationCard({ 
    reservation, 
    onConfirm, 
    onReject, 
    onEdit, 
    onDelete 
}) {
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
        <div className="p-6 hover:bg-gray-700/30 transition-colors">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="font-semibold text-white text-lg mb-1">
                        {mappedReservation.customerName}
                    </h3>
                    {mappedReservation.specialOccasion && (
                        <p className="text-sm text-gold">
                            🎉 {mappedReservation.specialOccasion}
                        </p>
                    )}
                </div>
                <StatusBadge status={mappedReservation.status} />
            </div>

            <div className="space-y-2 mb-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{mappedReservation.email}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{mappedReservation.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{mappedReservation.date}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{mappedReservation.time}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{mappedReservation.guests} oseb - {mappedReservation.table}</span>
                </div>
            </div>

            <ReservationActions
                reservation={mappedReservation}
                onConfirm={onConfirm}
                onReject={onReject}
                onEdit={onEdit}
                onDelete={onDelete}
                isMobile={true}
            />
        </div>
    );
}
