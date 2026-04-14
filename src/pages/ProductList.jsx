import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { trpc } from '../services/trpc';
import { customProducts } from '../utils/dummyData';
import { Star, ShoppingCart } from 'lucide-react';

const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [toast, setToast] = useState("");
    
    // Filters logic
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState(null);
    const [sortOption, setSortOption] = useState("Featured");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await trpc.product.list.query({ take: 50 });
                if (data && data.length > 5) setProducts(data);
                else setProducts(customProducts);
            } catch (error) {
                setProducts(customProducts);
            }
        };
        fetchProducts();
    }, []);

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
        setTimeout(() => setToast(""), 2000);
    };

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    // Derived State for Rendering
    let displayedProducts = [...products];

    // 1. Filter Category
    if (selectedCategories.length > 0) {
        displayedProducts = displayedProducts.filter(p => selectedCategories.includes(p.category));
    }

    // 2. Filter Price
    if (priceRange === 'under25') displayedProducts = displayedProducts.filter(p => p.price < 25);
    else if (priceRange === '25to50') displayedProducts = displayedProducts.filter(p => p.price >= 25 && p.price <= 50);
    else if (priceRange === '50to100') displayedProducts = displayedProducts.filter(p => p.price > 50 && p.price <= 100);
    else if (priceRange === 'over100') displayedProducts = displayedProducts.filter(p => p.price > 100);

    // 3. Sort
    if (sortOption === "Price: Low to High") displayedProducts.sort((a,b) => a.price - b.price);
    else if (sortOption === "Price: High to Low") displayedProducts.sort((a,b) => b.price - a.price);

    return (
        <div className="bg-[#f8f9fa] min-h-screen">
            <Header />
            <div className="max-w-screen-2xl mx-auto flex p-4 mt-[72px]">
                {/* Sidebar Filters */}
                <div className="w-[250px] hidden md:block bg-white p-6 mr-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
                    <h2 className="font-black text-xl mb-6">Filters</h2>
                    <div className="mb-8">
                        <h3 className="font-bold text-gray-800 mb-3">Category</h3>
                        <div className="flex flex-col space-y-3 text-sm text-gray-600">
                            {["Electronics", "Clothing", "Home & Kitchen"].map(cat => (
                                <label key={cat} className="flex items-center cursor-pointer group">
                                    <input 
                                        type="checkbox" 
                                        className="mr-3 w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                                        checked={selectedCategories.includes(cat)}
                                        onChange={() => handleCategoryChange(cat)}
                                    /> 
                                    <span className="group-hover:text-black transition-colors">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 mb-3">Price</h3>
                        <div className="flex flex-col space-y-3 text-sm text-gray-600">
                            <label className="flex items-center cursor-pointer group"><input type="radio" name="price" onChange={() => setPriceRange(null)} className="mr-3 w-4 h-4 text-black focus:ring-black cursor-pointer" defaultChecked /> <span className="group-hover:text-black">Any Price</span></label>
                            <label className="flex items-center cursor-pointer group"><input type="radio" name="price" onChange={() => setPriceRange('under25')} className="mr-3 w-4 h-4 text-black focus:ring-black cursor-pointer" /> <span className="group-hover:text-black">Under $25</span></label>
                            <label className="flex items-center cursor-pointer group"><input type="radio" name="price" onChange={() => setPriceRange('25to50')} className="mr-3 w-4 h-4 text-black focus:ring-black cursor-pointer" /> <span className="group-hover:text-black">$25 - $50</span></label>
                            <label className="flex items-center cursor-pointer group"><input type="radio" name="price" onChange={() => setPriceRange('50to100')} className="mr-3 w-4 h-4 text-black focus:ring-black cursor-pointer" /> <span className="group-hover:text-black">$50 - $100</span></label>
                            <label className="flex items-center cursor-pointer group"><input type="radio" name="price" onChange={() => setPriceRange('over100')} className="mr-3 w-4 h-4 text-black focus:ring-black cursor-pointer" /> <span className="group-hover:text-black">Over $100</span></label>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-grow">
                    <div className="flex justify-between items-center bg-white px-6 py-4 mb-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-sm font-medium text-gray-600">Showing {displayedProducts.length} results</p>
                        <select 
                            className="border border-gray-200 rounded-lg py-2 px-4 shadow-sm text-sm bg-white font-medium focus:ring-2 focus:ring-black outline-none"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option>Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedProducts.map((product) => (
                            <div key={product.id} className="bg-white p-6 z-30 flex flex-col rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 group">
                                <div className="bg-gray-50 rounded-2xl p-4 mb-4 cursor-pointer overflow-hidden relative" onClick={() => navigate(`/product/${product.id}`)}>
                                    <img src={product.image} alt={product.name} className="h-48 w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <h3 className="text-lg font-bold line-clamp-2 hover:underline cursor-pointer decoration-2 underline-offset-4 text-gray-900 leading-tight mb-1" onClick={() => navigate(`/product/${product.id}`)}>{product.name}</h3>
                                <div className="flex items-center text-amazon_yellow my-2 gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-amazon_yellow" : "text-gray-200"}`}
                                        />
                                    ))}
                                    <span className="text-xs font-semibold text-gray-400 ml-1">({product.reviews})</span>
                                </div>
                                <div className="text-2xl font-black mb-4 tracking-tight mt-auto text-gray-900">${product.price}</div>
                                <button onClick={() => addToCart(product)} className="w-full bg-black py-3 rounded-full font-bold text-white shadow-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                    <ShoppingCart className="w-4 h-4"/> Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-8 right-8 bg-black text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-bounce font-medium text-sm">
                    {toast}
                </div>
            )}
        </div>
    );
};

export default ProductList;
