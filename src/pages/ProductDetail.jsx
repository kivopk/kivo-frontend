import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { customProducts } from '../utils/dummyData';
import { trpc } from '../services/trpc';
import { Star } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [toast, setToast] = useState("");

    useEffect(() => {
        // Try fetching from trpc, if empty, use customProducts
        const fetchItem = async () => {
            try {
                // mock or real fetch, if we had a get endpoint:
                // const data = await trpc.product.get.query({ id: Number(id) });
                // We'll just fallback to dummyData since backend might be empty.
                const fallbackData = customProducts.find(p => p.id === Number(id));
                setProduct(fallbackData);
            } catch (error) {
                const fallbackData = customProducts.find(p => p.id === Number(id));
                setProduct(fallbackData);
            }
        };
        fetchItem();
    }, [id]);

    const addToCart = async () => {
        try {
            await trpc.cart.addToCart.mutate({ productId: product.id, quantity });
            window.dispatchEvent(new Event('cartUpdated'));
            showToast("Added to Cart seamlessly ✨");
        } catch (error) {
            const localCart = JSON.parse(localStorage.getItem('kivo_cart') || '[]');
            const existing = localCart.find(item => item.product.id === product.id);
            if(existing) {
                existing.quantity += quantity;
            } else {
                localCart.push({ product, quantity });
            }
            localStorage.setItem('kivo_cart', JSON.stringify(localCart));
            window.dispatchEvent(new Event('cartUpdated'));
            showToast("Added to local cart ✨");
        }
    };

    const buyNow = () => {
        addToCart();
        setTimeout(() => navigate('/cart'), 500);
    };

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2000);
    };

    if (!product) return <div className="text-center pt-20">Loading...</div>;

    return (
        <div className="bg-white min-h-screen">
            <Header />
            <div className="max-w-screen-xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-16">
                {/* Image Section */}
                <div className="lg:col-span-2 flex justify-center sticky top-24 h-fit bg-gray-50 rounded-2xl p-6">
                    <img src={product.image} className="max-h-[500px] object-contain mix-blend-multiply" alt={product.name} />
                </div>

                {/* Details Section */}
                <div className="lg:col-span-2 space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>
                    <div className="flex text-amazon_yellow text-sm items-center">
                         {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amazon_yellow" : "text-gray-300"}`}
                            />
                        ))}
                        <span className="text-blue-500 ml-2 hover:underline cursor-pointer font-medium">{product.reviews} ratings</span>
                    </div>
                    <hr className="border-gray-200 my-4" />
                    <div>
                        <p className="text-3xl font-black text-gray-900">${product.price}</p>
                        <p className="text-sm text-gray-500 mt-1 font-medium">Free Returns</p>
                    </div>
                    <div className="text-sm text-gray-700 leading-relaxed mt-4">
                        <p className="font-bold mb-2 text-lg">About this item</p>
                        <p className="text-md">{product.description}</p>
                    </div>
                </div>

                {/* Buy Box */}
                <div className="lg:col-span-1">
                    <div className="border border-gray-200 rounded-2xl p-6 space-y-4 sticky top-24 shadow-lg shadow-gray-100">
                        <div className="text-2xl font-black text-red-700">${product.price}</div>
                        <div className="text-sm text-gray-600">
                            FREE delivery <span className="font-bold text-gray-900">Tomorrow</span>
                        </div>
                        <div className="text-lg text-green-600 font-bold">In Stock</div>

                        <div className="flex items-center space-x-2 pt-2">
                            <label className="text-sm font-semibold">Qty:</label>
                            <select 
                                className="border border-gray-300 rounded-lg bg-white px-3 py-1.5 focus:ring-2 focus:ring-black outline-none"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            >
                                {[1, 2, 3, 4, 5].map(x => <option key={x} value={x}>{x}</option>)}
                            </select>
                        </div>

                        <button onClick={addToCart} className="w-full bg-amazon_yellow py-3 rounded-full text-sm font-bold shadow-sm hover:bg-yellow-400 transition-colors mt-4">
                            Add to Cart
                        </button>
                        <button onClick={buyNow} className="w-full bg-black text-white py-3 rounded-full text-sm font-bold shadow-sm hover:bg-gray-800 transition-colors">
                            Buy Now
                        </button>

                        <div className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100 space-y-1">
                            <p className="flex justify-between"><span>Ships from</span> <span className="font-bold text-gray-800">KIVO</span></p>
                            <p className="flex justify-between"><span>Sold by</span> <span className="font-bold text-gray-800">KIVO</span></p>
                        </div>
                    </div>
                </div>
            </div>
            
            {toast && (
                <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-bounce">
                    {toast}
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
