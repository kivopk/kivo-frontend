import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { customProducts } from "../utils/dummyData";
import { ShoppingCart, Clock } from "lucide-react";

const TodaysDeals = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 59 });
    const [toast, setToast] = useState("");

    // Fancy countdown timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const addToCart = (product) => {
        const localCart = JSON.parse(localStorage.getItem('kivo_cart') || '[]');
        const existing = localCart.find(item => item.product.id === product.id);
        
        // We inject the deal price instead of original price to cart for the deal items!
        const dealProduct = { ...product, price: Math.floor(product.price * 0.75) };

        if (existing) {
            existing.quantity += 1;
        } else {
            localCart.push({ product: dealProduct, quantity: 1 });
        }
        localStorage.setItem('kivo_cart', JSON.stringify(localCart));
        window.dispatchEvent(new Event('cartUpdated'));
        
        setToast("Deal Claimed! Added to Cart!");
        setTimeout(() => setToast(""), 2500);
    };

    // Filter off only highly rated items to simulate "Top deals"
    const dealItems = customProducts.filter((_, i) => i % 2 === 0 || i === 1); 

    return (
        <div className="bg-[#f8f9fa] min-h-screen flex flex-col font-sans">
            <Header />

            {/* DEAL HERO BANNER */}
            <div className="bg-red-700 mt-[72px] text-white overflow-hidden relative isolate">
                <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-red-600 opacity-90 z-0"></div>
                <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between relative z-10">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-4">FLASH DEALS</h1>
                        <p className="text-xl md:text-2xl font-medium text-red-100">Up to 40% off premium tech & accessories.</p>
                    </div>
                    
                    <div className="mt-8 md:mt-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-3 text-red-100 font-bold uppercase tracking-wider text-sm">
                            <Clock className="w-5 h-5"/> Ends In
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <span className="text-4xl md:text-5xl font-black bg-white text-red-700 px-4 py-2 rounded-xl shadow-lg">{String(timeLeft.hours).padStart(2, '0')}</span>
                                <span className="text-xs uppercase mt-2 font-bold text-red-100">Hours</span>
                            </div>
                            <span className="text-4xl md:text-5xl font-black text-white py-2">:</span>
                            <div className="flex flex-col items-center">
                                <span className="text-4xl md:text-5xl font-black bg-white text-red-700 px-4 py-2 rounded-xl shadow-lg">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                <span className="text-xs uppercase mt-2 font-bold text-red-100">Mins</span>
                            </div>
                            <span className="text-4xl md:text-5xl font-black text-white py-2">:</span>
                            <div className="flex flex-col items-center">
                                <span className="text-4xl md:text-5xl font-black bg-white text-red-700 px-4 py-2 rounded-xl shadow-lg">{String(timeLeft.seconds).padStart(2, '0')}</span>
                                <span className="text-xs uppercase mt-2 font-bold text-red-100">Secs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DEAL GRID */}
            <div className="max-w-7xl mx-auto px-6 py-16 w-full flex-grow">
                <h2 className="text-3xl font-bold mb-8 text-gray-900 border-l-4 border-red-600 pl-4">Deals of the Day</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {dealItems.map((product) => {
                        const originalPrice = product.price;
                        const dealPrice = Math.floor(product.price * 0.75); // 25% off logic
                        const savings = originalPrice - dealPrice;

                        return (
                            <div key={product.id} className="bg-white rounded-3xl p-6 shadow-sm border-2 border-transparent hover:border-red-500 overflow-hidden relative group transition-all duration-300">
                                
                                {/* Deal Tag */}
                                <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-br-2xl z-20">
                                    Flash Deal
                                </div>
                                <div className="absolute top-4 right-4 bg-red-50 text-red-700 text-xs font-black px-3 py-1.5 rounded-full z-20 border border-red-100">
                                    Save ${savings}
                                </div>

                                <div className="relative h-56 bg-gray-50 rounded-2xl p-4 mb-5 flex items-center justify-center cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                                    <img src={product.image} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" alt={product.name}/>
                                </div>

                                <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-tight mb-2 cursor-pointer hover:underline" onClick={() => navigate(`/product/${product.id}`)}>
                                    {product.name}
                                </h3>

                                <div className="mb-4">
                                    <p className="text-sm text-gray-500 font-medium">List: <span className="line-through">${originalPrice}</span></p>
                                    <p className="text-3xl font-black text-red-600 tracking-tight">${dealPrice}</p>
                                </div>

                                <button 
                                    onClick={() => addToCart(product)}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 transition-all shadow-[0_8px_20px_rgba(220,38,38,0.2)] hover:shadow-none hover:-translate-y-0.5"
                                >
                                    <ShoppingCart className="w-5 h-5"/> Claim Deal
                                </button>

                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-8 right-8 bg-black text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-bounce font-medium text-sm">
                    {toast}
                </div>
            )}

            <Footer />
        </div>
    );
};

export default TodaysDeals;
