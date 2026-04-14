import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { trpc } from "../services/trpc";
import { Star, ShoppingCart, Eye, Heart, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { customProducts } from "../utils/dummyData";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [search, setSearch] = useState("");
    const [toast, setToast] = useState("");
    const navigate = useNavigate();

    // Carousel Logic
    const [currentBanner, setCurrentBanner] = useState(0);
    const banners = [
        "/images/kivo_banner_electronics_1776117863064.png",
        "/images/kivo_banner_fashion_1776117876451.png",
        "/images/kivo_banner_delivery_1776117995968.png",
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // If backend isn't populated with our custom 10 items, we fall back to them.
                const data = await trpc.product.list.query({ take: 10 });
                if(data && data.length > 5) {
                    setProducts(data);
                } else {
                    setProducts(customProducts);
                }
            } catch (error) {
                console.error(error);
                setProducts(customProducts);
            }
        };
        fetchProducts();
    }, []);

    const toggleWishlist = (id) => {
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
        showToast("Wishlist updated!");
    };

    const addToCart = async (product) => {
        try {
            await trpc.cart.addToCart.mutate({ productId: product.id, quantity: 1 });
            window.dispatchEvent(new Event('cartUpdated'));
            showToast("Added to Cart seamlessly ✨");
        } catch (error) {
            const localCart = JSON.parse(localStorage.getItem('kivo_cart') || '[]');
            const existing = localCart.find(item => item.product.id === product.id);
            if(existing) {
                existing.quantity += 1;
            } else {
                localCart.push({ product, quantity: 1 });
            }
            localStorage.setItem('kivo_cart', JSON.stringify(localCart));
            window.dispatchEvent(new Event('cartUpdated'));
            showToast("Added to local cart ✨");
        }
    };

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2500);
    };

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    // Staggered Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };
    
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="bg-[#f8f9fa] text-gray-900 min-h-screen flex flex-col font-sans">
            <Header />

            {/* HERO CAROUSEL */}
            <section className="relative h-[85vh] w-full mt-[72px] overflow-hidden bg-black flex items-center justify-center isolate">
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentBanner}
                        src={banners[currentBanner]}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 0.7, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="Promo Banner"
                    />
                </AnimatePresence>

                {/* Refined gradient map */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="relative z-20 text-center max-w-4xl px-6"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-wide mb-6">
                        <Zap className="w-4 h-4 text-amazon_yellow" /> New Drops Unlocked
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-tight">
                        Define Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amazon_yellow to-yellow-300">Aesthetic</span>
                    </h1>
                    <p className="mt-4 text-lg md:text-2xl text-gray-300 font-light tracking-wide max-w-2xl mx-auto">
                        Elevate your everyday with premium, meticulously crafted technology. Minimalist design meets sheer performance.
                    </p>
                    <button
                        onClick={() => navigate("/products")}
                        className="mt-10 px-10 py-4 bg-white hover:bg-gray-100 text-black font-semibold rounded-full transition-all duration-300 transform hover:scale-[1.03] shadow-[0_0_40px_rgba(255,255,255,0.3)] text-lg"
                    >
                        Explore the Collection
                    </button>
                </motion.div>

                {/* Minimalist Carousel Nav Dots */}
                <div className="absolute bottom-10 z-20 flex space-x-4">
                    {banners.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentBanner(idx)}
                            className={`h-1.5 rounded-full transition-all duration-500 ease-out ${idx === currentBanner ? "bg-white w-12" : "bg-white/30 hover:bg-white/60 w-6"}`}
                        />
                    ))}
                </div>
            </section>

            {/* CURATED COLLECTION HEADER & SEARCH */}
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 w-full flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200">
                <div className="max-w-xl">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">Curated Collection</h2>
                    <p className="mt-4 text-gray-500 text-lg font-light">
                        Our latest arrivals designed to integrate seamlessly into your lifestyle. Uncompromised quality.
                    </p>
                </div>
                <div className="mt-8 md:mt-0 relative w-full md:w-96 group">
                    <input
                        type="text"
                        placeholder="Search our catalog..."
                        className="w-full pl-5 pr-12 py-4 bg-white border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-black rounded-2xl shadow-sm outline-none transition-all duration-300 font-medium text-gray-800"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center p-2 text-gray-400 group-focus-within:text-black transition-colors">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>
            </div>

            {/* PREMIUM PRODUCT GRID */}
            <section className="max-w-7xl mx-auto px-6 py-16 w-full">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    {!products.length
                        ? Array(8).fill(0).map((_, i) => (
                                <div key={i} className="h-[420px] bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                                    <div className="h-64 bg-gray-100 animate-pulse w-full"></div>
                                    <div className="p-6 flex-1 flex flex-col gap-3">
                                        <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4"></div>
                                        <div className="h-3 bg-gray-100 animate-pulse rounded w-1/2"></div>
                                        <div className="mt-auto h-10 bg-gray-100 animate-pulse rounded-xl w-full"></div>
                                    </div>
                                </div>
                            ))
                        : filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={cardVariants}
                                whileHover={{ y: -8 }}
                                className="group relative bg-white rounded-3xl overflow-hidden flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 border border-gray-100"
                            >
                                {/* Image Container */}
                                <div className="relative h-72 w-full overflow-hidden bg-gray-50 flex items-center justify-center p-6 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                                    <motion.img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="h-full w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                                    />

                                    {/* Top Overlay Actions */}
                                    <div className="absolute top-4 w-full px-4 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="bg-white/80 backdrop-blur-md text-xs font-bold px-3 py-1.5 rounded-full text-black shadow-sm tracking-wide uppercase">New</span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                                            className="bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow-sm hover:scale-110 hover:bg-white transition-all"
                                        >
                                            <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
                                        </button>
                                    </div>

                                    {/* Quick View Button Hover */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                                        className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 bg-black/80 backdrop-blur-md text-white px-6 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:bg-black shadow-lg"
                                    >
                                        <Eye className="w-4 h-4" /> Quick View
                                    </button>
                                </div>

                                {/* Content Details */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-amazon_yellow fill-amazon_yellow" : "text-gray-200"}`}
                                            />
                                        ))}
                                        <span className="text-xs text-gray-400 font-medium ml-1">({product.reviews})</span>
                                    </div>
                                    
                                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 cursor-pointer hover:underline decoration-2 underline-offset-4" onClick={() => navigate(`/product/${product.id}`)}>
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm font-light mt-1 flex-1 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Price</span>
                                            <span className="text-2xl font-black text-gray-900 tracking-tight">${product.price}</span>
                                        </div>

                                        <button
                                            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                            className="w-12 h-12 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
                                        >
                                            <ShoppingCart className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </motion.div>
            </section>

            {/* Newsletter CTA Section */}
            <section className="bg-gray-900 py-20 mt-auto">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Become an Insider</h2>
                    <p className="text-gray-400 mb-10 text-lg font-light w-3/4 mx-auto">Subscribe to our newsletter and get early access to new drops, exclusive discounts, and uncompromised style.</p>
                    <div className="flex max-w-md mx-auto relative">
                        <input type="email" placeholder="Email Address" className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-amazon_yellow focus:border-transparent transition-all backdrop-blur-sm pr-36" />
                        <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-amazon_yellow text-black font-bold px-6 rounded-full hover:scale-105 transition-transform duration-300 hover:bg-yellow-400">Join</button>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Elegant Toast Portal */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-gray-900/95 backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-white/10"
                    >
                        <div className="bg-green-500/20 text-green-400 p-2 rounded-full">
                            <Zap className="w-4 h-4" />
                        </div>
                        <span className="font-medium tracking-wide text-sm">{toast}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;
