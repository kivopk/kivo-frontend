import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getStoredCart, saveStoredCart } from '../utils/gamingProducts';

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = getStoredCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Lahore',
    address: '',
    notes: '',
    paymentMethod: 'cod'
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotalUSD = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    const newOrderId = 'KIVO-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);
    setOrderComplete(true);
    saveStoredCart([]); // Clear cart
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-red-600 selection:text-white">
        <Header />
        <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6 flex-1 flex flex-col justify-center">
          <div className="w-20 h-20 bg-green-500/20 text-green-400 border border-green-500/40 rounded-full flex items-center justify-center mx-auto text-4xl animate-bounce">
            ✓
          </div>
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-red-500">Order Confirmed</span>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white italic">
              Thank You for Shopping at Kivo!
            </h1>
            <p className="text-xs text-gray-400">
              Your order ID is <span className="text-white font-bold">{orderId}</span>. Our delivery team will call you at <span className="text-white font-bold">{formData.phone}</span> to confirm dispatch for {formData.city}.
            </p>
          </div>

          <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl text-left space-y-2 text-xs">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Delivery Address:</span>
              <span className="text-white font-bold">{formData.address}, {formData.city}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Payment Method:</span>
              <span className="text-white font-bold uppercase">{formData.paymentMethod === 'cod' ? 'Cash on Delivery' : formData.paymentMethod}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-gray-400">Total Order Value:</span>
              <span className="text-red-500 font-black">${subtotalUSD.toFixed(2)}</span>
            </div>
          </div>

          <Link
            to="/shop"
            className="inline-block bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl transition-all"
          >
            Back to Gaming Store
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-red-600 selection:text-white">
      <Header />

      {/* Header Banner */}
      <div className="bg-zinc-950 border-b border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-1">
            Express Shipping Checkout
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white italic">
            Complete Your Order
          </h1>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="max-w-7xl mx-auto px-4 py-10 w-full flex-1">
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Shipping Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-white border-l-2 border-red-600 pl-2">
                1. Shipping & Contact Information
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-400 font-bold mb-1 uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 font-bold mb-1 uppercase tracking-wider">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0322 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-black border border-white/15 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 font-bold mb-1 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black border border-white/15 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 font-bold mb-1 uppercase tracking-wider">City *</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-black border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="Lahore">Lahore (Same Day Express Delivery)</option>
                      <option value="Islamabad">Islamabad (Same Day Express Delivery)</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Other">Other City</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 font-bold mb-1 uppercase tracking-wider">Delivery Street Address *</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="House/Apartment #, Street, Sector, Landmark..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-white border-l-2 border-red-600 pl-2">
                2. Select Payment Method
              </h3>

              <div className="space-y-3 text-xs">
                <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod' ? 'bg-red-600/10 border-red-500' : 'bg-black border-white/10'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    />
                    <div>
                      <span className="font-black text-white block uppercase">Cash on Delivery (COD)</span>
                      <span className="text-gray-400 text-[11px]">Pay with cash upon delivery to your doorstep.</span>
                    </div>
                  </div>
                </label>

                <label className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'bank' ? 'bg-red-600/10 border-red-500' : 'bg-black border-white/10'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    />
                    <div>
                      <span className="font-black text-white block uppercase">Direct Bank Transfer / Raast</span>
                      <span className="text-gray-400 text-[11px]">Bank account details will be shared for instant transfer.</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-white border-l-2 border-red-600 pl-2">
                Order Review ({cartItems.length} items)
              </h3>

              <div className="divide-y divide-white/5 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg bg-black" />
                      <div>
                        <span className="font-bold text-white line-clamp-1">{item.name}</span>
                        <span className="text-gray-500 text-[10px]">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">${subtotalUSD.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Express Shipping ({formData.city})</span>
                  <span className="text-green-400 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                  <span>Total Due</span>
                  <span className="text-red-500">${subtotalUSD.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-red-600/30 transition-all"
              >
                Place Order Now
              </button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
