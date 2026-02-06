// ============================================
// PRODUCT CARD COMPONENT
// ============================================
// Individual product display card shown in shop grid
// Shows: Product image, brand, name, price, discount badge, favorite button
// Features: Hover effects, click to view details, add to bag button

import { ImageWithFallback } from '@/app/components/ui/ImageWithFallback';
import { Product } from '@/app/data/products';
import { Heart } from 'lucide-react';

// Props (data passed to this component from parent)
interface ProductCardProps {
  product: Product;                              // Product data (name, price, image, etc.)
  onAddToCart: (product: Product) => void;       // Function to add product to cart
  onToggleFavorite?: (product: Product) => void; // Function to add/remove from favorites
  isFavorite?: boolean;                          // Whether product is favorited
  onProductClick?: (product: Product) => void;   // Function to open product detail modal
  t: any;                                        // Translations object
}

export function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleFavorite, 
  isFavorite = false,
  onProductClick,
  t
}: ProductCardProps) {

  return (
    // ============================================
    // CARD CONTAINER
    // Uses "group" class for hover effects on children
    // ============================================
    <div className="group">
      
      {/* ============================================ */}
      {/* PRODUCT IMAGE CONTAINER */}
      {/* Aspect ratio: 3:4 (portrait, like 300x400px) */}
      {/* Background: bg-gray-100 (light gray placeholder) */}
      {/* Margin bottom: mb-3 (12px) */}
      {/* Cursor: pointer (shows hand cursor on hover) */}
      {/* Clicking opens product detail modal */}
      {/* ============================================ */}
      <div 
        className="relative aspect-[3/4] bg-gray-100 mb-3 overflow-hidden cursor-pointer"
        onClick={() => onProductClick?.(product)}
      >
        
        {/* PRODUCT IMAGE */}
        {/* Zoom effect on hover: group-hover:scale-105 (zooms to 105%) */}
        {/* Transition: duration-500 (smooth 0.5s animation) */}
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* ============================================ */}
        {/* FAVORITE BUTTON (Heart icon) */}
        {/* Position: Top right corner (top-3 right-3 = 12px from edges) */}
        {/* Size: w-9 h-9 (36px x 36px) */}
        {/* Background: Semi-transparent white (bg-white/90) */}
        {/* Icon size: 18px */}
        {/* Filled red if favorited, outline if not */}
        {/* ============================================ */}
        <button
          onClick={(e) => {
            e.stopPropagation();  // Prevents opening modal when clicking heart
            onToggleFavorite?.(product);
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart
            size={18}
            className={isFavorite ? 'fill-red-500 text-red-500' : ''}
          />
        </button>

        {/* ============================================ */}
        {/* DISCOUNT BADGE (Only shows if product has originalPrice) */}
        {/* Position: Top left corner (top-3 left-3 = 12px from edges) */}
        {/* Background: Black (bg-black) */}
        {/* Text color: White */}
        {/* Padding: px-3 py-1 (12px horizontal, 4px vertical) */}
        {/* Font: text-xs (12px) */}
        {/* Shows percentage saved */}
        {/* ============================================ */}
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 text-xs">
            {t.save || 'SAVE'} {Math.round((1 - product.price / product.originalPrice) * 100)}%
          </div>
        )}
        
        {/* ============================================ */}
        {/* "ADD TO BAG" BUTTON */}
        {/* Position: Bottom of image, full width */}
        {/* Padding: py-3 (12px vertical) */}
        {/* Visibility: Hidden by default (opacity-0) */}
        {/* Shows on hover: group-hover:opacity-100 */}
        {/* Transition: duration-300 (smooth 0.3s fade-in) */}
        {/* Hover effect: Changes to black background with white text */}
        {/* ============================================ */}
        <button
          onClick={(e) => {
            e.stopPropagation();  // Prevents opening modal when clicking button
            onAddToCart(product);
          }}
          className="absolute bottom-0 left-0 right-0 bg-white text-black py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black hover:text-white"
        >
          {t.addToCart}
        </button>
      </div>

      {/* ============================================ */}
      {/* PRODUCT INFORMATION SECTION */}
      {/* Spacing: space-y-1 (4px vertical spacing between items) */}
      {/* ============================================ */}
      <div className="space-y-1">
        
        {/* BRAND NAME */}
        {/* Font: text-xs (12px), uppercase */}
        {/* Color: text-gray-600 (medium gray) */}
        <p className="text-xs text-gray-600 uppercase">{product.brand}</p>
        
        {/* PRODUCT NAME */}
        {/* Font: text-sm (14px) */}
        <h3 className="text-sm">{product.name}</h3>
        
        {/* ============================================ */}
        {/* PRICING SECTION */}
        {/* Shows current price and original price (if on sale) */}
        {/* ============================================ */}
        <div className="flex items-center gap-2">
          
          {/* CURRENT PRICE */}
          {/* Font weight: font-medium (500 - medium bold) */}
          {/* Currency "EGP": text-xs (12px) - 40% smaller than price number */}
          {/* Math.round removes decimals */}
          <p className="font-medium">
            <span className="text-xs">{t.currency}</span> {Math.round(product.price)}
          </p>
          
          {/* ORIGINAL PRICE (strikethrough) - Only shows if product is on sale */}
          {/* Font: text-sm (14px) */}
          {/* Color: text-gray-400 (light gray) */}
          {/* Style: line-through (strikethrough effect) */}
          {/* Currency "EGP": text-[10px] (10px) - even smaller for strikethrough */}
          {product.originalPrice && (
            <p className="text-sm text-gray-400 line-through">
              <span className="text-[10px]">{t.currency}</span> {Math.round(product.originalPrice)}
            </p>
          )}
        </div>
        
        {/* SIZE AND CONDITION */}
        {/* Font: text-xs (12px) */}
        {/* Color: text-gray-600 (medium gray) */}
        {/* Separator: bullet point (•) */}
        <p className="text-xs text-gray-600">Size {product.size} • {product.condition}</p>
      </div>
    </div>
  );
}
