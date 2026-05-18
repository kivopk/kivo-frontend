import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { trpc } from "../services/trpc";
import kivoLogo from "../assets/kivo-logo.jpeg";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        const fetchUser = async () => {
            const token = localStorage.getItem("access_token");
            if (token) {
                try {
                    const { user } = await trpc.auth.me.query();
                    setUser(user);
                } catch (error) {
                    console.error("Error fetching user profile", error);
                }
            }
        };
        fetchUser();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
        navigate("/login");
    };

    const navLinks = [
        { name: "Games", path: "/" },
        { name: "Newswire", path: "/" },
        { name: "Videos", path: "/" },
        { name: "Downloads", path: "/" },
        { name: "Store", path: "/" },
        { name: "Support", path: "/" },
    ];

    return (
        <header 
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 py-4 ${
                isScrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-6"
            }`}
        >
            <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img src={kivoLogo} alt="Kivo" className="h-10 w-auto object-contain transition-transform group-hover:scale-110" />
                    <span className="text-2xl font-black uppercase tracking-tighter italic">Kivo</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            to={link.path} 
                            className="text-[11px] font-black uppercase tracking-[0.2em] hover:text-gray-400 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    {user ? (
                        <div className="hidden md:flex items-center gap-4 group cursor-pointer relative">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{user.username || user.email}</span>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                <User className="w-4 h-4" />
                            </div>
                            <div className="absolute top-full right-0 mt-2 w-48 bg-black border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity p-2">
                                <button onClick={handleLogout} className="w-full text-left p-2 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors">Sign Out</button>
                            </div>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-3">
                            <Link to="/login" className="text-[10px] font-black uppercase tracking-widest border border-white/20 px-5 py-2 hover:bg-white hover:text-black transition-all">
                                Sign In
                            </Link>
                            <Link to="/signup" className="text-[10px] font-black uppercase tracking-widest bg-white text-black border border-white px-5 py-2 hover:bg-transparent hover:text-white transition-all">
                                Sign Up
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 top-[70px] bg-black z-[90] p-6 lg:hidden flex flex-col gap-6"
                    >
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-3xl font-black uppercase tracking-tighter italic border-b border-white/10 pb-4"
                            >
                                {link.name}
                            </Link>
                        ))}
                        {!user && (
                            <div className="mt-4 flex flex-col gap-3">
                                <Link 
                                    to="/login" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="bg-transparent border border-white/20 text-white text-center py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                                >
                                    Sign In
                                </Link>
                                <Link 
                                    to="/signup" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="bg-white text-black text-center py-4 font-black uppercase tracking-widest hover:bg-transparent hover:text-white border border-white transition-all"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
