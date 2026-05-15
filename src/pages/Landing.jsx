import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";

const Landing = () => {
    const navigate = useNavigate();

    // Secondary gaming images for the marquee
    const sliderImages = [
        "/images/gaming/ui_elements.png",
        "/images/kivo_keyboard_1776135460925.png",
        "/images/kivo_headphones_1776135310609.png",
        "/images/gaming/hero.png",
        "/images/kivo_action_cam_1776135431064.png",
        "/images/gaming/ui_elements.png",
    ];

    return (
        <div className="bg-deep_void text-white min-h-screen font-sans selection:bg-cyber_cyan selection:text-black scroll-smooth">
            {/* FUTURISTIC HEADER */}
            <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-deep_void/40 backdrop-blur-xl border-b border-white/5">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-black tracking-tighter uppercase cursor-pointer flex items-center gap-2 group" 
                    onClick={() => navigate("/")}
                >
                    <span className="bg-gradient-to-r from-neon_purple to-cyber_cyan bg-clip-text text-transparent group-hover:neon-glow transition-all duration-300 font-orbitron">
                        Kivo
                    </span>
                    <span className="text-[10px] bg-cyber_cyan text-black px-1.5 py-0.5 rounded font-bold tracking-widest">PRO</span>
                </motion.div>
                
                <nav className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-[0.2em] font-orbitron">
                    <Link to="/deals" className="link-hover">Store</Link>
                    <Link to="/shop" className="link-hover">Library</Link>
                    <Link to="/lists" className="link-hover">Community</Link>
                </nav>

                <div className="flex items-center gap-6">
                    <Link to="/login" className="text-sm font-bold uppercase tracking-widest hover:text-cyber_cyan transition-colors font-orbitron">
                        Login
                    </Link>
                    <Link to="/signup" className="gaming-btn text-xs">
                        Join Now
                    </Link>
                </div>
            </header>

            {/* HERO SECTION: 3D IMMERSIVE */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Background 3D Render */}
                <motion.div 
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.6 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img 
                        src="/images/gaming/hero.png" 
                        alt="Gaming World" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-deep_void via-transparent to-deep_void"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-deep_void via-transparent to-deep_void"></div>
                </motion.div>

                {/* Floating UI Elements Decor */}
                <motion.div
                    animate={{ 
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 right-1/4 w-64 h-64 opacity-20 blur-3xl bg-neon_purple rounded-full z-0"
                ></motion.div>
                <motion.div
                    animate={{ 
                        y: [0, 30, 0],
                        rotate: [0, -10, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 left-1/4 w-96 h-96 opacity-10 blur-3xl bg-cyber_cyan rounded-full z-0"
                ></motion.div>

                <div className="relative z-10 text-center px-4 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <h2 className="text-cyber_cyan font-orbitron font-black tracking-[0.5em] uppercase text-sm mb-6 animate-pulse">
                            Level Up Your Reality
                        </h2>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter leading-none font-orbitron">
                            ULTIMATE <br />
                            <span className="bg-gradient-to-r from-neon_purple via-neon_pink to-cyber_cyan bg-clip-text text-transparent italic">
                                GAMING
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                            Discover the next generation of digital adventures. From AAA blockbusters to indie gems, Kivo brings you the world's best games at unbeatable prices.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <button 
                                onClick={() => navigate("/shop")}
                                className="gaming-btn group flex items-center gap-3"
                            >
                                Browse Catalog
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                            <button 
                                onClick={() => navigate("/deals")}
                                className="px-8 py-3 border border-white/20 rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-all font-orbitron text-xs"
                            >
                                View Deals
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] font-orbitron">Explore</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-cyber_cyan to-transparent"></div>
                </motion.div>
            </section>

            {/* SECTION 2: FEATURED GAMES GRID */}
            <section className="py-32 px-6 md:px-12 bg-deep_void relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <h2 className="text-cyber_cyan font-orbitron font-bold tracking-widest uppercase text-xs mb-4">Trending Now</h2>
                            <h3 className="text-4xl md:text-5xl font-black font-orbitron">NEW RELEASES</h3>
                        </div>
                        <button className="text-sm font-bold uppercase tracking-widest border-b border-cyber_cyan pb-1 text-cyber_cyan hover:text-white transition-colors font-orbitron">
                            View All Games
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -10 }}
                                className="glass-card overflow-hidden group cursor-pointer"
                            >
                                <div className="aspect-[16/9] relative overflow-hidden">
                                    <img 
                                        src={i === 1 ? "/images/gaming/ui_elements.png" : i === 2 ? "/images/kivo_keyboard_1776135460925.png" : "/images/kivo_headphones_1776135310609.png"}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                        alt="Game"
                                    />
                                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-cyber_cyan border border-cyber_cyan/30 font-orbitron">
                                        -20%
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-xl font-bold font-orbitron">CYBERPUNK 2077</h4>
                                        <span className="text-cyber_cyan font-bold">$49.99</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-6">Action RPG, Open World, Sci-fi</p>
                                    <button className="w-full py-3 bg-white/5 hover:bg-cyber_cyan hover:text-black transition-colors font-bold uppercase tracking-widest text-xs rounded-lg font-orbitron border border-white/10 group-hover:border-cyber_cyan">
                                        Add to Cart
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: INFINITE SCROLL MARQUEE */}
            <section className="py-20 border-y border-white/5 overflow-hidden bg-black/50">
                <motion.div 
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex gap-8 whitespace-nowrap"
                >
                    {[...sliderImages, ...sliderImages].map((img, idx) => (
                        <div key={idx} className="w-80 h-48 rounded-xl overflow-hidden grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-crosshair">
                            <img src={img} className="w-full h-full object-cover" alt="Gaming Brand" />
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* FOOTER */}
            <Footer />
        </div>
    );
};

export default Landing;

