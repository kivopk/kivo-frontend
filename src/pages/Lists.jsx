import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Lists = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="max-w-5xl mx-auto p-6 md:p-10">
                <h1 className="text-3xl font-bold mb-6">Your Lists</h1>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center min-h-[40vh] flex flex-col justify-center items-center">
                    <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-500 mb-6">Save items you want to buy later by clicking the heart icon on products.</p>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-md font-semibold">
                        Explore Products
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Lists;
