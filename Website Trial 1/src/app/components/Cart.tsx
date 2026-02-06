// ============================================
// CART SIDEBAR COMPONENT
// ============================================
// Sliding sidebar that shows shopping cart contents
// Features: Item list, quantity controls, price calculation, checkout button
// Slides in from right side of screen, darkened overlay behind it

import { X, Minus, Plus } from 'lucide-react';
import { Product } from '@/app/data/products';
import { ImageWithFallback } from '@/app/components/ui/ImageWithFallback';

// CartItem extends Product to add quantity
interface CartItem extends Product {
  quantity: number;
}

// Props (data passed from App.tsx)
interface CartProps {
  isOpen: boolean;                                  // Whether cart sidebar is visible
  onClose: () => void;                              // Function to close cart
  items: CartItem[];                                // Array of products in cart
  onUpdateQuantity: (id: string, quantity: number) => void;  // Function to change item quantity
  onRemoveItem: (id: string) => void;              // Function to remove item from cart
  onCheckout: () => void;                           // Function to go to checkout page
}

export function Cart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartProps) {
  // ============================================
  // PRICE CALCULATIONS
  // ============================================
  
  // Subtotal: Sum of all items (price × quantity)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Shipping: 15 EGP if subtotal > 0 and < 200, otherwise FREE
  const shipping = subtotal > 0 ? (subtotal > 200 ? 0 : 15) : 0;
  
  // Total: Subtotal + Shipping
  const total = subtotal + shipping;

  // Don't render anything if cart is closed
  if (!isOpen) return null;

  return (
    <>
      {/* ============================================ */}
      {/* DARK OVERLAY BACKGROUND */}
      {/* Covers entire screen */}
      {/* Position: fixed (stays in place when scrolling) */}
      {/* z-index: 50 (appears above page content) */}
      {/* Background: Semi-transparent black (bg-black/50 = 50% opacity) */}
      {/* Clicking overlay closes cart */}
      {/* ============================================ */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* ============================================ */}
      {/* CART SIDEBAR */}
      {/* Position: Fixed to right side of screen */}
      {/* Width: Full width on mobile, 450px on desktop (md:w-[450px]) */}
      {/* Height: Full screen (h-full) */}
      {/* z-index: 50 (same as overlay, appears above it due to order) */}
      {/* Layout: Flexbox column (header, scrollable items, footer) */}
      {/* ============================================ */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-white z-50 shadow-2xl flex flex-col">
        
        {/* ============================================ */}
        {/* CART HEADER */}
        {/* Shows: Title with item count, close button */}
        {/* Padding: p-6 (24px all sides) */}
        {/* Border: Bottom border */}
        {/* ============================================ */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          
          {/* Title with item count */}
          {/* Font: text-xl (20px), font-light (300) */}
          {/* Spacing: tracking-wide (extra letter spacing) */}
          <h2 className="text-xl font-light tracking-wide">
            SHOPPING BAG ({items.length})
          </h2>
          
          {/* Close Button (X icon) */}
          {/* Icon size: 24px */}
          {/* Hover: Slight fade (opacity-70) */}
          <button
            onClick={onClose}
            className="hover:opacity-70 transition-opacity"
          >
            <X size={24} />
          </button>
        </div>

        {/* ============================================ */}
        {/* CART ITEMS SECTION */}
        {/* Scrollable area (overflow-y-auto) */}
        {/* Takes remaining space (flex-1) */}
        {/* Padding: p-6 (24px all sides) */}
        {/* ============================================ */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* EMPTY CART STATE */}
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-4">Your bag is empty</p>
              <button
                onClick={onClose}
                className="text-sm underline hover:no-underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            
            /* CART ITEMS LIST */
            /* Spacing: space-y-6 (24px vertical gap between items) */
            <div className="space-y-6">
              {items.map((item) => (
                
                // ============================================
                // INDIVIDUAL CART ITEM
                // Layout: Product image on left, details on right
                // Gap: gap-4 (16px between image and details)
                // ============================================
                <div key={item.id} className="flex gap-4">
                  
                  {/* PRODUCT IMAGE */}
                  {/* Size: w-24 h-32 (96px × 128px) */}
                  {/* Doesn't shrink (flex-shrink-0) */}
                  <div className="w-24 h-32 bg-gray-100 flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* PRODUCT DETAILS */}
                  {/* Takes remaining space (flex-1) */}
                  <div className="flex-1">
                    
                    {/* TOP ROW: Product info and remove button */}
                    <div className="flex justify-between mb-1">
                      
                      {/* Product Information */}
                      <div>
                        {/* Brand Name */}
                        {/* Font: text-xs (12px), uppercase */}
                        {/* Color: text-gray-600 (medium gray) */}
                        <p className="text-xs text-gray-600 uppercase mb-1">
                          {item.brand}
                        </p>
                        
                        {/* Product Name */}
                        {/* Font: text-sm (14px) */}
                        <p className="text-sm mb-1">{item.name}</p>
                        
                        {/* Size */}
                        {/* Font: text-xs (12px) */}
                        <p className="text-xs text-gray-600">Size {item.size}</p>
                      </div>
                      
                      {/* REMOVE BUTTON (X icon) */}
                      {/* Icon size: 18px */}
                      {/* Color: Gray, turns black on hover */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-black"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* ============================================ */}
                    {/* BOTTOM ROW: Quantity controls and price */}
                    {/* Margin top: mt-3 (12px) */}
                    {/* ============================================ */}
                    <div className="flex items-center justify-between mt-3">
                      
                      {/* QUANTITY CONTROLS */}
                      {/* Three buttons: Minus, Quantity Display, Plus */}
                      {/* Border: 1px gray border around all three */}
                      <div className="flex items-center border border-gray-300">
                        
                        {/* MINUS BUTTON (decrease quantity) */}
                        {/* Padding: px-3 py-1 (12px horizontal, 4px vertical) */}
                        {/* Icon size: 14px */}
                        {/* Min quantity is 1 (Math.max prevents going below 1) */}
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>
                        
                        {/* QUANTITY DISPLAY */}
                        {/* Shows current quantity number */}
                        {/* Padding: px-3 py-1 (12px horizontal, 4px vertical) */}
                        {/* Font: text-sm (14px) */}
                        {/* Border: Left and right borders */}
                        <span className="px-3 py-1 border-x border-gray-300 text-sm">
                          {item.quantity}
                        </span>
                        
                        {/* PLUS BUTTON (increase quantity) */}
                        {/* Padding: px-3 py-1 (12px horizontal, 4px vertical) */}
                        {/* Icon size: 14px */}
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      {/* ITEM TOTAL PRICE */}
                      {/* Shows: price × quantity */}
                      {/* Font weight: font-medium (500) */}
                      {/* Currency "EGP": text-xs (12px) - smaller than price */}
                      <p className="font-medium">
                        <span className="text-xs">EGP</span> {Math.round(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ============================================ */}
        {/* CART FOOTER (only shows when cart has items) */}
        {/* Shows: Price breakdown, checkout button */}
        {/* Border: Top border */}
        {/* Padding: p-6 (24px all sides) */}
        {/* Spacing: space-y-4 (16px vertical gap) */}
        {/* ============================================ */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            
            {/* PRICE BREAKDOWN */}
            {/* Spacing: space-y-2 (8px vertical gap) */}
            {/* Font: text-sm (14px) */}
            <div className="space-y-2 text-sm">
              
              {/* SUBTOTAL ROW */}
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>
                  <span className="text-xs">EGP</span> {Math.round(subtotal)}
                </span>
              </div>
              
              {/* SHIPPING ROW */}
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                {/* Shows "FREE" if shipping is 0, otherwise shows price */}
                <span>{shipping === 0 ? 'FREE' : <><span className="text-xs">EGP</span> {Math.round(shipping)}</>}</span>
              </div>
              
              {/* FREE SHIPPING NOTICE (only shows if subtotal < 200) */}
              {/* Font: text-xs (12px) */}
              {/* Color: text-gray-500 (light gray) */}
              {subtotal < 200 && subtotal > 0 && (
                <p className="text-xs text-gray-500">
                  Free shipping on orders over EGP 200
                </p>
              )}
              
              {/* TOTAL ROW */}
              {/* Border: Top border (border-t) */}
              {/* Padding top: pt-2 (8px) */}
              {/* Font weight: font-medium (500 - slightly bolder) */}
              <div className="flex justify-between pt-2 border-t border-gray-200 font-medium">
                <span>Total</span>
                <span>
                  <span className="text-xs">EGP</span> {Math.round(total)}
                </span>
              </div>
            </div>

            {/* ============================================ */}
            {/* CHECKOUT BUTTON */}
            {/* Full width (w-full) */}
            {/* Background: Black (bg-black) */}
            {/* Padding: py-4 (16px vertical) */}
            {/* Hover: Slightly lighter gray background */}
            {/* Clicking goes to checkout page */}
            {/* ============================================ */}
            <button
              onClick={onCheckout}
              className="w-full bg-black text-white py-4 hover:bg-gray-800 transition-colors"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
}
