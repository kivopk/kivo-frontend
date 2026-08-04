import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GAMING_PRODUCTS, GAMING_CATEGORIES, addToCart } from '../utils/gamingProducts';

const ProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('latest');
  const [maxPrice, setMaxPrice] = useState(300000);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelectedCategory(params.get('category') || 'all');
    setSearchQuery(params.get('search') || '');
  }, [location.search]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    const params = new URLSearchParams(location.search);
    if (catId === 'all') {
      params.delete('category');
    } else {
      params.set('category', catId);
    }
    navigate({ search: params.toString() });
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setNotification(`Added "${product.name}" to cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

  // Filter products based on search, category, and max price
  let filtered = GAMING_PRODUCTS.filter((product) => {
    const matchesCat = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.platform.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sort filtered products
  if (sortBy === 'price_asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-red-600 selection:text-white">
      <Header />

      {/* Floating Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-xs font-black uppercase tracking-wider">{notification}</span>
        </div>
      )}

      {/* Page Breadcrumb & Header */}
      <div className="bg-zinc-950 border-b border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-1 flex items-center gap-2">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span>Shop Products</span>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white italic">
              {selectedCategory === 'all' ? 'All Gaming Products' : GAMING_CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Products'}
            </h1>
          </div>

          <div className="text-xs text-gray-400">
            Showing <span className="text-white font-bold">{filtered.length}</span> of {GAMING_PRODUCTS.length} total products
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar & Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Filter Sidebar (Sky Games Style) */}
        <aside className="lg:col-span-3 space-y-6">
          {/* Categories Sidebar */}
          <div className="bg-zinc-900 border border-white/10 p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-white border-l-2 border-red-600 pl-2">
              Product Categories
            </h3>

            <div className="space-y-1">
              {GAMING_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-red-600 text-white font-bold shadow-md'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {cat.icon && <span>{cat.icon}</span>}
                    <span>{cat.name}</span>
                  </span>
                  <span className="text-[10px] opacity-70">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reset Filters Box */}
          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                navigate('/shop');
              }}
              className="w-full bg-white/10 hover:bg-red-600 border border-white/10 text-white text-xs font-black uppercase tracking-wider py-3 rounded-xl transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </aside>

        {/* Right Main Catalog Content */}
        <main className="lg:col-span-9 space-y-6">
          {/* Top Sort & Active Search Controls */}
          <div className="bg-zinc-900/60 border border-white/10 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            {searchQuery ? (
              <div className="text-xs text-gray-300">
                Search results for: <span className="text-red-500 font-bold">"{searchQuery}"</span>
              </div>
            ) : (
              <div className="text-xs text-gray-400">Sort and filter gaming catalog</div>
            )}

            <div className="flex items-center gap-2 text-xs">
              <label className="text-gray-400 font-bold uppercase tracking-wider">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black border border-white/20 text-white rounded-lg py-1.5 px-3 text-xs focus:outline-none focus:border-red-500"
              >
                <option value="latest">Latest Releases</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-12 text-center space-y-4">
              <div className="text-4xl">🎮</div>
              <h3 className="text-lg font-black uppercase tracking-tight text-white">No Products Found</h3>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                We couldn't find any products matching your selected category or search term. Try resetting your search filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  navigate('/shop');
                }}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl transition-colors"
              >
                Reset Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.slug}`)}
                  className="bg-zinc-900 border border-white/10 hover:border-red-500 rounded-2xl p-4 cursor-pointer transition-all hover:shadow-2xl hover:shadow-red-600/10 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative overflow-hidden rounded-xl bg-black aspect-square mb-4">
                      {product.isHot && (
                        <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                          HOT
                        </span>
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black uppercase tracking-widest text-red-500 block">
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
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProductList;
