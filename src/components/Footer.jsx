import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Twitch } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-24 pb-12 font-sans border-t border-white/5">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
                    {/* Brand & Social */}
                    <div className="flex flex-col gap-8">
                        <h2 className="text-4xl font-black uppercase tracking-tighter italic">Kivo</h2>
                        <div className="flex gap-6">
                            <a href="#" className="text-white hover:text-gray-400 transition-colors"><Twitter className="w-6 h-6" /></a>
                            <a href="#" className="text-white hover:text-gray-400 transition-colors"><Instagram className="w-6 h-6" /></a>
                            <a href="#" className="text-white hover:text-gray-400 transition-colors"><Youtube className="w-6 h-6" /></a>
                            <a href="#" className="text-white hover:text-gray-400 transition-colors"><Twitch className="w-6 h-6" /></a>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">Company</h3>
                            <a href="#" className="text-[11px] font-black uppercase tracking-widest hover:text-gray-400 transition-colors">Corporate</a>
                            <a href="#" className="text-[11px] font-black uppercase tracking-widest hover:text-gray-400 transition-colors">Newswire</a>
                            <a href="#" className="text-[11px] font-black uppercase tracking-widest hover:text-gray-400 transition-colors">Careers</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">Legal</h3>
                            <a href="#" className="text-[11px] font-black uppercase tracking-widest hover:text-gray-400 transition-colors">Privacy</a>
                            <a href="#" className="text-[11px] font-black uppercase tracking-widest hover:text-gray-400 transition-colors">Legal</a>
                            <a href="#" className="text-[11px] font-black uppercase tracking-widest hover:text-gray-400 transition-colors">Cookie Settings</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">Support</h3>
                            <a href="#" className="text-[11px] font-black uppercase tracking-widest hover:text-gray-400 transition-colors">Help Center</a>
                            <a href="#" className="text-[11px] font-black uppercase tracking-widest hover:text-gray-400 transition-colors">Contact</a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/5">
                    <div className="flex items-center gap-8">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Kivo Official</span>
                        <div className="flex gap-4">
                            <img src="/images/rating_placeholder.png" alt="" className="h-10 opacity-40 grayscale" />
                        </div>
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} Kivo Interactive. All rights reserved. All trademarks are the property of their respective owners.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
