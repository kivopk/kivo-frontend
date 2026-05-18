import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { trpc } from "../services/trpc";
import { customProducts } from "../utils/dummyData";
import { ShoppingCart, Star, Trash2, Plus, Minus, Check, X, ShieldCheck } from "lucide-react";

const Landing = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Featured");
    const [toast, setToast] = useState("");
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    // Fetch products from tRPC database with dummy fallback
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await trpc.product.list.query({ take: 50 });
                if (data && data.length > 3) {
                    setProducts(data);
                } else {
                    setProducts(customProducts);
                }
            } catch (error) {
                console.log("Using custom games fallback...");
                setProducts(customProducts);
            }
        };
        fetchProducts();

        // Load cart from localStorage
        const localCart = JSON.parse(localStorage.getItem("kivo_cart") || "[]");
        setCart(localCart);

        // Sync with global header updates
        const handleCartSync = () => {
            const updatedCart = JSON.parse(localStorage.getItem("kivo_cart") || "[]");
            setCart(updatedCart);
        };
        window.addEventListener("cartUpdated", handleCartSync);
        return () => window.removeEventListener("cartUpdated", handleCartSync);
    }, []);

    // Save cart helper
    const saveCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("kivo_cart", JSON.stringify(newCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    // Add to Cart
    const addToCart = (product) => {
        const existing = cart.find((item) => item.product.id === product.id);
        let newCart = [];
        if (existing) {
            newCart = cart.map((item) =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            newCart = [...cart, { product, quantity: 1 }];
        }
        saveCart(newCart);
        showToast(`"${product.name}" added to cart! 🎮`);
    };

    // Quick Buy Now
    const buyNow = (product) => {
        const existing = cart.find((item) => item.product.id === product.id);
        if (!existing) {
            saveCart([...cart, { product, quantity: 1 }]);
        }
        setCartOpen(true);
    };

    // Update quantity
    const updateQuantity = (productId, amount) => {
        const item = cart.find((i) => i.product.id === productId);
        if (!item) return;

        const newQty = item.quantity + amount;
        if (newQty <= 0) {
            saveCart(cart.filter((i) => i.product.id !== productId));
        } else {
            saveCart(
                cart.map((i) =>
                    i.product.id === productId ? { ...i, quantity: newQty } : i
                )
            );
        }
    };

    // Remove from cart
    const removeFromCart = (productId) => {
        saveCart(cart.filter((i) => i.product.id !== productId));
    };

    // Show Toast
    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    };

    // Trigger purchase success
    const handleCheckout = () => {
        setCheckoutSuccess(true);
        saveCart([]);
        setCartOpen(false);
    };

    // Derived filtering & sorting
    let filteredProducts = products.filter((p) => {
        if (selectedCategory === "All") return true;
        return p.category.toLowerCase() === selectedCategory.toLowerCase();
    });

    if (sortBy === "Price: Low to High") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    // Totals
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div className="bg-[#000] text-white min-h-screen font-sans selection:bg-[#fff] selection:text-black scroll-smooth relative">
            <Header />

            {/* CINEMATIC HERO */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.75 }}
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

                <div className="relative z-10 text-center px-4 w-full mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1.2 }}
                    >
                        <h2 className="text-white font-black tracking-[0.6em] uppercase text-xs mb-8">
                            KIVO ORIGINALS PRESENTS
                        </h2>
                        <h1 className="text-7xl md:text-9xl font-black mb-10 tracking-tighter leading-none uppercase italic">
                            NEON <br /> NIGHTS
                        </h1>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <button 
                                onClick={() => buyNow({ id: 1, name: "Kivo: Neon Nights", price: 59.99 })}
                                className="bg-white text-black px-12 py-4 font-black uppercase tracking-widest hover:bg-gray-200 transition-all text-sm"
                            >
                                Pre-Order Now
                            </button>
                            <button 
                                className="border-2 border-white/40 text-white px-12 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all text-sm"
                            >
                                Watch Trailer
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-60">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Scroll to Explore Store</span>
                    <div className="w-[2px] h-16 bg-gradient-to-b from-white to-transparent"></div>
                </div>
            </section>

            {/* PREMIUM GAMES STOREFRONT */}
            <section className="py-24 px-4 md:px-12 bg-black border-t border-white/5" id="store">
                <div className="max-w-[1600px] mx-auto">
                    {/* Filter bar & title */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 border-b border-white/10 pb-8">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">Kivo Storefront</p>
                            <h3 className="text-5xl font-black uppercase tracking-tighter italic">Explore Games</h3>
                        </div>

                        {/* Filters list */}
                        <div className="flex flex-wrap items-center gap-4">
                            {["All", "Action", "Shooter", "Racing"].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`text-[10px] font-black uppercase tracking-widest px-6 py-3 border transition-all ${
                                        selectedCategory === cat
                                            ? "bg-white text-black border-white"
                                            : "border-white/10 hover:border-white text-gray-400 hover:text-white"
                                    }`}
                                >
                                    {cat === "All" ? "All Games" : cat}
                                </button>
                            ))}

                            {/* Sort selection */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-black text-white border border-white/10 px-6 py-3 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-white transition-all cursor-pointer"
                            >
                                <option>Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Games Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <motion.div 
                                key={product.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white/5 border border-white/5 p-6 rounded-2xl flex flex-col hover:border-white/20 transition-all duration-500 group relative"
                            >
                                {/* Game Poster */}
                                <div className="aspect-[3/4] overflow-hidden rounded-lg mb-6 relative bg-black/40">
                                    <img 
                                        src={product.image} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        alt={product.name}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                    
                                    {/* Category tag */}
                                    <div className="absolute top-4 left-4 bg-white/15 backdrop-blur-md border border-white/10 text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded">
                                        {product.category}
                                    </div>
                                </div>

                                <h4 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-gray-300 transition-colors line-clamp-1 italic">{product.name}</h4>
                                <p className="text-[11px] font-bold text-gray-500 mb-4 line-clamp-2 leading-relaxed h-8">{product.description}</p>
                                
                                {/* Star Rating */}
                                <div className="flex items-center gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3 h-3 ${i < Math.floor(product.rating || 4.7) ? "text-white fill-white" : "text-white/20"}`}
                                        />
                                    ))}
                                    <span className="text-[9px] font-black text-gray-500 tracking-wider ml-1">({product.reviews || 100})</span>
                                </div>

                                {/* Price & Buy actions */}
                                <div className="mt-auto">
                                    <div className="flex items-baseline justify-between mb-6">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Instant Download</span>
                                        <span className="text-3xl font-black tracking-tighter">${product.price.toFixed(2)}</span>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <button 
                                            onClick={() => buyNow(product)}
                                            className="w-full bg-white text-black py-3 font-black uppercase tracking-widest hover:bg-gray-200 transition-all text-xs"
                                        >
                                            Buy Now
                                        </button>
                                        <button 
                                            onClick={() => addToCart(product)}
                                            className="w-full border border-white/10 hover:border-white text-white py-3 font-black uppercase tracking-widest transition-all text-xs"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FLOATING CART TRIGGER BADGE */}
            {totalItems > 0 && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setCartOpen(true)}
                    className="fixed bottom-8 right-8 bg-white text-black p-5 rounded-full shadow-2xl z-[90] flex items-center justify-center gap-3 border border-white"
                >
                    <ShoppingCart className="w-5 h-5 fill-black" />
                    <span className="bg-black text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center">
                        {totalItems}
                    </span>
                </motion.button>
            )}

            {/* SHOPPING CART SLIDING DRAWER */}
            <AnimatePresence>
                {cartOpen && (
                    <>
                        {/* Overlay backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setCartOpen(false)}
                            className="fixed inset-0 bg-black z-[110]"
                        />

                        {/* Drawer body */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.4 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#080808] border-l border-white/10 z-[120] p-8 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                                    <div className="flex items-center gap-3">
                                        <ShoppingCart className="w-5 h-5" />
                                        <h3 className="text-xl font-black uppercase tracking-wider italic">Your Cart</h3>
                                    </div>
                                    <button onClick={() => setCartOpen(false)} className="hover:text-gray-400 transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {cart.length === 0 ? (
                                    <div className="text-center py-20 flex flex-col items-center gap-4">
                                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Your cart is empty</p>
                                        <button 
                                            onClick={() => setCartOpen(false)}
                                            className="border border-white/10 text-white px-8 py-3 text-xs font-black uppercase tracking-widest hover:border-white transition-colors"
                                        >
                                            Continue Browsing
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-6 max-h-[60vh] overflow-y-auto pr-2">
                                        {cart.map((item) => (
                                            <div key={item.product.id} className="flex gap-4 border-b border-white/5 pb-6">
                                                <div className="w-20 h-24 rounded overflow-hidden bg-black/40 border border-white/10">
                                                    <img src={item.product.image} className="w-full h-full object-cover" alt={item.product.name} />
                                                </div>
                                                <div className="flex-grow flex flex-col justify-between">
                                                    <div>
                                                        <h4 className="text-sm font-black uppercase tracking-wide line-clamp-1 italic">{item.product.name}</h4>
                                                        <p className="text-xs font-bold text-gray-500 mt-1">${item.product.price.toFixed(2)}</p>
                                                    </div>
                                                    
                                                    {/* Qty incrementors & Delete */}
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center border border-white/10 rounded overflow-hidden">
                                                            <button onClick={() => updateQuantity(item.product.id, -1)} className="p-2 hover:bg-white/5 transition-colors">
                                                                <Minus className="w-3 h-3" />
                                                            </button>
                                                            <span className="px-4 text-xs font-black">{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item.product.id, 1)} className="p-2 hover:bg-white/5 transition-colors">
                                                                <Plus className="w-3 h-3" />
                                                            </button>
                                                        </div>

                                                        <button onClick={() => removeFromCart(item.product.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Cart footer & checkouts */}
                            {cart.length > 0 && (
                                <div className="border-t border-white/10 pt-6 mt-6">
                                    <div className="flex items-baseline justify-between mb-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Security checkout guaranteed</span>
                                        <span className="text-xs text-gray-400 font-bold">{totalItems} games</span>
                                    </div>
                                    <div className="flex items-baseline justify-between mb-6">
                                        <span className="text-sm font-black uppercase tracking-widest italic">Total Subtotal</span>
                                        <span className="text-4xl font-black tracking-tighter">${subtotal.toFixed(2)}</span>
                                    </div>

                                    <button 
                                        onClick={handleCheckout}
                                        className="w-full bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-gray-200 transition-all text-sm flex items-center justify-center gap-2"
                                    >
                                        <ShieldCheck className="w-4 h-4" /> Place Order
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* CHECKOUT SUCCESS MODAL CELEBRATION */}
            <AnimatePresence>
                {checkoutSuccess && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setCheckoutSuccess(false)}
                            className="fixed inset-0 bg-black z-[200]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="fixed inset-0 m-auto w-full max-w-md h-fit bg-[#080808] border border-white/10 rounded-3xl p-10 z-[210] text-center flex flex-col items-center shadow-2xl"
                        >
                            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6">
                                <Check className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Purchase Successful!</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide leading-relaxed mb-8">
                                Thank you for your order! Your digital game keys have been generated. Instant download files have been added to your profile dashboard.
                            </p>
                            <button
                                onClick={() => setCheckoutSuccess(false)}
                                className="w-full bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-gray-200 transition-all text-sm"
                            >
                                Return to Store
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* TOAST NOTIFICATION */}
            {toast && (
                <div className="fixed bottom-8 left-8 bg-white text-black px-6 py-4 rounded-xl shadow-2xl z-[100] font-black text-xs uppercase tracking-widest border border-black flex items-center gap-2 animate-bounce">
                    <Check className="w-4 h-4 text-green-600" /> {toast}
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Landing;
