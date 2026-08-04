import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-950 text-gray-400 font-sans border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Column 1: Brand & Contact Info */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-red-600 text-black px-2 py-0.5 font-black italic rounded text-lg">K</div>
            <span className="text-xl font-black italic tracking-tighter text-white uppercase">KIVO</span>
          </Link>
          <p className="text-xs text-gray-400 leading-relaxed">
            Your premier destination for high-end gaming consoles, original video games, esports controllers, audio gear, and digital gift cards.
          </p>

          <div className="space-y-3 pt-2 text-xs">
            <div className="bg-zinc-900 border border-white/5 p-3 rounded-lg">
              <span className="text-[10px] font-black uppercase tracking-wider text-red-500 block mb-0.5">Lahore Helpline</span>
              <a href="tel:03224200180" className="text-white font-bold hover:text-red-400 text-sm">0322 4200180</a>
              <span className="text-[10px] text-gray-500 block">Call anytime 9 AM - 6 PM</span>
            </div>

            <div className="bg-zinc-900 border border-white/5 p-3 rounded-lg">
              <span className="text-[10px] font-black uppercase tracking-wider text-red-500 block mb-0.5">Islamabad Helpline</span>
              <a href="tel:03044036254" className="text-white font-bold hover:text-red-400 text-sm">0304 4036254</a>
              <span className="text-[10px] text-gray-500 block">Call anytime 10 AM - 11 PM</span>
            </div>
          </div>
        </div>

        {/* Column 2: HOT Items */}
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-white mb-4 border-l-2 border-red-600 pl-2">
            HOT Items
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link to="/product/ps5-slim-disc-1tb" className="hover:text-red-400 transition-colors flex items-center justify-between">
                <span>PS5 Slim Disc Edition 1TB</span>
                <span className="text-red-500 font-bold">Rs. 164,999</span>
              </Link>
            </li>
            <li>
              <Link to="/product/lenovo-legion-go-512gb" className="hover:text-red-400 transition-colors flex items-center justify-between">
                <span>Lenovo Legion Go 512GB</span>
                <span className="text-red-500 font-bold">Rs. 224,999</span>
              </Link>
            </li>
            <li>
              <Link to="/product/ps5-scuf-omega-controller" className="hover:text-red-400 transition-colors flex items-center justify-between">
                <span>PS5 SCUF Omega Controller</span>
                <span className="text-red-500 font-bold">Rs. 64,500</span>
              </Link>
            </li>
            <li>
              <Link to="/product/cyberpunk-2077-ultimate-ps5" className="hover:text-red-400 transition-colors flex items-center justify-between">
                <span>Cyberpunk 2077 Ultimate PS5</span>
                <span className="text-red-500 font-bold">Rs. 18,999</span>
              </Link>
            </li>
            <li>
              <Link to="/product/gstory-portable-monitor-ps5" className="hover:text-red-400 transition-colors flex items-center justify-between">
                <span>GStory Portable PS5 Monitor</span>
                <span className="text-red-500 font-bold">Rs. 81,999</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Browse Categories */}
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-white mb-4 border-l-2 border-red-600 pl-2">
            Categories
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/shop?category=consoles" className="hover:text-white transition-colors">Gaming Consoles</Link></li>
            <li><Link to="/shop?category=ps5-games" className="hover:text-white transition-colors">PlayStation 5 Games</Link></li>
            <li><Link to="/shop?category=switch-games" className="hover:text-white transition-colors">Nintendo Switch Games</Link></li>
            <li><Link to="/shop?category=controllers" className="hover:text-white transition-colors">Controllers & Racing Wheels</Link></li>
            <li><Link to="/shop?category=audio" className="hover:text-white transition-colors">Headsets & Speakers</Link></li>
            <li><Link to="/shop?category=accessories" className="hover:text-white transition-colors">Adapters, Docks & Cases</Link></li>
            <li><Link to="/shop?category=gift-cards" className="hover:text-white transition-colors">Digital Gift Cards</Link></li>
          </ul>
        </div>

        {/* Column 4: Quick Links & Support */}
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-white mb-4 border-l-2 border-red-600 pl-2">
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/shop" className="hover:text-white transition-colors">Shop Catalog</Link></li>
            <li><Link to="/cart" className="hover:text-white transition-colors">View Cart</Link></li>
            <li><Link to="/checkout" className="hover:text-white transition-colors">Checkout</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us & Helplines</Link></li>
            <li><Link to="/profile" className="hover:text-white transition-colors">My Account</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Same Day Delivery Terms</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
        <p>Copyright {new Date().getFullYear()} © Kivo Gaming Store. All rights reserved.</p>
        <p className="flex items-center gap-4">
          <span>Lahore • Islamabad</span>
          <span>•</span>
          <span>100% Original Products</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
