// ============================================
// HEADER COMPONENT
// ============================================
// Main navigation header that appears at the top of every page
// Includes: Logo, Search Bar, Cart/Favorites icons, Navigation menu

import { ShoppingBag, Search, Menu, X, Heart, Moon, Sun, Globe, User } from 'lucide-react';
import { useState } from 'react';
import { Language } from '@/app/translations';
import { MegaMenu } from '@/app/components/MegaMenu';

// Props (data passed to this component from App.tsx)
interface HeaderProps {
  cartCount: number;              // Number of items in shopping cart
  onCartClick: () => void;        // Function to open cart sidebar
  onCategoryClick: (category: string) => void;  // Function to filter by category
  currentView: string;            // Current page user is on
  onViewChange: (view: 'home' | 'shop' | 'sell' | 'checkout' | 'favorites') => void;  // Function to change pages
  onSearch?: (query: string) => void;    // Function to handle search
  favoritesCount: number;         // Number of favorited items
  onFavoritesClick: () => void;   // Function to open favorites page
  isDarkMode: boolean;            // Whether dark mode is enabled
  onToggleDarkMode: () => void;   // Function to toggle dark mode
  language: Language;             // Current language
  onToggleLanguage: () => void;   // Function to toggle language
  t: any;                         // Translations object
  onLoginClick?: () => void;      // Function to open login modal
}

