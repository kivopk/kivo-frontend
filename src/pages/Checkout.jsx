import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handlePayment = (e) => {
        e.preventDefault();
        setPaymentSuccess(true);
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="max-w-4xl mx-auto p-6 md:p-10">
                <h1 className="text-3xl font-bold mb-8 text-center">Secure Checkout</h1>
                
                {paymentSuccess ? (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg text-center">
                        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                        <p>Thank you for your purchase. Redirecting to home...</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
                        <h2 className="text-xl font-semibold mb-6 border-b pb-4">Billing Details</h2>
                        <form onSubmit={handlePayment} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                                    <input required type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                                    <input required type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none" placeholder="john@example.com" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Address</label>
                                <input required type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none" placeholder="123 Main St" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Card Number</label>
                                    <input required type="text" pattern="\d{16}" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none" placeholder="0000 0000 0000 0000" maxLength="16" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">CVV</label>
                                    <input required type="text" pattern="\d{3,4}" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none" placeholder="123" maxLength="4" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Expiration Month</label>
                                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none">
                                        <option>01 - January</option>
                                        <option>02 - February</option>
                                        <option>03 - March</option>
                                        {/* Simplified choices for mock */}
                                        <option>12 - December</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Expiration Year</label>
                                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none">
                                        <option>2026</option>
                                        <option>2027</option>
                                        <option>2028</option>
                                        <option>2029</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-6 border-t">
                                <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg shadow-md transition duration-300">
                                    Complete Payment
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
