import React, { useState, useEffect } from 'react';
import { trpc } from '../../services/trpc';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const AdminInventory = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({ name: '', price: '', stock: '', categoryId: 1 });
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchProducts = async () => {
        try {
            const data = await trpc.product.list.query();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await trpc.admin.manageProduct.mutate({
                id: editingId || undefined,
                name: formData.name,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                categoryId: parseInt(formData.categoryId)
            });
            setShowModal(false);
            setFormData({ name: '', price: '', stock: '', categoryId: 1 });
            setEditingId(null);
            fetchProducts();
        } catch (error) {
            console.error('Failed to save product', error);
            alert('Failed to save product: ' + error.message);
        }
    };

    const handleEdit = (prod) => {
        setEditingId(prod.id);
        setFormData({ name: prod.name, price: prod.price, stock: prod.stock, categoryId: prod.categoryId });
        setShowModal(true);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
                <h2 className="text-xl font-bold text-gray-800">Inventory Management</h2>
                <button 
                    onClick={() => { setEditingId(null); setFormData({ name: '', price: '', stock: '', categoryId: 1 }); setShowModal(true); }}
                    className="flex items-center px-4 py-2 bg-amazon_yellow hover:bg-amazon_orange font-medium rounded-lg text-sm text-black transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Product
                </button>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-600 sticky top-0 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-sm">ID</th>
                            <th className="p-4 font-semibold text-sm">Product Name</th>
                            <th className="p-4 font-semibold text-sm">Price</th>
                            <th className="p-4 font-semibold text-sm">Stock</th>
                            <th className="p-4 font-semibold text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((prod) => (
                            <tr key={prod.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-sm text-gray-500">#{prod.id}</td>
                                <td className="p-4 text-sm font-medium text-gray-800">{prod.name}</td>
                                <td className="p-4 text-sm text-gray-600">${prod.price.toFixed(2)}</td>
                                <td className="p-4 text-sm max-w-xs truncate">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${prod.stock > 10 ? 'bg-green-100 text-green-700' : prod.stock > 0 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                                        {prod.stock} in stock
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <button onClick={() => handleEdit(prod)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-block">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-500">No products found. Start by adding one!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-2xl">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-amazon_yellow focus:outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                    <input required type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-amazon_yellow focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                    <input required type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-amazon_yellow focus:outline-none" />
                                </div>
                            </div>
                            <div className="flex space-x-3 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-amazon_yellow hover:bg-amazon_orange text-black rounded-lg font-medium shadow-sm transition-colors">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminInventory;
