import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, ChevronDown, MapPin } from "lucide-react";
import { trpc } from "../services/trpc";
import kivoLogo from "../assets/kivo-logo.jpeg";

const Header = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openCategory, setOpenCategory] = useState(null);
    const [user, setUser] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
        setSidebarOpen(false); // Close the sliding bar on logout
        navigate("/login");
    };

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        if (newDarkMode) {
            document.documentElement.classList.add("dark-theme");
        } else {
            document.documentElement.classList.remove("dark-theme");
        }
    };

    React.useEffect(() => {
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

        // Cart Count Logic
        const updateCartCount = async () => {
            try {
                if (localStorage.getItem("access_token")) {
                    const data = await trpc.cart.getCart.query();
                    if (data && data.items) {
                        const total = data.items.reduce((acc, item) => acc + item.quantity, 0);
                        setCartCount(total);
                        return;
                    }
                }
            } catch (error) {}
            // Fallback
            const localCart = JSON.parse(localStorage.getItem('kivo_cart') || '[]');
            setCartCount(localCart.reduce((acc, item) => acc + item.quantity, 0));
        };

        updateCartCount();
        window.addEventListener('cartUpdated', updateCartCount);
        return () => window.removeEventListener('cartUpdated', updateCartCount);
    }, []);

    return (
        <>
            {/* PREMIUM SIDEBAR */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-black text-white z-[60] transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 shadow-2xl`}
            >
                <div className="flex justify-between items-center p-5 border-b border-gray-700">
                    <h2 className="text-2xl font-bold">Kivo</h2>
                    <X className="cursor-pointer" onClick={() => setSidebarOpen(false)} />
                </div>

                <div className="p-5 border-b border-gray-700">
                    <p className="text-sm text-gray-400">Welcome</p>
                    <h3 className="text-lg font-semibold">{user ? user.username || user.first_name || user.email : "Guest User"}</h3>
                </div>

                {/* CATEGORIES */}
                <div className="p-5 space-y-4">
                    <button onClick={() => navigate("/shop")} className="block w-full text-left hover:text-gray-300">Home</button>

                    <div>
                        <div
                            className="flex justify-between items-center cursor-pointer hover:text-gray-300"
                            onClick={() => setOpenCategory(openCategory === "products" ? null : "products")}
                        >
                            <span>Products</span>
                            <ChevronDown className={`transition ${openCategory === "products" ? "rotate-180" : ""}`} />
                        </div>

                        {openCategory === "products" && (
                            <div className="ml-4 mt-2 space-y-2 text-sm text-gray-300">
                                <p className="cursor-pointer hover:text-white" onClick={() => navigate("/products")}>Smart Watches</p>
                                <p className="cursor-pointer hover:text-white" onClick={() => navigate("/products")}>AR Glasses</p>
                                <p className="cursor-pointer hover:text-white" onClick={() => navigate("/products")}>Earbuds</p>
                            </div>
                        )}
                    </div>

                    {/* FILTERS */}
                    <div>
                        <div
                            className="flex justify-between items-center cursor-pointer hover:text-gray-300"
                            onClick={() => setOpenCategory(openCategory === "filters" ? null : "filters")}
                        >
                            <span>Filters</span>
                            <ChevronDown className={`transition ${openCategory === "filters" ? "rotate-180" : ""}`} />
                        </div>

                        {openCategory === "filters" && (
                            <div className="ml-4 mt-2 space-y-2 text-sm text-gray-300">
                                <p className="cursor-pointer hover:text-white" onClick={() => navigate("/products")}>Price: Low to High</p>
                                <p className="cursor-pointer hover:text-white" onClick={() => navigate("/products")}>Rating: 4★ & above</p>
                                <p className="cursor-pointer hover:text-white font-bold text-amazon_yellow" onClick={() => navigate("/deals")}>Today's Deals</p>
                            </div>
                        )}
                    </div>

                    <hr className="border-gray-700" />

                    {/* FEATURES */}
                    <div>
                        <h3 className="text-sm text-gray-400 mb-2">Features</h3>
                        <ul className="space-y-2 text-sm">
                            <li>✔ Free Delivery</li>
                            <li>✔ 1 Year Warranty</li>
                            <li>✔ Secure Payment</li>
                            <li>✔ AR Experience</li>
                        </ul>
                    </div>

                    {/* DARK MODE */}
                    <button onClick={toggleDarkMode} className="mt-4 w-full bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition">
                        {darkMode ? "☀️ Toggle Light Mode" : "🌙 Toggle Dark Mode"}
                    </button>

                    {/* SIGN OUT */}
                    <button onClick={handleLogout} className="mt-2 w-full bg-red-600 p-2 rounded-lg hover:bg-red-700 transition text-white">
                        🚪 Sign Out
                    </button>
                </div>
            </div>

            {/* OVERLAY */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-[55]" 
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Header Main Bar */}
            <header className="flex flex-col text-white sticky top-0 z-50">
                {/* Top Bar - Identical to Desktop but swipeable on Mobile */}
                <div className="flex items-center bg-[#131921] p-1 flex-grow overflow-x-auto whitespace-nowrap" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {/* Logo */}
                    <div className="flex items-center sm:mx-2 px-2 border border-transparent hover:border-white rounded-sm cursor-pointer h-[80%] my-auto flex-shrink-0">
                        <Link to="/shop" className="flex items-center h-full pt-2 pb-1">
                            <img src={kivoLogo} alt="Kivo Logo" className="w-auto h-8 object-contain" />
                        </Link>
                    </div>

                    {/* Deliver to */}
                    <div className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded-sm cursor-pointer flex-shrink-0">
                        <MapPin className="h-5 w-5 mt-2 " />
                        <div className="flex flex-col ml-1">
                            <span className="text-[10px] text-gray-300">Deliver to</span>
                            <span className="text-sm font-bold -mt-1 leading-tight text-white">Pakistan</span>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="flex items-center h-10 w-[250px] md:w-auto rounded-md flex-grow mx-4 cursor-pointer focus-within:ring-2 focus-within:ring-yellow-400 bg-white overflow-hidden flex-shrink-0">
                        <div className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-3 h-full border-r border-gray-300">
                            All <ChevronDown className="h-3 w-3 ml-1" />
                        </div>
                        <input className="p-2 h-full w-6 flex-grow flex-shrink focus:outline-none text-black px-4" type="text" placeholder="Search Kivo..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        <div className="h-full px-4 flex items-center justify-center bg-[#febd69] hover:bg-[#f3a847] transition-colors">
                            <Search className="h-5 w-5 text-gray-800" />
                        </div>
                    </div>

                    {/* Right Items */}
                    <div className="text-white flex items-center text-xs space-x-1 mx-2 flex-shrink-0">
                        {/* Account */}
                        <Link to="/account" className="flex flex-col px-2 py-1 border border-transparent hover:border-white rounded-sm cursor-pointer">
                            <span className="text-[11px] text-gray-200">Hello, {user ? user.username || user.first_name || user.email : "sign in"}</span>
                            <span className="font-bold text-[13px] leading-tight flex items-center">Account & Lists <ChevronDown className="h-3 w-3 text-gray-400 ml-1" /></span>
                        </Link>

                        {/* Orders */}
                        <Link to="/orders" className="flex flex-col px-2 py-1 border border-transparent hover:border-white rounded-sm cursor-pointer">
                            <span className="text-[11px] text-gray-200">Returns</span>
                            <span className="font-bold text-[13px] leading-tight">& Orders</span>
                        </Link>

                        {/* Cart */}
                        <Link to="/cart" className="relative flex items-center px-2 py-1 border border-transparent hover:border-white rounded-sm cursor-pointer">
                            <span className="absolute top-0 right-7 sm:right-9 w-4 h-4 text-[#f08804] bg-transparent text-center rounded-full font-bold flex justify-center items-center">{cartCount}</span>
                            <ShoppingCart className="h-9 w-9 mt-1" />
                            <span className="font-bold text-[14px] mt-4 ml-1">Cart</span>
                        </Link>
                    </div>
                </div>

                {/* Bottom Nav */}
                <div className="flex items-center space-x-1 p-1 pl-4 bg-[#232f3e] text-white text-sm overflow-x-auto whitespace-nowrap" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <button onClick={() => setSidebarOpen(true)} className="flex items-center font-bold px-2 py-1 border border-transparent hover:border-white rounded-sm whitespace-nowrap flex-shrink-0">
                        <Menu className="h-5 w-5 mr-1" />
                        All
                    </button>
                    <Link to="/shop" className="px-2 py-1 border border-transparent hover:border-white rounded-sm cursor-pointer whitespace-nowrap flex-shrink-0">Home</Link>
                    <Link to="/deals" className="px-2 py-1 border border-transparent hover:border-white rounded-sm cursor-pointer whitespace-nowrap text-amazon_yellow font-bold flex-shrink-0">Today's Deals</Link>
                </div>
            </header>
        </>
    );
};

export default Header;
