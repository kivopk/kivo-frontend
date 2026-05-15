import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const Profile = () => {
    return (
        <div className="bg-black min-h-screen text-white font-sans">
            <Header />
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-4xl mx-auto p-6 md:p-24"
            >
                <div className="mb-16">
                    <h1 className="text-6xl font-black uppercase tracking-tighter italic">Account Settings</h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mt-4">Manage your Kivo Social Club Profile</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl">
                    <form className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Display Name</label>
                                <input 
                                    type="text" 
                                    defaultValue="Guest User" 
                                    className="bg-white/5 border border-white/10 px-4 py-4 rounded-lg focus:outline-none focus:border-white transition-colors text-sm" 
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
                                <input 
                                    type="email" 
                                    defaultValue="guest@example.com" 
                                    className="bg-white/5 border border-white/10 px-4 py-4 rounded-lg focus:outline-none focus:border-white transition-colors text-sm" 
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone Number</label>
                            <input 
                                type="tel" 
                                placeholder="+1 (555) 000-0000" 
                                className="bg-white/5 border border-white/10 px-4 py-4 rounded-lg focus:outline-none focus:border-white transition-colors text-sm" 
                            />
                        </div>

                        <div className="pt-8 border-t border-white/10">
                            <button type="button" className="bg-white text-black px-10 py-4 font-black uppercase tracking-widest hover:bg-gray-200 transition-all text-sm">
                                Save Profile
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
            <Footer />
        </div>
    );
};

export default Profile;

