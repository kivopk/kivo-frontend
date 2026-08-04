import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getStoredCart } from '../utils/gamingProducts';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const updateCartBadge = () => {
    const cart = getStoredCart();
    const totalQty = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    setCartCount(totalQty);
  };

  useEffect(() => {
    updateCartBadge();
    window.addEventListener('kivo_cart_updated', updateCartBadge);
    return () => window.removeEventListener('kivo_cart_updated', updateCartBadge);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/shop');
    }
  };

  return (
    <header className="w-full font-sans sticky top-0 z-50 bg-black text-white border-b border-white/10 shadow-2xl">
      {/* Top Banner - Sky Games Style Notification Bar */}
      <div className="bg-gradient-to-r from-red-950 via-zinc-900 to-black text-gray-300 text-[11px] font-medium py-1.5 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest animate-pulse">
              Express Delivery
            </span>
            <span className="truncate">Same day delivery in Lahore and Islamabad</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-gray-400">
            <a href="tel:03224200180" className="hover:text-white transition-colors flex items-center gap-1">
              <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>Lahore: 0322 4200180</span>
            </a>
            <a href="tel:03044036254" className="hover:text-white transition-colors hidden md:flex items-center gap-1">
              <span>Islamabad: 0304 4036254</span>
            </a>
            <Link to="/contact" className="hover:text-white transition-colors">Help & Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Bar: Logo, Search, Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-red-600 text-black px-2.5 py-1 font-black italic rounded text-xl transform group-hover:scale-105 transition-transform shadow-lg shadow-red-600/30">
            K
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black italic tracking-tighter uppercase text-white group-hover:text-red-500 transition-colors leading-none">
              KIVO
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-red-500">
              Gaming Store
            </span>
          </div>
        </Link>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl hidden md:flex items-center relative">
          <input
            type="text"
            placeholder="Search PS5, Xbox Series X, Controllers, Gift Cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/90 border border-white/15 focus:border-red-500 rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none transition-all"
          />
          <button
            type="submit"
            className="absolute right-1.5 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors flex items-center justify-center shadow-md"
            aria-label="Search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        {/* Quick Actions (Account, Cart, Mobile Toggle) */}
        <div className="flex items-center gap-4">
          <Link
            to="/profile"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="hidden lg:inline">Account</span>
          </Link>

          {/* Cart Drawer Trigger */}
          <Link
            to="/cart"
            className="relative bg-red-600/10 hover:bg-red-600 border border-red-600/30 text-white py-2 px-3.5 rounded-full flex items-center gap-2 transition-all group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-xs font-black uppercase tracking-wider hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-black group-hover:bg-white group-hover:text-black transition-colors">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Category Bar */}
      <nav className="bg-zinc-950 border-t border-white/5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-1 py-1">
            <Link
              to="/"
              className={`py-2.5 px-3 hover:text-red-500 transition-colors ${location.pathname === '/' ? 'text-red-500 font-black' : 'text-gray-300'}`}
            >
              Home
            </Link>

            <Link
              to="/shop"
              className={`py-2.5 px-3 hover:text-red-500 transition-colors ${location.pathname === '/shop' ? 'text-red-500 font-black' : 'text-gray-300'}`}
            >
              Shop All
            </Link>

            <Link
              to="/shop?category=consoles"
              className="py-2.5 px-3 text-gray-300 hover:text-red-500 transition-colors"
            >
              Consoles
            </Link>

            {/* Dropdown for Games */}
            <div
              className="relative group py-2.5 px-3 cursor-pointer text-gray-300 hover:text-red-500"
              onMouseEnter={() => setActiveDropdown('games')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="flex items-center gap-1">
                <span>Games</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {activeDropdown === 'games' && (
                <div className="absolute top-full left-0 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl py-3 w-56 text-xs normal-case z-50 animate-fadeIn">
                  <Link to="/shop?category=ps5-games" className="block px-4 py-2 hover:bg-red-600 hover:text-white transition-colors">PlayStation 5 Games</Link>
                  <Link to="/shop?category=ps4-games" className="block px-4 py-2 hover:bg-red-600 hover:text-white transition-colors">PlayStation 4 Games</Link>
                  <Link to="/shop?category=switch-games" className="block px-4 py-2 hover:bg-red-600 hover:text-white transition-colors">Nintendo Switch Games</Link>
                  <Link to="/shop?category=xbox-games" className="block px-4 py-2 hover:bg-red-600 hover:text-white transition-colors">Xbox Series X/S Games</Link>
                </div>
              )}
            </div>

            <Link to="/shop?category=controllers" className="py-2.5 px-3 text-gray-300 hover:text-red-500 transition-colors">
              Controllers
            </Link>
            <Link to="/shop?category=audio" className="py-2.5 px-3 text-gray-300 hover:text-red-500 transition-colors">
              Audio
            </Link>
            <Link to="/shop?category=accessories" className="py-2.5 px-3 text-gray-300 hover:text-red-500 transition-colors">
              Accessories
            </Link>
            <Link to="/shop?category=gift-cards" className="py-2.5 px-3 text-gray-300 hover:text-red-500 transition-colors">
              Gift Cards
            </Link>
          </div>

          <div className="py-2.5">
            <Link to="/contact" className="text-red-500 hover:text-red-400 transition-colors font-extrabold flex items-center gap-1.5">
              <span>Support & City Helplines</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-white/10 p-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex items-center relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-white/20 rounded-full py-2 px-4 text-xs text-white placeholder-gray-400 focus:outline-none"
            />
            <button type="submit" className="absolute right-2 text-red-500 p-1">Search</button>
          </form>

          <div className="flex flex-col space-y-2 text-xs font-bold uppercase tracking-wider text-gray-300">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5">Home</Link>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5">Shop All</Link>
            <Link to="/shop?category=consoles" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5">Consoles</Link>
            <Link to="/shop?category=ps5-games" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5">PS5 Games</Link>
            <Link to="/shop?category=controllers" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5">Controllers</Link>
            <Link to="/shop?category=audio" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5">Audio</Link>
            <Link to="/shop?category=gift-cards" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5">Gift Cards</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 text-red-500">Help & Helplines</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
