import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";

const Landing = () => {
    const navigate = useNavigate();

    const [currentHero, setCurrentHero] = useState(0);
    const heroImages = [
        "/images/kivo_smartphone_1776135022115.png",
        "/images/kivo_smarthome_1776135444231.png",
        "/images/kivo_action_cam_1776135431064.png"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentHero((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroImages.length]);

    // 6 images for the infinite sliding marquee. Emphasizing all kinds of products.
    const sliderImages = [
        "/images/kivo_headphones_1776135310609.png",
        "/images/kivo_banner_fashion_1776117876451.png",
        "/images/kivo_keyboard_1776135460925.png",
        "/images/kivo_banner_electronics_1776117863064.png",
        "/images/kivo_action_cam_1776135431064.png",
        "/images/kivo_banner_delivery_1776117995968.png",
    ];

    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-amazon_yellow selection:text-black scroll-smooth">
            {/* MINIMALIST HEADER */}
            <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
                <div className="text-3xl font-black tracking-widest uppercase cursor-pointer" onClick={() => navigate("/")}>
                    Kivo
                </div>
                <div className="flex items-center gap-6 text-sm font-medium uppercase tracking-wide">
                    <Link to="/login" className="hover:text-amazon_yellow transition-colors duration-300">
                        Sign In
                    </Link>
                    <Link to="/signup" className="px-5 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300">
                        Sign Up
                    </Link>
                </div>
            </header>

            {/* SCREEN 1: HERO */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentHero}
                        initial={{ scale: 1.15, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.8 }}
                        exit={{ opacity: 0, transition: { duration: 1.5 } }}
                        transition={{ 
                            opacity: { duration: 2, ease: "easeInOut" },
                            scale: { duration: 10, ease: "linear" }
                        }}
                        src={heroImages[currentHero]}
                        alt="Kivo Vibrant Aesthetics"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
                {/* Clean gradient overlay, no text to let the vibrant image attract the user completely */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 z-10"></div>
                <div className="relative z-20 flex flex-col items-center mt-32">
                     {/* Empty text block as requested to let colors attract the user */}
                </div>
                
                {/* Hero Nav Dots */}
                <div className="absolute bottom-10 z-20 flex space-x-4">
                    {heroImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentHero(idx)}
                            className={`h-1.5 rounded-full transition-all duration-500 ease-out ${idx === currentHero ? "bg-white w-12" : "bg-white/30 hover:bg-white/60 w-6"}`}
                        />
                    ))}
                </div>
            </section>

            {/* SCREEN 2: WHAT WE DO */}
            <section className="min-h-screen w-full bg-[#0a0a0a] flex flex-col justify-center py-20 px-6 md:px-24">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1 }}
                        className="flex-1 text-center md:text-left"
                    >
                        <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-amazon_yellow mb-4">What We Do</h2>
                        <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 md:mb-8">
                            Premium Goods. <br /> Unbeatable Value.
                        </h3>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light mb-8 md:mb-10 max-w-lg mx-auto md:mx-0">
                            We bring you everything you need—from cutting-edge electronics to everyday essentials and fashion—at incredibly affordable prices. KIVO is your ultimate destination for high-quality, diverse products without the premium price tag.
                        </p>
                        <button onClick={() => navigate("/login")} className="group inline-flex items-center gap-4 text-base md:text-lg uppercase tracking-widest font-bold pb-2 border-b-2 border-white/30 hover:border-white transition-all">
                            Enter the Store
                            <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </button>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                        className="flex-1 relative aspect-[4/5] w-full"
                    >
                        <img 
                            src="/images/landing_what_we_do.png" 
                            alt="Designer Workspace" 
                            className="absolute inset-0 w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 rounded-lg"
                        />
                    </motion.div>
                </div>
            </section>

            {/* SCREEN 3: ELEGANT VISUAL SECTION */}
            <section className="h-screen w-full bg-[#050505] flex items-center justify-center relative overflow-hidden">
                <motion.img 
                    initial={{ scale: 1.1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.75 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                        opacity: { duration: 1.5, ease: "easeOut" },
                        scale: { duration: 8, ease: "linear" }
                    }}
                    src="/images/kivo_laptop_1776135255362.png"
                    alt="Latest Technology at Low Cost"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-10"></div>
                
                <motion.div 
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative z-20 text-center max-w-4xl px-6 pb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white drop-shadow-xl">
                        A NEW ERA OF STYLE.
                    </h2>
                </motion.div>
            </section>

            {/* SCREEN 4: IMAGE SLIDER (MARQUEE) */}
            <section className="min-h-screen w-full bg-[#111] flex flex-col justify-center py-16 md:py-24 overflow-hidden">
                <div className="text-center mb-10 md:mb-16 px-4">
                    <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-amazon_yellow mb-3 md:mb-4">The Collection</h2>
                    <h3 className="text-3xl md:text-4xl font-bold">Uncompromising Visuality</h3>
                </div>

                <div className="relative w-full flex overflow-x-hidden border-y border-white/10 py-6 md:py-10">
                    <motion.div 
                        className="flex gap-4 md:gap-8 whitespace-nowrap"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                        style={{ width: "fit-content" }}
                    >
                        {/* Render twice for seamless loop */}
                        {[...sliderImages, ...sliderImages].map((imgSrc, idx) => (
                            <div key={idx} className="relative w-[240px] h-[320px] md:w-[400px] md:h-[500px] flex-shrink-0 group overflow-hidden rounded-md bg-black">
                                <img 
                                    src={imgSrc} 
                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                                    alt={`Gallery image ${idx}`} 
                                />
                            </div>
                        ))}
                    </motion.div>
                    
                    {/* Fade Edges */}
                    <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#111] to-transparent z-10"></div>
                    <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#111] to-transparent z-10"></div>
                </div>
            </section>

            {/* SCREEN 5: ELEGANT FOOTER */}
            <section className="bg-black pt-20">
                <div className="w-full h-[1px] bg-white/10 mb-20 max-w-7xl mx-auto"></div>
                {/* Embedded within the regular footer to maintain structure while feeling deeply integrated */}
                <div className="opacity-80 hover:opacity-100 transition-opacity">
                    <Footer />
                </div>
            </section>
        </div>
    );
};

export default Landing;
