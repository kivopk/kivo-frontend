import React, { useState, useEffect } from 'react';
import { trpc } from '../../services/trpc';
import { PackageSearch, CheckCircle, Clock, Truck } from 'lucide-react';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const data = await trpc.admin.getAllOrders.query();
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            await trpc.admin.updateOrderStatus.mutate({ id, status: newStatus });
            fetchOrders();
        } catch (error) {
            alert('Status update failed');
        }
    };

    const getStatusStyle = (status) => {
        switch(status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="p-6 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                <h2 className="text-xl font-bold text-gray-800">Order Management</h2>
                <p className="text-sm text-gray-500 mt-1">Track and update customer fulfillment statuses.</p>
            </div>

            <div className="flex-1 overflow-auto p-6 space-y-6">
                {orders.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <PackageSearch className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No orders placed yet.</p>
                    </div>
                ) : orders.map(order => (
                    <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center">
                            <div>
                                <h3 className="font-bold text-gray-800">Order #{order.id}</h3>
                                <p className="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="mt-4 md:mt-0 flex items-center space-x-4">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">Total</span>
                                    <span className="font-bold text-gray-800">${order.totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="h-8 border-l border-gray-300"></div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">Customer</span>
                                    <span className="font-medium text-gray-800">{order.fullName}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-6 flex flex-col lg:flex-row gap-8">
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-gray-700 mb-4 border-b pb-2">Items Ordered</h4>
                                <ul className="space-y-3">
                                    {order.items.map(item => (
                                        <li key={item.id} className="flex justify-between items-center">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                                                    <img src={item.product?.image || "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop"} className="h-8 w-8 object-contain" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-800">{item.product?.name || `Product ID ${item.productId}`} <span className="text-gray-400">x{item.quantity}</span></span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex-1 bg-gray-50 p-5 rounded-xl border border-gray-100">
                                <h4 className="text-sm font-semibold text-gray-700 mb-4">Fulfillment Status</h4>
                                <div className="flex flex-col space-y-4">
                                    <span className={`self-start px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md border ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </span>
                                    
                                    <div className="flex items-center space-x-2 pt-2">
                                        <label className="text-sm font-medium text-gray-600">Update Status:</label>
                                        <select 
                                            value={order.status}
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                            className="text-sm border border-gray-300 rounded-md p-1.5 bg-white focus:ring-2 focus:ring-amazon_yellow focus:outline-none"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-xs text-gray-500 border-t pt-3 mt-1">Shipping Address:</p>
                                        <p className="text-sm font-medium text-gray-800">{order.address}, {order.city}, {order.postalCode}, {order.country}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrders;
