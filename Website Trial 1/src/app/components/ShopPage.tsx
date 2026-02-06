// ============================================
// SHOP PAGE COMPONENT
// ============================================
// Main shopping page that displays product grid
// Features: Category filtering, search filtering, product modal
// Shows all products or filters by category/search query

import { Product, products } from '@/app/data/products';
import { ProductCard } from '@/app/components/ProductCard';
import { ProductModal } from '@/app/components/ProductModal';
import { Filter } from 'lucide-react';
import { useState } from 'react';

// Props (data passed from App.tsx)
interface ShopPageProps {
  selectedCategory: string;                     // Current category filter ('All', 'Women', 'Kids', etc.)
  onAddToCart: (product: Product) => void;      // Function to add product to cart
  searchQuery?: string;                         // Search text from header search bar
  onToggleFavorite: (product: Product) => void; // Function to favorite/unfavorite product
  favoriteIds: Set<string>;                     // Set of favorited product IDs
  onBuyNow?: (product: Product) => void;        // Function for "Buy Now" button (add to cart + go to checkout)
}

export function ShopPage({ 
  selectedCategory, 
  onAddToCart, 
  searchQuery = '',
  onToggleFavorite,
  favoriteIds,
  onBuyNow 
}: ShopPageProps) {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  // Tracks which product modal is open (null = no modal open)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // ============================================
  // PRODUCT FILTERING LOGIC
  // ============================================
  
  // Step 1: Filter by category
  // If category is 'All', show all products
  // Otherwise, show only products in selected category
  let filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Step 2: Apply search filter (if search query exists)
  // Searches in: product name, brand name, category
  // Case-insensitive search (converts to lowercase)
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }

  return (
    // ============================================
    // PAGE CONTAINER
    // Min height: Full screen (min-h-screen)
    // Padding: py-8 (32px top and bottom)
    // ============================================
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        
        {/* ============================================ */}
        {/* PAGE HEADER SECTION */}
        {/* Shows: Category title, item count, filter button */}
        {/* ============================================ */}
        <div className="mb-8">
          
          {/* CATEGORY TITLE */}
          {/* Font: text-3xl (30px) on mobile, text-4xl (36px) on desktop */}
          {/* Weight: font-light (300) */}
          {/* Spacing: tracking-wide (extra letter spacing) */}
          {/* Margin bottom: mb-4 (16px) */}
          <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-4">
            {selectedCategory === 'All' ? 'ALL ITEMS' : selectedCategory.toUpperCase()}
          </h1>
          
          {/* ============================================ */}
          {/* ITEM COUNT AND FILTER BUTTON ROW */}
          {/* Layout: Item count on left, button on right */}
          {/* ============================================ */}
          <div className="flex items-center justify-between">
            
            {/* ITEM COUNT TEXT */}
            {/* Color: text-gray-600 (medium gray) */}
            {/* Shows number of products after filtering */}
            <p className="text-gray-600">{filteredProducts.length} items</p>
            
            {/* FILTER & SORT BUTTON */}
            {/* Border: 1px black solid */}
            {/* Padding: px-3 py-1.5 (12px horizontal, 6px vertical) */}
            {/* Font: text-sm (14px) */}
            {/* Icon size: 16px */}
            {/* Hover: Black background, white text */}
            {/* Note: Currently just visual, filtering logic not implemented */}
            <button className="flex items-center gap-2 border border-black px-3 py-1.5 text-sm hover:bg-black hover:text-white transition-colors">
              <Filter size={16} />
              <span>FILTER & SORT</span>
            </button>
          </div>
        </div>

        {/* ============================================ */}
        {/* PRODUCT GRID OR EMPTY STATE */}
        {/* ============================================ */}
        {filteredProducts.length > 0 ? (
          // ============================================
          // PRODUCT GRID (when products exist)
          // Columns: 2 on mobile, 3 on tablet (md), 4 on desktop (lg)
          // Gap: 24px (gap-6) on mobile, 32px (gap-8) on desktop
          // ============================================
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleFavorite={onToggleFavorite}
                isFavorite={favoriteIds.has(product.id)}  // Check if product is in favorites Set
                onProductClick={setSelectedProduct}        // Opens product modal
              />
            ))}
          </div>
        ) : (
          // ============================================
          // EMPTY STATE (when no products match filters)
          // Centered text with vertical padding
          // ============================================
          <div className="text-center py-16">
            <p className="text-gray-600">No items found in this category.</p>
          </div>
        )}
      </div>

      {/* ============================================ */}
      {/* PRODUCT DETAIL MODAL */}
      {/* Only renders when a product is selected */}
      {/* Shows: Product images, details, add to cart, buy now */}
      {/* ============================================ */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}              // Convert to boolean (true if product selected)
          onClose={() => setSelectedProduct(null)} // Close modal by setting to null
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favoriteIds.has(selectedProduct.id)}
          onBuyNow={onBuyNow}
        />
      )}
    </div>
  );
}
