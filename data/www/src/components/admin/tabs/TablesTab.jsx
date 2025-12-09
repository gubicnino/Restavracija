import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import TablesTable from '../TablesTable';
import TableCard from '../TableCard';
import { pridobiMize, ustvariMizo, posodobiMizo, izbrisiMizo } from '../../../services/mize';
import Modal from '../../common/Modal';

export default function TablesTab() {
    const [tables, setTables] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTable, setEditingTable] = useState(null);
    const [formData, setFormData] = useState({
        stevilka: '',
        kapaciteta: ''
    });

    useEffect(() => {
        pridobiMize().then(data => {
            console.log('Pridobljene mize:', data);
            setTables(data.data);
        });
    }, []);

    const handleAdd = () => {
        setIsEditing(false);
        setEditingTable(null);
        setFormData({
            stevilka: '',
            kapaciteta: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (id) => {
        const table = tables.find(t => t.table_id === id);
        if (table) {
            setIsEditing(true);
            setEditingTable(table);
            setFormData({
                stevilka: table.stevilka,
                kapaciteta: table.kapaciteta
            });
            setIsModalOpen(true);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Ali ste prepričani, da želite izbrisati to mizo?')) {
            await izbrisiMizo(id);
            const data = await pridobiMize();
            setTables(data.data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isEditing) {
            await posodobiMizo(editingTable.table_id, formData);
        } else {
            await ustvariMizo(formData);
        }
        
        const data = await pridobiMize();
        setTables(data.data);
        setIsModalOpen(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            {/* Tables Section */}
            <div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <h2 className="font-playfair text-2xl text-white">Mize</h2>
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 bg-gold text-black-rich font-semibold rounded-lg hover:bg-gold/90 transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Dodaj mizo</span>
                        </button>
                    </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden">
                    {/* Desktop Table View */}
                    <TablesTable
                        tables={tables}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    {/* Mobile Card View */}
                    <div className="lg:hidden divide-y divide-gray-700">
                        {tables.map((table) => (
                            <TableCard
                                key={table.table_id}
                                table={table}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Add/Edit Table Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-6">
                    <h3 className="font-playfair text-2xl text-white mb-6">
                        {isEditing ? 'Uredi mizo' : 'Dodaj mizo'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Številka */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Številka mize
                            </label>
                            <input
                                type="number"
                                value={formData.stevilka}
                                onChange={(e) => setFormData({ ...formData, stevilka: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
                                required
                                min="1"
                            />
                        </div>

                        {/* Kapaciteta */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Kapaciteta (število oseb)
                            </label>
                            <input
                                type="number"
                                value={formData.kapaciteta}
                                onChange={(e) => setFormData({ ...formData, kapaciteta: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
                                required
                                min="1"
                            />
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
        </div>
    );
}
