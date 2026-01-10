import React from 'react';
import { Mail, Phone, Shield, Edit, Trash2 } from 'lucide-react';

export default function UserCard({ user, onEdit, onDelete }) {
  const getRoleBadge = role => {
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
    <div className="p-4 md:p-6 hover:bg-gray-700/30 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-white text-base md:text-lg mb-1">
            {user.ime} {user.priimek}
          </h3>
          <p className="text-xs md:text-sm text-gray-400 pt-3">ID: {user.user_id}</p>
        </div>
        {getRoleBadge(user.vloga)}
      </div>

      <div className="space-y-2 mb-4 text-xs md:text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <Mail className="w-3 md:w-4 h-3 md:h-4 text-gray-400 flex-shrink-0" />
          <span className="break-all">{user.email}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(user.user_id)}
          className="flex-1 px-3 md:px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition-colors text-xs md:text-sm flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Uredi
        </button>
        <button
          onClick={() => onDelete(user.user_id)}
          className="flex-1 px-3 md:px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors text-xs md:text-sm flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Izbriši
        </button>
      </div>
    </div>
  );
}
