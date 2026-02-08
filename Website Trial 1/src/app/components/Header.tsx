// ============================================
// HEADER COMPONENT
// ============================================
// Main navigation header that appears at the top of every page
// Includes: Logo, Search Bar, Cart/Favorites icons, Navigation menu

import { ShoppingBag, Search, Menu, X, Heart, Moon, Sun, Globe, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Language } from '@/app/translations';
import { CategoryMegaMenu } from '@/app/components/CategoryMegaMenu';

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
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null); // Which category mega menu is open
  const [isSearchExpanded, setIsSearchExpanded] = useState(false); // Search bar expanded state

  // Category buttons in navigation - using translations
  const categories = [
    { key: 'Women', label: t.header.women },
    { key: 'Kids', label: t.header.kids },
    { key: 'Designer', label: t.header.designer },
    { key: 'Edits', label: t.header.edits },
    { key: 'Vintage', label: t.header.vintage }
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
      setIsSearchExpanded(false); // Collapse search after submit
      setSearchQuery(''); // Clear search input
    }
  };

  // Handle search icon click
  const handleSearchIconClick = () => {
    setIsSearchExpanded(true);
  };

  // Handle clicking outside search to collapse
  const handleSearchBlur = () => {
    if (!searchQuery.trim()) {
      setIsSearchExpanded(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-black/10 dark:border-white/10">
      {/* ============================================ */}
      {/* TOP BAR - Logo, Search, Cart/Favorites icons */}
      {/* ============================================ */}
      <div className="w-full px-6 py-3 flex items-center gap-6">
        
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
        {/* Weight: font-bold (700) */}
        {/* Spacing: tracking-wider (extra letter spacing) */}
        {/* ============================================ */}
        <h1
          className="text-[32px] font-bold tracking-wider cursor-pointer whitespace-nowrap order-first"
          onClick={() => onViewChange('home')}
        >
          MYCERCLE
        </h1>

        {/* ============================================ */}
        {/* RIGHT SIDE CONTAINER - SEARCH BAR + ICONS */}
        {/* ============================================ */}
        <div className="flex items-center gap-4 ml-auto">
          {/* ============================================ */}
          {/* ANIMATED SEARCH */}
          {/* Hidden on mobile (hidden md:block) */}
          {/* ============================================ */}
          <div className="hidden md:block relative">
            {!isSearchExpanded ? (
              /* Search Icon - Collapsed State */
              <button
                onClick={handleSearchIconClick}
                className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200"
                title="Search"
              >
                <Search size={18} className="text-gray-600 dark:text-gray-400" />
              </button>
            ) : (
              /* Expanded Search Form */
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative animate-in slide-in-from-right-5 duration-1000 ease-out">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={handleSearchBlur}
                    placeholder="Search…"
                    autoFocus
                    className="w-80 pl-4 pr-12 py-2.5 bg-gray-50 dark:bg-gray-800 border-0 rounded-full text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all duration-1000 ease-out"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <Search size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ============================================ */}
          {/* LOGIN, LANGUAGE, DARK MODE, FAVORITES & CART ICONS */}
          {/* Icons size: 20px */}
          {/* Badge size: w-5 h-5 (20px x 20px) */}
          {/* Badge font: text-xs (12px) */}
          {/* ============================================ */}
          <div className="flex items-center gap-4 md:gap-5">
          
          {/* LOGIN BUTTON */}
          <button 
            className="flex items-center gap-1 hover:opacity-70 transition-opacity"
            onClick={onLoginClick}
            title="Login"
          >
            <User size={18} />
            <span className="text-xs hidden md:inline">Login</span>
          </button>
          
          {/* LANGUAGE TOGGLE BUTTON */}
          <button 
            className="flex items-center gap-1 hover:opacity-70 transition-opacity"
            onClick={onToggleLanguage}
            title="Change Language"
          >
            <Globe size={18} />
            <span className="text-xs hidden md:inline">{_language === 'en' ? 'EN' : 'AR'}</span>
          </button>
          
          {/* DARK MODE TOGGLE BUTTON */}
          <button 
            className="relative hover:opacity-70 transition-opacity"
            onClick={onToggleDarkMode}
            title={isDarkMode ? t.header.lightMode : t.header.darkMode}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          {/* FAVORITES BUTTON (Heart icon) */}
          <button 
            className="relative hover:opacity-70 transition-opacity"
            onClick={onFavoritesClick}
            title={t.header.favorites}
          >
            <Heart size={18} />
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
            title={t.header.cart}
          >
            <ShoppingBag size={18} />
            {/* Counter badge - shows number of items in cart */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          </div>
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
              placeholder={t.header.searchMobile}
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
      <nav
        className={`${isMenuOpen ? 'block' : 'hidden'} md:block border-t border-black/10 dark:border-white/10 relative`}
      >
        <div className="container mx-auto px-4">

          {/* Navigation Links */}
          {/* Mobile: Vertical list (flex-col) */}
          {/* Desktop: Horizontal list (flex-row), centered */}
          {/* Gap: 0 on mobile, 32px (gap-8) on desktop */}
          {/* Padding: 0 on mobile, py-3 (12px vertical) on desktop */}
          <ul className="flex flex-col md:flex-row md:justify-center md:items-center gap-0 md:gap-8 py-0 md:py-3">

            {/* CATEGORY BUTTONS (Women, Kids, Designer, More) with animated arrows */}
            {categories.map((category) => (
              <li 
                key={category.key}
                onMouseEnter={() => {
                  console.log('Setting active mega menu to:', category.key);
                  setActiveMegaMenu(category.key);
                }}
              >
                <button
                  onClick={() => {
                    onViewChange('shop');
                    onCategoryClick(category.key);
                    setIsMenuOpen(false);  // Close mobile menu after click
                  }}
                  className="flex items-center gap-1 w-full md:w-auto text-left md:text-center py-3 md:py-2 px-2 hover:opacity-70 transition-all duration-300 border-b md:border-b-0 border-black/5 relative group"
                >
                  {category.label}
                  {/* Chic underline animation - center expand */}
                  <span className={`absolute bottom-0 left-1/2 h-0.5 bg-black dark:bg-white transition-all duration-300 transform -translate-x-1/2 ${
                    activeMegaMenu === category.key ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
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
                onMouseEnter={() => setActiveMegaMenu(null)}
                className="block w-full md:w-auto text-left md:text-center py-3 md:py-0 font-medium hover:opacity-70 transition-opacity"
              >
                {t.header.sellYourClothes}
              </button>
            </li>
          </ul>
        </div>

        {/* CATEGORY MEGA MENUS - Individual mega menu for each category */}
        <div className="hidden md:block">
          {categories.map((category) => (
            <CategoryMegaMenu
              key={category.key}
              isOpen={activeMegaMenu === category.key}
              onClose={() => setActiveMegaMenu(null)}
              category={category.key}
              t={t}
              language={_language}
            />
          ))}
        </div>
      </nav>
    </header>
  );
}