export function Header({ cartCount, onCartClick, onCategoryClick, currentView: _currentView, onViewChange, onSearch, favoritesCount, onFavoritesClick, isDarkMode, onToggleDarkMode, language: _language, onToggleLanguage, t, onLoginClick }: HeaderProps) {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // Mobile menu open/closed
  const [searchQuery, setSearchQuery] = useState('');   // Search input value
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null); // Which mega menu is open

  // Category buttons in navigation - using translations
  const categories = [
    { key: 'Women', label: t.women },
    { key: 'Kids', label: t.kids },
    { key: 'Designer', label: t.designer },
    { key: 'More', label: t.more }
  ];

  // ============================================
  // SEARCH HANDLER
  // ============================================
  // When user submits search form (clicks SEARCH or presses Enter)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
      onViewChange('shop');  // Navigate to shop page with search results
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-black/10 dark:border-white/10">
      {/* ============================================ */}
      {/* TOP BAR - Logo, Search, Cart/Favorites icons */}
      {/* ============================================ */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        
        {/* MOBILE MENU BUTTON (hamburger icon) - Only shows on mobile */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* ============================================ */}
        {/* LOGO "MY CERCLE" */}
        {/* Font: text-xl (20px mobile) / text-3xl (30px desktop) */}
        {/* Weight: font-light (300) */}
        {/* Spacing: tracking-wider (extra letter spacing) */}
        {/* ============================================ */}
        <h1 
          className="text-xl md:text-3xl font-light tracking-wider cursor-pointer whitespace-nowrap"
          onClick={() => onViewChange('home')}
        >
          MY CERCLE
        </h1>

        {/* ============================================ */}
        {/* DESKTOP SEARCH BAR */}
        {/* Hidden on mobile (hidden md:flex) */}
        {/* Max width: 640px (max-w-xl) */}
        {/* Takes remaining space (flex-1) */}
        {/* ============================================ */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
          {/* Search Input Field */}
          {/* Padding: px-4 py-2 (16px horizontal, 8px vertical) */}
          {/* Font: text-sm (14px) */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search}
            className="flex-1 border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white bg-white dark:bg-gray-800 dark:text-white"
          />
          
          {/* Search Submit Button */}
          {/* Background: black (bg-black) */}
          {/* Padding: px-6 py-2 (24px horizontal, 8px vertical) */}
          {/* Font: text-sm (14px) */}
          {/* Icon size: 16px */}
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors text-sm flex items-center gap-2"
          >
            <Search size={16} />
            <span className="hidden lg:inline">{t.searchButton}</span>
          </button>
        </form>

        {/* ============================================ */}
        {/* LOGIN, LANGUAGE, DARK MODE, FAVORITES & CART ICONS */}
        {/* Icons size: 20px */}
        {/* Badge size: w-5 h-5 (20px x 20px) */}
        {/* Badge font: text-xs (12px) */}
        {/* ============================================ */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {/* LOGIN BUTTON */}
          <button 
            className="flex items-center gap-1 hover:opacity-70 transition-opacity"
            onClick={onLoginClick}
            title="Login"
          >
            <User size={20} />
            <span className="text-sm hidden md:inline">Login</span>
          </button>
          
          {/* LANGUAGE TOGGLE BUTTON */}
          <button 
            className="flex items-center gap-1 hover:opacity-70 transition-opacity"
            onClick={onToggleLanguage}
            title="Change Language"
          >
            <Globe size={20} />
            <span className="text-sm hidden md:inline">{_language === 'en' ? 'EN' : 'AR'}</span>
          </button>
          
          {/* DARK MODE TOGGLE BUTTON */}
          <button 
            className="relative hover:opacity-70 transition-opacity"
            onClick={onToggleDarkMode}
            title={isDarkMode ? t.lightMode : t.darkMode}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* FAVORITES BUTTON (Heart icon) */}
          <button 
            className="relative hover:opacity-70 transition-opacity"
            onClick={onFavoritesClick}
            title={t.favorites}
          >
            <Heart size={20} />
            {/* Counter badge - shows number of favorited items */}
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>
          
          {/* SHOPPING CART BUTTON (Bag icon) */}
          <button 
            className="relative hover:opacity-70 transition-opacity"
            onClick={onCartClick}
            title={t.cart}
          >
            <ShoppingBag size={20} />
            {/* Counter badge - shows number of items in cart */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ============================================ */}
      {/* MOBILE SEARCH BAR */}
      {/* Only shows on mobile screens */}
      {/* Appears below the top bar */}
      {/* ============================================ */}
      <div className="md:hidden border-t border-black/10 dark:border-white/10">
        <div className="container mx-auto px-4 py-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            {/* Mobile Search Input - smaller padding than desktop */}
            {/* Padding: px-3 py-2 (12px horizontal, 8px vertical) */}
            {/* Font: text-sm (14px) */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchMobile}
              className="flex-1 border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white bg-white dark:bg-gray-800 dark:text-white"
            />
            
            {/* Mobile Search Button - icon only, no text */}
            {/* Padding: px-4 py-2 (16px horizontal, 8px vertical) */}
            {/* Icon size: 16px */}
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors"
            >
              <Search size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* ============================================ */}
      {/* NAVIGATION MENU */}
      {/* Mobile: Shows/hides based on hamburger menu */}
      {/* Desktop: Always visible */}
      {/* ============================================ */}
      <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block border-t border-black/10 dark:border-white/10`}>
        <div className="container mx-auto px-4">
          
          {/* Navigation Links */}
          {/* Mobile: Vertical list (flex-col) */}
          {/* Desktop: Horizontal list (flex-row), centered */}
          {/* Gap: 0 on mobile, 32px (gap-8) on desktop */}
          {/* Padding: 0 on mobile, py-3 (12px vertical) on desktop */}
          <ul className="flex flex-col md:flex-row md:justify-center md:items-center gap-0 md:gap-8 py-0 md:py-3">
            
            {/* SHOP BUTTON */}
            <li>
              <button
                onClick={() => onViewChange('shop')}
                className="block w-full md:w-auto text-left md:text-center py-3 md:py-0 hover:opacity-70 transition-opacity border-b md:border-b-0 border-black/5"
              >
                {t.shop}
              </button>
            </li>
            
            {/* CATEGORY BUTTONS (Women, Kids, Designer, More) */}
            {categories.map((category) => (
              <li key={category.key}>
                <button
                  onClick={() => {
                    onViewChange('shop');
                    onCategoryClick(category.key);
                    setIsMenuOpen(false);  // Close mobile menu after click
                  }}
                  className="block w-full md:w-auto text-left md:text-center py-3 md:py-0 hover:opacity-70 transition-opacity border-b md:border-b-0 border-black/5"
                >
                  {category.label}
                </button>
              </li>
            ))}
            
            {/* SELL YOUR CLOTHES BUTTON */}
            {/* Font weight: font-medium (500) - slightly bolder */}
            <li>
              <button
                onClick={() => {
                  onViewChange('sell');
                  setIsMenuOpen(false);  // Close mobile menu after click
                }}
                className="block w-full md:w-auto text-left md:text-center py-3 md:py-0 font-medium hover:opacity-70 transition-opacity"
              >
                {t.sellYourClothes}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
