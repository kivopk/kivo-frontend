import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="max-w-3xl mx-auto p-6 md:p-10">
                <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" defaultValue="Guest User" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" defaultValue="guest@example.com" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none" />
                        </div>
                        <div className="pt-4 border-t">
                            <button type="button" className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-md font-semibold">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
