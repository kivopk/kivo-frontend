import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Settings, Users } from 'lucide-react';
import { trpc } from '../../services/trpc';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // In a real app we'd eagerly check trpc.auth.me.query() to see if user.isAdmin == true
    // If not, redirect to home. For this UI, we assume they are.

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    }

    return (
        <div className="flex h-screen bg-[#f3f4f6]">
            {/* Sidebar (Similar to Amazon Seller Central Dark theme) */}
            <aside className="w-64 bg-[#232f3e] text-white flex flex-col">
                <div className="h-16 flex items-center justify-center border-b border-[#3a4553]">
                    <h1 className="text-2xl font-bold tracking-wider">Seller Central</h1>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link to="/admin" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin' ? 'bg-[#3a4553] text-amazon_yellow' : 'hover:bg-[#3a4553]'}`}>
                        <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
                    </Link>
                    <Link to="/admin/inventory" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin/inventory' ? 'bg-[#3a4553] text-amazon_yellow' : 'hover:bg-[#3a4553]'}`}>
                        <Package className="w-5 h-5 mr-3" /> Inventory
                    </Link>
                    <Link to="/admin/orders" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin/orders' ? 'bg-[#3a4553] text-amazon_yellow' : 'hover:bg-[#3a4553]'}`}>
                        <ShoppingCart className="w-5 h-5 mr-3" /> Orders
                    </Link>
                    <Link to="/admin/users" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin/users' ? 'bg-[#3a4553] text-amazon_yellow' : 'hover:bg-[#3a4553]'}`}>
                        <Users className="w-5 h-5 mr-3" /> User Profiles
                    </Link>
                </nav>

                <div className="p-4 border-t border-[#3a4553]">
                    <button onClick={handleLogout} className="flex items-center px-4 py-2 w-full text-left hover:bg-[#3a4553] rounded-lg transition-colors">
                        <LogOut className="w-5 h-5 mr-3" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {location.pathname === '/admin' ? 'Overview' : 
                         location.pathname === '/admin/inventory' ? 'Manage Inventory' : 'Manage Orders'}
                    </h2>
                    <Link to="/admin/profile" className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition-colors cursor-pointer">
                        <span className="text-sm font-medium text-gray-600">Admin Profile</span>
                        <div className="w-8 h-8 rounded-full bg-amazon_yellow flex items-center justify-center font-bold text-gray-800 shadow-sm">A</div>
                    </Link>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
