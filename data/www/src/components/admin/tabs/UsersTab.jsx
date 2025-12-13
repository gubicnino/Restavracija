import React, { useEffect, useState } from 'react';
import UsersTable from '../UsersTable';
import UserCard from '../UserCard';
import { pridobiUporabnike, posodobiUporabnika, ustvariUporabnika, izbrisiUporabnika } from '../../../services/uporabniki';
import Modal from '../../common/Modal';
import { UserPlus } from 'lucide-react';

export default function UsersTab() {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        ime: '',
        priimek: '',
        email: '',
        geslo: '',
        vloga: 'upravljalec'
    });

    useEffect(() => {
        pridobiUporabnike().then(data => {
            console.log('Pridobljeni uporabniki:', data);
            setUsers(data.data);
        });
    }, []);

    const handleAdd = () => {
        setIsEditing(false);
        setEditingUser(null);
        setFormData({
            ime: '',
            priimek: '',
            email: '',
            geslo: '',
            vloga: 'upravljalec'
        });
        setIsModalOpen(true);
    };

    const handleEdit = (id) => {
        const user = users.find(u => u.user_id === id);
        if (user) {
            setIsEditing(true);
            setEditingUser(user);
            setFormData({
                ime: user.ime,
                priimek: user.priimek,
                email: user.email,
                geslo: '',
                vloga: user.vloga
            });
            setIsModalOpen(true);
            
        }

    };

    const handleDelete = (id) => {
        izbrisiUporabnika(id).then(async () => {
            const data = await pridobiUporabnike();
            setUsers(data.data);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isEditing) {
            await posodobiUporabnika(editingUser.user_id, formData);
        } else {
            await ustvariUporabnika(formData);
        }
        
        const data = await pridobiUporabnike();
        setUsers(data.data);
        setIsModalOpen(false);
    };

    const filteredUsers = users.filter(user => {
        return searchTerm === '' ||
            user.polno_ime.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <h2 className="font-playfair text-2xl text-white">Uporabniki</h2>
                    <div className="flex gap-3 items-center">
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 bg-gold text-black-rich font-semibold rounded-lg hover:bg-gold/90 transition-colors flex items-center gap-2 whitespace-nowrap"
                        >
                            <UserPlus className="w-5 h-5" />
                            <span className="hidden sm:inline">Dodaj uporabnika</span>
                        </button>

                    </div>
                </div>
            </div>

            {/* Users Table/List */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden">
                {/* Desktop Table View */}
                <UsersTable
                    users={filteredUsers}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {/* Mobile Card View */}
                <div className="lg:hidden divide-y divide-gray-700">
                    {filteredUsers.map((user) => (
                        <UserCard
                            key={user.user_id}
                            user={user}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>

            {/* Add/Edit User Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-6">
                    <h3 className="font-playfair text-2xl text-white mb-6">
                        {isEditing ? 'Uredi uporabnika' : 'Dodaj uporabnika'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Ime */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Ime
                            </label>
                            <input
                                type="text"
                                value={formData.ime}
                                onChange={(e) => setFormData({ ...formData, ime: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
                                required
                            />
                        </div>

                        {/* Priimek */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Priimek
                            </label>
                            <input
                                type="text"
                                value={formData.priimek}
                                onChange={(e) => setFormData({ ...formData, priimek: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
                                required
                            />
                        </div>

                        {/* Geslo */}
                        {!isEditing && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">
                                    Geslo
                                </label>
                                <input
                                    type="password"
                                    value={formData.geslo}
                                    onChange={(e) => setFormData({ ...formData, geslo: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
                                    required
                                />
                            </div>
                        )}

                        {/* Vloga */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Vloga
                            </label>
                            <select
                                value={formData.vloga}
                                onChange={(e) => setFormData({ ...formData, vloga: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
                                required
                            >
                                <option value="upravljalec">Upravljalec</option>
                                <option value="administrator">Administrator</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3 bg-gold text-black-rich font-semibold rounded-lg hover:bg-gold/90 transition-colors"
                            >
                                {isEditing ? 'Shrani' : 'Dodaj'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors"
                            >
                                Prekliči
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
