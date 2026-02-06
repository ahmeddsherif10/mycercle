import { Heart } from 'lucide-react';
import { Product } from '@/app/data/products';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { useState } from 'react';

interface FavoritesPageProps {
  favorites: Product[];
  onRemoveFavorite: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  favoriteIds: Set<string>;
  onBuyNow?: (product: Product) => void;
}

export function FavoritesPage({ 
  favorites, 
  onRemoveFavorite, 
  onAddToCart,
  onToggleFavorite,
  favoriteIds,
  onBuyNow 
}: FavoritesPageProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <Heart size={80} className="text-gray-300 mb-6" />
        <h2 className="text-2xl md:text-3xl font-light mb-4">Your Favorites</h2>
        <p className="text-gray-600 text-center max-w-md">
          You haven't added any items to your favorites yet. 
          Browse our collection and click the heart icon to save items you love.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-light mb-2">Your Favorites</h1>
        <p className="text-gray-600">{favorites.length} {favorites.length === 1 ? 'item' : 'items'}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {favorites.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favoriteIds.has(product.id)}
            onProductClick={setSelectedProduct}
          />
        ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favoriteIds.has(selectedProduct.id)}
          onBuyNow={onBuyNow}
        />
      )}
    </div>
  );
}
