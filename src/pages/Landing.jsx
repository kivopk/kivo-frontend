import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GAMING_PRODUCTS, addToCart } from '../utils/gamingProducts';

const Landing = () => {
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setNotification(`Added "${product.name}" to cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

  const hotItems = GAMING_PRODUCTS.filter((p) => p.isHot);
  const featuredItems = GAMING_PRODUCTS.filter((p) => p.isFeatured);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-red-600 selection:text-white">
      <Header />

      {/* Floating Notification Banner */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-xs font-black uppercase tracking-wider">{notification}</span>
        </div>
      )}

      {/* Hero Showcase Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-black py-12 md:py-20 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-10 blur-sm"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/50 text-red-500 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              <span>🔥 Official Gaming Store</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter italic leading-none">
              Play Next Gen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-white">
                Consoles & Games
              </span>
            </h1>
            <p className="text-sm sm:text-base text-gray-400 max-w-xl leading-relaxed">
              Shop PlayStation 5, Nintendo Switch, Xbox Series X, competitive controllers, audio gear, and digital gift cards with same-day express delivery in Lahore & Islamabad.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/shop"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-red-600/30 hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>Browse Full Shop</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                to="/shop?category=consoles"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all"
              >
                View Consoles
              </Link>
            </div>
          </div>

          {/* Hero Featured Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border border-white/15 rounded-3xl p-6 shadow-2xl relative group">
              <span className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full z-10 shadow-lg">
                Top Seller
              </span>
              <div className="overflow-hidden rounded-2xl mb-4 bg-zinc-950 aspect-video flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80"
                  alt="PS5 Slim Disc Edition"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500">PlayStation 5</span>
                  <span className="text-xs text-green-400 font-bold">In Stock</span>
                </div>
                <h3 className="text-xl font-black uppercase text-white tracking-tight">
                  PS5 Slim Disc Edition 1TB
                </h3>
                <div className="flex items-baseline justify-between pt-2">
                  <div>
                    <span className="text-2xl font-black text-white">Rs. 164,999</span>
                    <span className="text-xs text-gray-500 line-through ml-2">Rs. 179,999</span>
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(GAMING_PRODUCTS[0], e)}
                    className="bg-white text-black hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-zinc-950 py-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="text-red-500 font-black text-lg mb-1">⚡ Express Delivery</div>
            <p className="text-[11px] text-gray-400">Same day delivery in Lahore & Islamabad</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="text-red-500 font-black text-lg mb-1">🛡️ 100% Original</div>
            <p className="text-[11px] text-gray-400">Authentic consoles & original games</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="text-red-500 font-black text-lg mb-1">📞 Phone Support</div>
            <p className="text-[11px] text-gray-400">Call helplines active Mon-Sun</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="text-red-500 font-black text-lg mb-1">💳 Digital Cards</div>
            <p className="text-[11px] text-gray-400">Instant digital code delivery</p>
          </div>
        </div>
      </section>

      {/* Main Browse Categories Section */}
      <section className="py-14 max-w-7xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-red-600 inline-block rounded-full"></span>
              Browse Categories
            </h2>
            <p className="text-xs text-gray-400 mt-1">Select a category to explore available gaming products</p>
          </div>
          <Link to="/shop" className="text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors flex items-center gap-1">
            <span>View All</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { id: 'consoles', title: 'Consoles', icon: '🎮', count: '5 Models' },
            { id: 'ps5-games', title: 'PS5 Games', icon: '💿', count: '5 Titles' },
            { id: 'controllers', title: 'Controllers', icon: '🎮', count: '6 Items' },
            { id: 'audio', title: 'Audio & Gear', icon: '🎧', count: '4 Items' },
            { id: 'accessories', title: 'Accessories', icon: '⚙️', count: '4 Items' },
            { id: 'gift-cards', title: 'Gift Cards', icon: '💳', count: '5 Cards' }
          ].map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.id}`}
              className="bg-zinc-900/80 hover:bg-red-600 border border-white/10 p-5 rounded-2xl text-center group transition-all transform hover:-translate-y-1 shadow-lg"
            >
              <div className="text-3xl mb-2 group-hover:scale-125 transition-transform">{cat.icon}</div>
              <div className="text-xs font-black uppercase tracking-wider text-white group-hover:text-white mb-0.5">{cat.title}</div>
              <div className="text-[10px] text-gray-500 group-hover:text-red-100 font-medium">{cat.count}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOT Items Grid (Sky Games Style) */}
      <section className="py-12 bg-zinc-950 border-t border-white/10 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-red-500 mb-1">Trending Products</div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">HOT Items</h2>
            </div>
            <Link to="/shop" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
              Explore Store
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hotItems.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.slug}`)}
                className="bg-zinc-900 border border-white/10 hover:border-red-500 rounded-2xl p-4 cursor-pointer transition-all hover:shadow-2xl hover:shadow-red-600/10 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative overflow-hidden rounded-xl bg-black aspect-square mb-4">
                    <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                      HOT
                    </span>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 block">
                      {product.platform}
                    </span>
                    <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-black text-white block">{product.pricePKR}</span>
                    {product.oldPricePKR && (
                      <span className="text-[10px] text-gray-500 line-through block">{product.oldPricePKR}</span>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-lg text-xs font-black uppercase transition-colors"
                    title="Add to Cart"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-14 max-w-7xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-red-600 inline-block rounded-full"></span>
              Featured Gaming Gear
            </h2>
            <p className="text-xs text-gray-400 mt-1">Hand-picked top tier games, gear, and digital keys</p>
          </div>
          <Link to="/shop" className="text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-400">
            View All ({GAMING_PRODUCTS.length})
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredItems.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.slug}`)}
              className="bg-zinc-900/60 border border-white/10 hover:border-white/30 rounded-2xl p-4 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative overflow-hidden rounded-xl bg-black aspect-square mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-red-500 block">
                    {product.categoryName}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-sm font-black text-white block">{product.pricePKR}</span>
                </div>
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="bg-white/10 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
