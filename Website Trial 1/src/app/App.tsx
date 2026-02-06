// ============================================
// MAIN APP COMPONENT
// ============================================
// This is the root component that manages all application state
// Controls: Page navigation, cart, favorites, search, category filtering
// All data flows through this component to child components

import { useState } from 'react';
import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { CategoryGrid } from '@/app/components/CategoryGrid';
import { ShopPage } from '@/app/components/ShopPage';
import { SellPage } from '@/app/components/SellPage';
import { Cart } from '@/app/components/Cart';
import { CheckoutPage } from '@/app/components/CheckoutPage';
import { Footer } from '@/app/components/Footer';
import { FavoritesPage } from '@/app/components/FavoritesPage';
import { Product, products } from '@/app/data/products';

// CartItem extends Product to add quantity tracking
interface CartItem extends Product {
  quantity: number;  // How many of this product in cart
}

export default function App() {
  // ============================================
  // STATE MANAGEMENT - All Application Data
  // ============================================
  
  // NAVIGATION STATE
  // Tracks which page user is currently viewing
  // Options: 'home', 'shop', 'sell', 'checkout', 'favorites'
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'sell' | 'checkout' | 'favorites'>('home');
  
  // CATEGORY FILTER STATE
  // Which category is selected ('All', 'Women', 'Kids', 'Designer', 'More')
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // SHOPPING CART STATE
  // Array of products with quantities
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // CART SIDEBAR STATE
  // Whether the cart sidebar is visible (true = open, false = closed)
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // ORDER COMPLETION STATE
  // Shows success message after checkout (true = show message, false = normal view)
  const [orderComplete, setOrderComplete] = useState(false);
  
  // SEARCH STATE
  // Current search query from header search bar
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // FAVORITES STATE
  // Set of product IDs that user has favorited
  // Using Set for fast lookup: O(1) instead of O(n) with array
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  // ============================================
  // CART MANAGEMENT FUNCTIONS
  // ============================================
  
  /**
   * ADD PRODUCT TO CART
   * If product already in cart: increase quantity by 1
   * If new product: add with quantity 1
   * Always opens cart sidebar after adding
   */
  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      // Check if product already exists in cart
      const existingItem = prevItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        // Product exists: increment quantity
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      // New product: add to cart with quantity 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
    
    // Open cart sidebar to show user the item was added
    setIsCartOpen(true);
  };

  /**
   * UPDATE PRODUCT QUANTITY IN CART
   * Changes quantity for a specific product
   */
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  /**
   * REMOVE PRODUCT FROM CART
   * Completely removes product from cart (regardless of quantity)
   */
  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  /**
   * GO TO CHECKOUT
   * Closes cart sidebar and navigates to checkout page
   */
  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  /**
   * COMPLETE ORDER
   * Shows success message, waits 3 seconds, then:
   * - Clears cart
   * - Returns to home page
   * - Hides success message
   */
  const handleOrderComplete = () => {
    setOrderComplete(true);
    setTimeout(() => {
      setCartItems([]);
      setCurrentView('home');
      setOrderComplete(false);
    }, 3000);  // 3000ms = 3 seconds
  };

  // ============================================
  // NAVIGATION FUNCTIONS
  // ============================================
  
  /**
   * CATEGORY CLICK HANDLER
   * When user clicks a category button:
   * - Sets the category filter
   * - Navigates to shop page
   */
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('shop');
  };

  /**
   * SEARCH HANDLER
   * When user submits search:
   * - Saves search query
   * - If not already on shop page, navigates to shop page
   * - Resets category to 'All' to show all matching products
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && currentView !== 'shop') {
      setCurrentView('shop');
      setSelectedCategory('All');
  };
    }

  /**
   * VIEW CHANGE HANDLER
   * Wrapper function for changing views with proper typing
   */
  const handleViewChange = (view: 'home' | 'shop' | 'sell' | 'checkout' | 'favorites') => {
    setCurrentView(view);
  };

  // ============================================
  // FAVORITES MANAGEMENT FUNCTIONS
  // ============================================
  
  /**
   * TOGGLE FAVORITE
   * If product is favorited: remove from favorites
   * If not favorited: add to favorites
   */
  const handleToggleFavorite = (product: Product) => {
    setFavoriteIds((prev) => {
      const newSet = new Set(prev);  // Create new Set to avoid mutating state
      
      if (newSet.has(product.id)) {
        // Product is favorited: remove it
        newSet.delete(product.id);
      } else {
        // Product not favorited: add it
        newSet.add(product.id);
      }
      
      return newSet;
    });
  };

  /**
   * OPEN FAVORITES PAGE
   * Navigates to favorites page
   */
  const handleFavoritesClick = () => {
    setCurrentView('favorites');
  };

  /**
   * REMOVE FROM FAVORITES
   * Removes a product ID from favorites Set
   */
  const handleRemoveFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  /**
   * BUY NOW HANDLER
   * Combines add to cart + go to checkout
   * Used by "BUY NOW" button in product modal
   */
  const handleBuyNow = (product: Product) => {
    // Step 1: Add product to cart (same logic as handleAddToCart)
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    
    // Step 2: Go directly to checkout (skip cart sidebar)
    setCurrentView('checkout');
  };

  // ============================================
  // COMPUTED VALUES
  // ============================================
  
  // Get full Product objects for all favorited IDs
  const favoriteProducts = products.filter((product) => favoriteIds.has(product.id));

  // Calculate cart totals
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Shipping calculation: Free if over 200 EGP, otherwise 15 EGP
  const shipping = cartTotal > 0 ? (cartTotal > 200 ? 0 : 15) : 0;
  
  // Grand total = cart + shipping
  const total = cartTotal + shipping;

  // ============================================
  // ORDER SUCCESS SCREEN
  // Shows after checkout completion, before returning to home
  // ============================================
  if (orderComplete) {
    return (
      <div className="size-full flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          
          {/* Success Icon Circle */}
          {/* Size: w-20 h-20 (80px x 80px) */}
          {/* Background: Black */}
          {/* Margin bottom: mb-6 (24px) */}
          <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
            {/* Checkmark SVG Icon */}
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          {/* Success Message */}
          {/* Title font: text-3xl (30px), font-light (300) */}
          <h2 className="text-3xl font-light mb-4">ORDER CONFIRMED</h2>
          <p className="text-gray-600 mb-2">
            Thank you for your purchase! We'll send you a confirmation email shortly.
          </p>
          
          {/* Redirect Message */}
          {/* Small gray text */}
          <p className="text-sm text-gray-500">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // MAIN APPLICATION LAYOUT
  // ============================================
  return (
    <div className="size-full flex flex-col">
      
      {/* ============================================ */}
      {/* HEADER - Hidden on checkout page */}
      {/* ============================================ */}
      {currentView !== 'checkout' && (
        <Header
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}  // Total items in cart
          onCartClick={() => setIsCartOpen(true)}
          onCategoryClick={handleCategoryClick}
          currentView={currentView}
          onViewChange={handleViewChange}
          onSearch={handleSearch}
          onFavoritesClick={handleFavoritesClick}
          favoritesCount={favoriteIds.size}  // Number of favorited items
        />
      )}

      {/* ============================================ */}
      {/* MAIN CONTENT AREA */}
      {/* Takes up remaining space (flex-1) */}
      {/* ============================================ */}
      <main className="flex-1">
        
        {/* HOME PAGE - Hero + Category Grid */}
        {currentView === 'home' && (
          <>
            <Hero 
              onShopClick={() => setCurrentView('shop')} 
              onSellClick={() => setCurrentView('sell')}
            />
            <CategoryGrid onCategoryClick={handleCategoryClick} />
          </>
        )}

        {/* SHOP PAGE - Product Grid */}
        {currentView === 'shop' && (
          <ShopPage
            selectedCategory={selectedCategory}
            onAddToCart={handleAddToCart}
            searchQuery={searchQuery}
            onToggleFavorite={handleToggleFavorite}
            favoriteIds={favoriteIds}
            onBuyNow={handleBuyNow}
          />
        )}

        {/* FAVORITES PAGE */}
        {currentView === 'favorites' && (
          <FavoritesPage
            favorites={favoriteProducts}
            onRemoveFavorite={handleRemoveFavorite}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            favoriteIds={favoriteIds}
            onBuyNow={handleBuyNow}
          />
        )}

        {/* SELL PAGE - Pickup Form */}
        {currentView === 'sell' && <SellPage />}

        {/* CHECKOUT PAGE */}
        {currentView === 'checkout' && (
          <CheckoutPage 
            total={total} 
            onComplete={handleOrderComplete}
            onBack={() => {
              setCurrentView('shop');
              setIsCartOpen(true);
            }}
          />
        )}
      </main>

      {/* ============================================ */}
      {/* FOOTER - Hidden on checkout page */}
      {/* ============================================ */}
      {currentView !== 'checkout' && <Footer />}

      {/* ============================================ */}
      {/* CART SIDEBAR */}
      {/* Overlay that slides in from right */}
      {/* Always rendered, visibility controlled by isCartOpen */}
      {/* ============================================ */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
