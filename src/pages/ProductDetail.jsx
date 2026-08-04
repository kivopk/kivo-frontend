import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GAMING_PRODUCTS, addToCart } from '../utils/gamingProducts';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [notification, setNotification] = useState('');

  const product = GAMING_PRODUCTS.find((p) => p.slug === slug) || GAMING_PRODUCTS[0];

  const handleAdd = () => {
    addToCart(product, quantity);
    setNotification(`Added ${quantity} x "${product.name}" to your cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const relatedProducts = GAMING_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-red-600 selection:text-white">
      <Header />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-xs font-black uppercase tracking-wider">{notification}</span>
        </div>
      )}

      {/* Breadcrumbs Header */}
      <div className="bg-zinc-950 border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-white transition-colors">{product.categoryName}</Link>
          <span>/</span>
          <span className="text-red-500 truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Single Product Layout */}
      <div className="max-w-7xl mx-auto px-4 py-10 w-full flex-1 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden aspect-square flex items-center justify-center relative">
              {product.isHot && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg z-10">
                  HOT Product
                </span>
              )}
              <img
                src={product.images[activeImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-red-600 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-red-600/20 text-red-500 border border-red-600/30 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  {product.platform}
                </span>
                <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                  {product.stockStatus}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight italic">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs text-yellow-400">
                <span>{'★'.repeat(Math.floor(product.rating))}</span>
                <span className="text-gray-400">({product.rating} / 5 based on {product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-zinc-900/80 border border-white/10 p-5 rounded-2xl flex items-baseline gap-4">
              <span className="text-3xl font-black text-white">{product.pricePKR}</span>
              {product.oldPricePKR && (
                <span className="text-sm text-gray-500 line-through">{product.oldPricePKR}</span>
              )}
            </div>

            {/* Product Overview */}
            <p className="text-sm text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Modifier & Add to Cart Actions */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4">
                <span className="text-xs font-black uppercase tracking-wider text-gray-400">Quantity:</span>
                <div className="flex items-center bg-zinc-900 border border-white/20 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-white hover:bg-white/10 font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-black text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-white hover:bg-white/10 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleAdd}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-white hover:bg-gray-200 text-black py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Specs Table */}
            {product.specs && product.specs.length > 0 && (
              <div className="bg-zinc-900/60 border border-white/10 p-5 rounded-2xl space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-white border-l-2 border-red-600 pl-2">
                  Technical Specifications
                </h3>
                <div className="divide-y divide-white/5 text-xs">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="py-2 flex justify-between">
                      <span className="text-gray-400 font-medium">{spec.key}</span>
                      <span className="text-white font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 border-t border-white/10 space-y-6">
            <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              <span className="w-2 h-5 bg-red-600 inline-block rounded-full"></span>
              Related Gaming Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    navigate(`/product/${rel.slug}`);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-zinc-900 border border-white/10 hover:border-red-500 rounded-2xl p-4 cursor-pointer transition-all hover:shadow-xl group"
                >
                  <div className="relative overflow-hidden rounded-xl bg-black aspect-square mb-3">
                    <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">{rel.name}</h4>
                  <div className="text-xs font-black text-white mt-1">{rel.pricePKR}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
