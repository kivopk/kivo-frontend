import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Package, Heart, Settings, User } from 'lucide-react';

const Account = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="max-w-6xl mx-auto p-6 md:p-10">
                <h1 className="text-3xl font-bold mb-8">Your Account</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Orders */}
                    <Link to="/orders" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center hover:shadow-md transition cursor-pointer">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                            <Package className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Your Orders</h2>
                            <p className="text-sm text-gray-500">Track, return, or buy things again</p>
                        </div>
                    </Link>

                    {/* Profile */}
                    <Link to="/profile" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center hover:shadow-md transition cursor-pointer">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4">
                            <User className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Profile Settings</h2>
                            <p className="text-sm text-gray-500">Edit your personal information</p>
                        </div>
                    </Link>

                    {/* Wishlist */}
                    <Link to="/lists" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center hover:shadow-md transition cursor-pointer">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-4">
                            <Heart className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Your Lists</h2>
                            <p className="text-sm text-gray-500">View your wishlists and saved items</p>
                        </div>
                    </Link>
                </div>

                <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="border-b px-8 py-4">
                        <h2 className="text-xl font-semibold">Recent Order History</h2>
                    </div>
                    <div className="p-8 text-center text-gray-500">
                        <p>No recent orders found.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Account;
