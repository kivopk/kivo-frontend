import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Orders = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="max-w-4xl mx-auto p-6 md:p-10">
                <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <h2 className="text-xl font-semibold mb-2">No orders found</h2>
                    <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
                    <Link to="/products" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-md font-semibold">
                        Start Shopping
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Orders;
