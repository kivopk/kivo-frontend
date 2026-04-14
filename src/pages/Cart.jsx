import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { trpc } from '../services/trpc';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = React.useState([]);
    const [subtotal, setSubtotal] = React.useState(0);

    const loadCart = async () => {
        try {
            const data = await trpc.cart.getCart.query();
            if (data && data.items && data.items.length > 0) {
                setCartItems(data.items);
                const total = data.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
                setSubtotal(total);
                return;
            }
            throw new Error("Empty backend cart");
        } catch (error) {
            // Fallback to local storage
            console.log("Using local cart fallback");
            const localCart = JSON.parse(localStorage.getItem('kivo_cart') || '[]');
            setCartItems(localCart);
            const total = localCart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
            setSubtotal(total);
        }
    };

    React.useEffect(() => {
        loadCart();
    }, []);

    const removeLocalItem = (productId) => {
        let localCart = JSON.parse(localStorage.getItem('kivo_cart') || '[]');
        localCart = localCart.filter(item => item.product.id !== productId);
        localStorage.setItem('kivo_cart', JSON.stringify(localCart));
        window.dispatchEvent(new Event('cartUpdated'));
        loadCart();
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <div className="lg:flex max-w-screen-2xl mx-auto mt-16 pt-6">
                {/* Left Section: Cart Items */}
                <div className="flex-grow m-4 bg-white p-6 shadow-sm rounded-xl border border-gray-200">
                    <div className="flex flex-col border-b border-gray-200 pb-4">
                        <h1 className="text-3xl font-bold tracking-tight pb-4">Shopping Cart</h1>
                        {cartItems.length === 0 ? (
                            <p className="text-gray-500 text-lg mt-4">Your Kivo Cart is currently empty. <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => navigate('/products')}>Keep shopping.</span></p>
                        ) : (
                            cartItems.map((item, i) => (
                                <div key={i} className="flex flex-col sm:flex-row justify-between my-6 border-b border-gray-100 pb-6 last:border-b-0">
                                    <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4 cursor-pointer" onClick={() => navigate(`/product/${item.product?.id}`)}>
                                        <img src={item.product?.image || "https://images.unsplash.com/photo-1579586337278-3befd40fd17a"} alt={item.product?.name} className="h-40 w-40 object-contain mix-blend-multiply transition-transform hover:scale-105" />
                                    </div>
                                    <div className="flex-grow sm:ml-6 mt-4 sm:mt-0 flex flex-col">
                                        <p className="font-bold text-xl text-gray-900 cursor-pointer hover:text-amazon_orange transition-colors" onClick={() => navigate(`/product/${item.product?.id}`)}>{item.product?.name}</p>
                                        <p className="text-sm text-green-600 font-bold my-2">In Stock</p>
                                        <div className="text-xs text-gray-500 space-y-1 mb-2">
                                            <p>Gift options available</p>
                                            <p className="font-semibold text-gray-700">Style: Signature</p>
                                        </div>
                                        <div className="flex items-center space-x-6 mt-auto">
                                            <p className="font-black text-2xl text-gray-900">${item.product?.price}</p>
                                            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-2 py-1">
                                                <label className="text-sm font-semibold text-gray-700">Qty:</label>
                                                <select className="bg-transparent border-none outline-none font-bold text-gray-900 cursor-pointer" defaultValue={item.quantity}>
                                                    {[1, 2, 3, 4, 5, 6, 7].map(x => <option key={x} value={x}>{x}</option>)}
                                                </select>
                                            </div>
                                            <button 
                                                onClick={() => removeLocalItem(item.product?.id)}
                                                className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors border-l pl-6 border-gray-300"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Section: Subtotal */}
                <div className="flex flex-col bg-white p-8 shadow-sm rounded-xl border border-gray-200 h-fit m-4 min-w-[320px]">
                    {cartItems.length > 0 && (
                        <>
                            <div className="flex text-green-600 font-bold text-sm items-center gap-2 mb-4 bg-green-50 p-3 rounded-lg border border-green-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Your order qualifies for FREE Shipping.
                            </div>
                            <h2 className="text-xl text-gray-800">
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items):
                                <span className="font-black text-2xl tracking-tight block mt-1">${subtotal.toFixed(2)}</span>
                            </h2>
                            <button
                                onClick={() => navigate('/checkout')}
                                className="bg-amazon_yellow py-3.5 mt-6 rounded-full font-bold shadow-sm hover:bg-yellow-400 text-black flex-grow w-full transition-transform hover:scale-[1.02]"
                            >
                                Proceed to Checkout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
