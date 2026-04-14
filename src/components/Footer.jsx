import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#232f3e] text-white pt-16 pb-8 border-t border-gray-800 font-sans mt-auto">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-gray-700 pb-12">
                
                {/* Brand Column */}
                <div className="flex flex-col space-y-4">
                    <h2 className="text-3xl font-black tracking-tighter text-white">Kivo</h2>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                        Elevate your aesthetic with seamlessly integrated, premium technology design. Shopping redefined.
                    </p>
                    <div className="flex space-x-4 pt-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amazon_yellow hover:text-black transition-all">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amazon_yellow hover:text-black transition-all">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amazon_yellow hover:text-black transition-all">
                            <Instagram className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Quick Links Column */}
                <div className="flex flex-col space-y-4">
                    <h3 className="text-lg font-bold text-white mb-2">Shop With Us</h3>
                    <Link to="/products" className="text-gray-400 hover:text-amazon_yellow text-sm font-medium transition-colors">All Products</Link>
                    <Link to="/deals" className="text-gray-400 hover:text-amazon_yellow text-sm font-medium transition-colors">Today's Deals</Link>
                    <Link to="/cart" className="text-gray-400 hover:text-amazon_yellow text-sm font-medium transition-colors">Your Cart</Link>
                    <Link to="/account" className="text-gray-400 hover:text-amazon_yellow text-sm font-medium transition-colors">Your Account</Link>
                </div>

                {/* Customer Service Column */}
                <div className="flex flex-col space-y-4">
                    <h3 className="text-lg font-bold text-white mb-2">Customer Service</h3>
                    <Link to="/orders" className="text-gray-400 hover:text-amazon_yellow text-sm font-medium transition-colors">Returns & Orders</Link>
                    <a href="#" className="text-gray-400 hover:text-amazon_yellow text-sm font-medium transition-colors">Shipping Rates & Policies</a>
                    <a href="#" className="text-gray-400 hover:text-amazon_yellow text-sm font-medium transition-colors">Privacy Notice</a>
                    <a href="#" className="text-gray-400 hover:text-amazon_yellow text-sm font-medium transition-colors">Help Center</a>
                </div>

                {/* Contact Us Column */}
                <div className="flex flex-col space-y-5">
                    <h3 className="text-lg font-bold text-white mb-2">Contact Us</h3>
                    <div className="flex items-start gap-3 text-gray-400">
                        <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                        <span className="text-sm">123 Innovation Drive<br/>Tech District, TX 75001</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                        <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                        <span className="text-sm">+1 (800) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 cursor-pointer hover:text-white transition-colors">
                        <Mail className="w-5 h-5 text-amazon_yellow shrink-0" />
                        <span className="text-sm font-semibold tracking-wide text-white">kivo.pk.official@gmail.com</span>
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between">
                <p className="text-gray-500 text-sm font-medium">
                    &copy; {new Date().getFullYear()} Kivo Official. All rights reserved.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-500">
                    <a href="#" className="hover:text-white transition-colors">Conditions of Use</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy Notice</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
