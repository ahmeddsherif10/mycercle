import { Search, Heart, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFavoritesClick: () => void;
  onCartClick: () => void;
  cartCount: number;
  favoritesCount: number;
}

export function SearchBar({ 
  onSearch, 
  onFavoritesClick, 
  onCartClick, 
  cartCount,
  favoritesCount 
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // Real-time search
  };

  return (
    <div className="border-b border-black/10 bg-white">
      <div className="container mx-auto px-4 py-2">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex-1 flex items-center border border-gray-300 rounded overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Search for brands, items, categories..."
              value={searchQuery}
              onChange={handleInputChange}
              className="flex-1 px-3 py-1.5 text-sm outline-none bg-white"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-1.5 font-medium hover:bg-gray-800 transition-colors flex items-center gap-1.5 text-sm"
            >
              <Search size={16} />
              <span className="hidden sm:inline">SEARCH</span>
            </button>
          </div>

          {/* Favorites Icon */}
          <button
            type="button"
            onClick={onFavoritesClick}
            className="relative p-1 hover:opacity-70 transition-opacity"
            aria-label="Favorites"
          >
            <Heart size={20} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Icon */}
          <button
            type="button"
            onClick={onCartClick}
            className="relative p-1 hover:opacity-70 transition-opacity"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                {cartCount}
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
