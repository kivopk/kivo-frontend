// Comprehensive Gaming Products Catalog inspired by Sky Games (skygames.com.pk)

export const GAMING_CATEGORIES = [
  { id: 'all', name: 'All Products', count: 24 },
  { id: 'consoles', name: 'Consoles', count: 5, icon: '🎮' },
  { id: 'ps5-games', name: 'PS5 Games', count: 5, icon: '💿' },
  { id: 'ps4-games', name: 'PS4 Games', count: 2, icon: '💿' },
  { id: 'switch-games', name: 'Nintendo Switch Games', count: 3, icon: '🕹️' },
  { id: 'xbox-games', name: 'Xbox Series X/S Games', count: 2, icon: '🟢' },
  { id: 'controllers', name: 'Gaming Controllers', count: 6, icon: '🎮' },
  { id: 'audio', name: 'Audio & Headsets', count: 4, icon: '🎧' },
  { id: 'accessories', name: 'Accessories & Docks', count: 4, icon: '⚙️' },
  { id: 'gift-cards', name: 'Gift Cards', count: 5, icon: '💳' },
  { id: 'monitors', name: 'Monitors & VR', count: 2, icon: '🖥️' }
];

export const GAMING_PRODUCTS = [
  {
    id: 'ps5-slim-disc-1tb',
    slug: 'ps5-slim-disc-1tb',
    name: 'PS5 Slim Disc Edition – 1TB',
    category: 'consoles',
    categoryName: 'Consoles',
    platform: 'PlayStation 5',
    price: 499,
    pricePKR: 'Rs. 164,999',
    oldPrice: 549,
    oldPricePKR: 'Rs. 179,999',
    isHot: true,
    isFeatured: true,
    stockStatus: 'In Stock',
    rating: 5.0,
    reviewsCount: 48,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.',
    specs: [
      { key: 'Storage', value: '1TB Custom NVMe SSD' },
      { key: 'Resolution', value: 'Up to 4K 120Hz / 8K HDR' },
      { key: 'Disc Drive', value: 'Ultra HD Blu-ray' },
      { key: 'Audio', value: 'Tempest 3D AudioTech' }
    ]
  },
  {
    id: 'halo-campaign-evolved-ps5',
    slug: 'halo-campaign-evolved-ps5',
    name: 'Halo: Campaign Evolved PS5',
    category: 'ps5-games',
    categoryName: 'PS5 Games',
    platform: 'PlayStation 5',
    price: 69,
    pricePKR: 'Rs. 22,500',
    oldPrice: 79,
    oldPricePKR: 'Rs. 25,000',
    isHot: true,
    isFeatured: true,
    stockStatus: 'In Stock',
    rating: 4.9,
    reviewsCount: 32,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The legendary Master Chief returns in a groundbreaking remastered campaign experience optimized specifically for Next-Gen hardware with ray-tracing, 60fps 4K mode, and full DualSense haptic feedback.',
    specs: [
      { key: 'Genre', value: 'First-Person Shooter' },
      { key: 'Publisher', value: 'Xbox Game Studios' },
      { key: 'Platform', value: 'PS5' }
    ]
  },
  {
    id: 'lenovo-legion-go-512gb',
    slug: 'lenovo-legion-go-512gb',
    name: 'LENOVO Legion Go 512GB Z1 Extreme',
    category: 'consoles',
    categoryName: 'Consoles',
    platform: 'PC Handheld',
    price: 699,
    pricePKR: 'Rs. 224,999',
    oldPrice: 749,
    oldPricePKR: 'Rs. 240,000',
    isHot: true,
    isFeatured: true,
    stockStatus: 'In Stock',
    rating: 4.8,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Unleash PC gaming portability powered by AMD Ryzen Z1 Extreme chip, 8.8-inch QHD+ 144Hz screen, and detachable TrueStrike controllers with FPS mode capability.',
    specs: [
      { key: 'Processor', value: 'AMD Ryzen Z1 Extreme' },
      { key: 'Display', value: '8.8" QHD+ (2560x1600) 144Hz IPS' },
      { key: 'RAM', value: '16GB LPDDR5X-7500' },
      { key: 'Storage', value: '512GB PCIe 4.0 NVMe SSD' }
    ]
  },
  {
    id: 'fantech-alpha-gc-184-chair',
    slug: 'fantech-alpha-gc-184-chair',
    name: 'Fantech Alpha GC-184 Gaming Chair',
    category: 'accessories',
    categoryName: 'Accessories',
    platform: 'Gaming Setup',
    price: 189,
    pricePKR: 'Rs. 59,500',
    oldPrice: 220,
    oldPricePKR: 'Rs. 68,000',
    isHot: true,
    isFeatured: false,
    stockStatus: 'In Stock',
    rating: 4.7,
    reviewsCount: 14,
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Ergonomic gaming chair crafted with high-density cold-cured foam, premium PU leather, 4D adjustable armrests, and 180-degree reclining backrest for ultimate comfort.',
    specs: [
      { key: 'Material', value: 'Premium PU Leather & Cold Foam' },
      { key: 'Armrests', value: '4D Adjustable' },
      { key: 'Gas Lift', value: 'Class 4 Hydraulic' }
    ]
  },
  {
    id: 'ps5-scuf-omega-controller',
    slug: 'ps5-scuf-omega-controller',
    name: 'PS5 SCUF Omega Controller – Wireless',
    category: 'controllers',
    categoryName: 'Gaming Controllers',
    platform: 'PlayStation 5',
    price: 199,
    pricePKR: 'Rs. 64,500',
    oldPrice: 229,
    oldPricePKR: 'Rs. 72,000',
    isHot: true,
    isFeatured: true,
    stockStatus: 'In Stock',
    rating: 4.9,
    reviewsCount: 28,
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Pro-tier wireless PS5 controller featuring 4 remappable rear paddles, instant triggers, anti-slip performance grip, and interchangeable thumbsticks for competitive esports superiority.',
    specs: [
      { key: 'Connectivity', value: 'Low Latency Bluetooth & USB-C' },
      { key: 'Paddles', value: '4 Rear Remappable Paddles' },
      { key: 'Triggers', value: 'Instant Mouse-Click Triggers' }
    ]
  },
  {
    id: 'cyberpunk-2077-ultimate-ps5',
    slug: 'cyberpunk-2077-ultimate-ps5',
    name: 'Cyberpunk 2077 Ultimate Edition PS5',
    category: 'ps5-games',
    categoryName: 'PS5 Games',
    platform: 'PlayStation 5',
    price: 59,
    pricePKR: 'Rs. 18,999',
    oldPrice: 69,
    oldPricePKR: 'Rs. 22,000',
    isHot: true,
    isFeatured: true,
    stockStatus: 'In Stock',
    rating: 4.9,
    reviewsCount: 45,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The complete Night City story including the base game and the critically-acclaimed spy-thriller expansion Phantom Liberty, fully enhanced with Next-Gen Ray Tracing and DualSense features.',
    specs: [
      { key: 'Publisher', value: 'CD PROJEKT RED' },
      { key: 'Genre', value: 'Open-World Action RPG' },
      { key: 'Includes', value: 'Base Game + Phantom Liberty DLC' }
    ]
  },
  {
    id: 'xbox-astral-purple-controller',
    slug: 'xbox-astral-purple-controller',
    name: 'XBOX Astral Purple Controller for Series X|S',
    category: 'controllers',
    categoryName: 'Gaming Controllers',
    platform: 'Xbox Series X/S / PC',
    price: 65,
    pricePKR: 'Rs. 21,500',
    oldPrice: 75,
    oldPricePKR: 'Rs. 24,000',
    isHot: false,
    isFeatured: true,
    stockStatus: 'In Stock',
    rating: 4.8,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Elevate your gaming with the Xbox Wireless Controller featuring a bold Astral Purple design, sculpted surfaces, hybrid D-pad, textured grip, and seamless sharing.',
    specs: [
      { key: 'Color', value: 'Astral Purple' },
      { key: 'Compatibility', value: 'Xbox Series X|S, Xbox One, PC, Android, iOS' },
      { key: 'Battery Life', value: 'Up to 40 Hours' }
    ]
  },
  {
    id: 'gstory-portable-monitor-ps5',
    slug: 'gstory-portable-monitor-ps5',
    name: 'GStory Portable Monitor for PS5 Slim 4K 60Hz',
    category: 'monitors',
    categoryName: 'Monitors & VR',
    platform: 'PS5 Accessory',
    price: 249,
    pricePKR: 'Rs. 81,999',
    oldPrice: 289,
    oldPricePKR: 'Rs. 92,000',
    isHot: true,
    isFeatured: false,
    stockStatus: 'In Stock',
    rating: 4.7,
    reviewsCount: 11,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Transform your PS5 Slim into a portable gaming powerhouse with an integrated 14.0-inch 4K UHD IPS screen, dual built-in stereo speakers, and FreeSync support.',
    specs: [
      { key: 'Screen Size', value: '14.0 inch 4K IPS (3840x2160)' },
      { key: 'Refresh Rate', value: '60Hz HDR FreeSync' },
      { key: 'Mounting', value: 'Seamless Clip-on for PS5 Slim' }
    ]
  },
  {
    id: 'harman-kardon-onyx-studio-9',
    slug: 'harman-kardon-onyx-studio-9',
    name: 'Harman Kardon Onyx Studio 9 Portable Speaker',
    category: 'audio',
    categoryName: 'Audio & Headsets',
    platform: 'Audio',
    price: 299,
    pricePKR: 'Rs. 97,999',
    oldPrice: 349,
    oldPricePKR: 'Rs. 110,000',
    isHot: true,
    isFeatured: false,
    stockStatus: 'In Stock',
    rating: 4.9,
    reviewsCount: 30,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Superior acoustic engineering delivering room-filling room audio, self-tuning room calibration, 8 hours of playtime, and signature aluminum handle design.',
    specs: [
      { key: 'Battery Life', value: '8 Hours Playtime' },
      { key: 'Bluetooth', value: 'v5.3 Multi-Point Connection' },
      { key: 'Output Power', value: '50W RMS' }
    ]
  },
  {
    id: 'playstation-card-50',
    slug: 'playstation-card-50',
    name: 'PlayStation Network $50 USD Gift Card',
    category: 'gift-cards',
    categoryName: 'Gift Cards',
    platform: 'PlayStation Store',
    price: 50,
    pricePKR: 'Rs. 16,500',
    oldPrice: 55,
    oldPricePKR: 'Rs. 17,500',
    isHot: false,
    isFeatured: true,
    stockStatus: 'Digital Code Instant',
    rating: 5.0,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Instant digital code for PlayStation Store US. Top up your PSN wallet to purchase games, add-ons, subscriptions (PS Plus), and digital media.',
    specs: [
      { key: 'Region', value: 'United States (US)' },
      { key: 'Delivery', value: 'Instant Email & Code on Screen' }
    ]
  },
  {
    id: 'nintendo-switch-oled',
    slug: 'nintendo-switch-oled',
    name: 'Nintendo Switch OLED Model – White Edition',
    category: 'consoles',
    categoryName: 'Consoles',
    platform: 'Nintendo Switch',
    price: 349,
    pricePKR: 'Rs. 94,999',
    oldPrice: 389,
    oldPricePKR: 'Rs. 105,000',
    isHot: false,
    isFeatured: true,
    stockStatus: 'In Stock',
    rating: 4.9,
    reviewsCount: 56,
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80'
    ],
    description: '7-inch vibrant OLED screen, wide adjustable stand, wired LAN port dock, 64GB internal storage, and enhanced audio in handheld and tabletop modes.',
    specs: [
      { key: 'Screen', value: '7.0-inch OLED' },
      { key: 'Storage', value: '64GB Internal Storage' },
      { key: 'Modes', value: 'TV, Tabletop, Handheld' }
    ]
  },
  {
    id: 'steam-card-50',
    slug: 'steam-card-50',
    name: 'Steam Wallet $50 USD Digital Gift Card',
    category: 'gift-cards',
    categoryName: 'Gift Cards',
    platform: 'Steam Store',
    price: 50,
    pricePKR: 'Rs. 16,500',
    oldPrice: 55,
    oldPricePKR: 'Rs. 17,500',
    isHot: false,
    isFeatured: true,
    stockStatus: 'Digital Code Instant',
    rating: 5.0,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Instant delivery Steam Wallet digital code. Add funds to your Steam account to unlock thousands of PC titles, software, and in-game items.',
    specs: [
      { key: 'Platform', value: 'Steam PC' },
      { key: 'Delivery', value: 'Instant Digital Key' }
    ]
  }
];

// Helper functions for shopping cart management
export const getStoredCart = () => {
  try {
    const raw = localStorage.getItem('kivo_cart_items');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const saveStoredCart = (items) => {
  try {
    localStorage.setItem('kivo_cart_items', JSON.stringify(items));
    window.dispatchEvent(new Event('kivo_cart_updated'));
  } catch (e) {
    console.error('Cart save error:', e);
  }
};

export const addToCart = (product, quantity = 1) => {
  const current = getStoredCart();
  const existingIdx = current.findIndex((item) => item.id === product.id);

  if (existingIdx > -1) {
    current[existingIdx].quantity += quantity;
  } else {
    current.push({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      pricePKR: product.pricePKR,
      image: product.image,
      platform: product.platform,
      quantity: quantity
    });
  }
  saveStoredCart(current);
};

export const updateCartQuantity = (productId, newQuantity) => {
  let current = getStoredCart();
  if (newQuantity <= 0) {
    current = current.filter((item) => item.id !== productId);
  } else {
    const target = current.find((item) => item.id === productId);
    if (target) target.quantity = newQuantity;
  }
  saveStoredCart(current);
};

export const removeFromCart = (productId) => {
  const current = getStoredCart().filter((item) => item.id !== productId);
  saveStoredCart(current);
};
