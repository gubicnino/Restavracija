import React from 'react';

export default function StatusBadge({ status }) {
    const styles = {
        pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
        denied: 'bg-red-500/20 text-red-400 border-red-500/30',
        cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    
    const labels = {
        pending: 'V čakanju',
        confirmed: 'Potrjeno',
        denied: 'Zavrnjeno',
        cancelled: 'Preklicano'
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
            {labels[status]}
        </span>
    );
}
