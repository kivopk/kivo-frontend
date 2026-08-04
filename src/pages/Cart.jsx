import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getStoredCart, updateCartQuantity, removeFromCart } from '../utils/gamingProducts';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const loadCart = () => {
    setCartItems(getStoredCart());
  };

  useEffect(() => {
    loadCart();
    window.addEventListener('kivo_cart_updated', loadCart);
    return () => window.removeEventListener('kivo_cart_updated', loadCart);
  }, []);

  const handleQtyChange = (id, currentQty, delta) => {
    const next = currentQty + delta;
    updateCartQuantity(id, next);
    loadCart();
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    loadCart();
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'KIVO10') {
      setDiscount(0.1); // 10% off
    } else {
      alert('Invalid coupon code. Try KIVO10 for 10% off!');
    }
  };

  const subtotalUSD = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountUSD = subtotalUSD * discount;
  const totalUSD = subtotalUSD - discountUSD;

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-red-600 selection:text-white">
      <Header />

      {/* Header Banner */}
      <div className="bg-zinc-950 border-b border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-1">
              Shopping Cart
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white italic">
              Your Selected Gear ({cartItems.reduce((a, b) => a + b.quantity, 0)})
            </h1>
          </div>
          <Link to="/shop" className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors">
            ← Continue Shopping
          </Link>
        </div>
      </div>

      {/* Cart Body */}
      <div className="max-w-7xl mx-auto px-4 py-10 w-full flex-1">
        {cartItems.length === 0 ? (
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-12 text-center space-y-4 max-w-xl mx-auto">
            <div className="text-5xl">🛒</div>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">Your Cart is Currently Empty</h2>
            <p className="text-xs text-gray-400">
              Browse our catalog of PS5, Xbox Series X, Nintendo Switch consoles, games, and accessories to start building your order.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl transition-all"
            >
              Explore Gaming Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Items Table */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-white/10 text-xs font-black uppercase tracking-wider text-gray-400 grid grid-cols-12">
                  <div className="col-span-6">Item Description</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>

                <div className="divide-y divide-white/5">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 grid grid-cols-12 items-center gap-2 text-xs">
                      {/* Product Thumbnail & Details */}
                      <div className="col-span-6 flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg bg-black border border-white/10" />
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-red-500 block">{item.platform}</span>
                          <Link to={`/product/${item.slug}`} className="font-bold text-white hover:text-red-400 transition-colors line-clamp-1">
                            {item.name}
                          </Link>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-[10px] text-red-500 hover:underline mt-1 block"
                          >
                            Remove item
                          </button>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="col-span-2 text-center font-bold text-gray-300">
                        {item.pricePKR || `$${item.price}`}
                      </div>

                      {/* Quantity Control */}
                      <div className="col-span-2 flex justify-center">
                        <div className="flex items-center bg-black border border-white/20 rounded-lg overflow-hidden text-xs">
                          <button onClick={() => handleQtyChange(item.id, item.quantity, -1)} className="px-2 py-1 hover:bg-white/10">-</button>
                          <span className="px-2 py-1 font-bold">{item.quantity}</span>
                          <button onClick={() => handleQtyChange(item.id, item.quantity, 1)} className="px-2 py-1 hover:bg-white/10">+</button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="col-span-2 text-right font-black text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Summary Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-white border-l-2 border-red-600 pl-2">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs border-b border-white/10 pb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Items Subtotal</span>
                    <span className="font-bold text-white">${subtotalUSD.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Same Day Delivery</span>
                    <span className="font-bold text-green-400">FREE</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-red-500 font-bold">
                      <span>Promo Discount (10%)</span>
                      <span>-${discountUSD.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between text-lg font-black text-white">
                  <span>Total Amount</span>
                  <span className="text-red-500">${totalUSD.toFixed(2)}</span>
                </div>

                {/* Coupon Form */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (KIVO10)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 bg-black border border-white/15 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder-gray-500 focus:outline-none focus:border-red-500"
                  />
                  <button type="submit" className="bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase px-4 rounded-xl transition-colors">
                    Apply
                  </button>
                </form>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
