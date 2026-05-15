import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";

const Landing = () => {
    const navigate = useNavigate();

    const featuredGames = [
        {
            id: 1,
            title: "Kivo: Neon Nights",
            tagline: "Out Now on PC & Console",
            image: "/images/gaming/poster_1.png",
            category: "Open World Action"
        },
        {
            id: 2,
            title: "Kivo: Shadow Ops",
            tagline: "The Mission Begins June 2026",
            image: "/images/gaming/poster_2.png",
            category: "Tactical Shooter"
        },
        {
            id: 3,
            title: "Kivo: Velocity",
            tagline: "Experience True Speed",
            image: "/images/gaming/poster_3.png",
            category: "Racing"
        }
    ];

    const newsItems = [
        {
            id: 1,
            title: "Neon Nights: Massive Content Update",
            date: "May 15, 2026",
            category: "Update",
            image: "/images/gaming/hero.png"
        },
        {
            id: 2,
            title: "Shadow Ops: Developer Deep Dive",
            date: "May 12, 2026",
            category: "Newswire",
            image: "/images/gaming/ui_elements.png"
        }
    ];

    return (
        <div className="bg-[#000] text-white min-h-screen font-sans selection:bg-[#fff] selection:text-black scroll-smooth">
            {/* CINEMATIC HERO */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.7 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img 
                        src="/images/gaming/poster_1.png" 
                        alt="Hero Game" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>
                </motion.div>

                <div className="relative z-10 text-center px-4 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1.2 }}
                    >
                        <h2 className="text-white font-black tracking-[0.6em] uppercase text-xs mb-8">
                            KIVO ORIGINALS PRESENTS
                        </h2>
                        <h1 className="text-7xl md:text-9xl font-black mb-10 tracking-tighter leading-none uppercase italic">
                            NEON <br /> NIGHTS
                        </h1>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <button 
                                className="bg-white text-black px-12 py-4 font-black uppercase tracking-widest hover:bg-gray-200 transition-all text-sm"
                            >
                                Watch Trailer
                            </button>
                            <button 
                                className="border-2 border-white/40 text-white px-12 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all text-sm"
                            >
                                Official Site
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-60">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Scroll to Explore</span>
                    <div className="w-[2px] h-16 bg-gradient-to-b from-white to-transparent"></div>
                </div>
            </section>

            {/* FEATURED GAMES GRID */}
            <section className="py-24 px-4 md:px-12 bg-black">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-8">
                        <h3 className="text-4xl font-black uppercase tracking-tighter italic">Featured Games</h3>
                        <button className="text-xs font-black uppercase tracking-widest border-b-2 border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-all">View All</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredGames.map((game) => (
                            <motion.div 
                                key={game.id}
                                whileHover={{ scale: 1.02 }}
                                className="relative group cursor-pointer aspect-[3/4] overflow-hidden"
                            >
                                <img 
                                    src={game.image} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={game.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-gray-400">{game.category}</p>
                                    <h4 className="text-3xl font-black uppercase tracking-tighter mb-2 italic">{game.title}</h4>
                                    <p className="text-xs font-bold text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{game.tagline}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEWSWIRE SECTION */}
            <section className="py-24 px-4 md:px-12 bg-[#050505]">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-8">
                        <h3 className="text-4xl font-black uppercase tracking-tighter italic">Newswire</h3>
                        <button className="text-xs font-black uppercase tracking-widest border-b-2 border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-all">Visit Newswire</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {newsItems.map((news) => (
                            <div key={news.id} className="group cursor-pointer">
                                <div className="aspect-video overflow-hidden mb-6 relative">
                                    <img 
                                        src={news.image} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        alt={news.title}
                                    />
                                    <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                                        {news.category}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{news.date}</p>
                                    <h4 className="text-2xl font-black uppercase tracking-tight group-hover:text-gray-300 transition-colors">{news.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-32 bg-white text-black text-center px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 italic">Experience Kivo</h2>
                    <p className="max-w-2xl mx-auto text-lg font-bold mb-12 uppercase tracking-tight leading-tight">
                        Join the community and stay updated with the latest from the Kivo universe. New titles, exclusive content, and more.
                    </p>
                    <button className="bg-black text-white px-16 py-5 font-black uppercase tracking-widest hover:bg-gray-800 transition-all text-sm">
                        Join the Club
                    </button>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default Landing;


