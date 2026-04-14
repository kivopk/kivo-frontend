import React, { useEffect, useState } from 'react';
import { trpc } from '../../services/trpc';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
    const [metrics, setMetrics] = useState({ revenue: 0, orders: 0, users: 0 });

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const data = await trpc.admin.getMetrics.query();
                setMetrics(data);
            } catch (error) {
                console.error("Failed to fetch metrics", error);
            }
        }
        fetchMetrics();
        const interval = setInterval(fetchMetrics, 5000);
        return () => clearInterval(interval);
    }, []);

    const cards = [
        { title: "Total Revenue", value: `$${metrics.revenue.toFixed(2)}`, icon: <DollarSign className="w-8 h-8 text-green-500" /> },
        { title: "Orders Placed", value: metrics.orders, icon: <ShoppingBag className="w-8 h-8 text-blue-500" /> },
        { title: "Active Users", value: metrics.users, icon: <Users className="w-8 h-8 text-purple-500" /> },
        { title: "Growth", value: "+14.5%", icon: <TrendingUp className="w-8 h-8 text-amazon_orange" /> },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium mb-1">{card.title}</p>
                            <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Chart Placeholder */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96 flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 self-start">Sales Overview</h3>
                <div className="flex-1 flex items-center justify-center w-full bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-400">Chart implementation space (e.g. Recharts)</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
