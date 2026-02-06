import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/app/data/products';
import { ImageWithFallback } from '@/app/components/ui/ImageWithFallback';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  isFavorite: boolean;
  onBuyNow?: (product: Product) => void;
}

// Additional images for the gallery - in a real app, this would come from the product data
const getProductImages = (product: Product): string[] => {
  return [
    product.image,
    // Add more variant images based on product
    'https://images.unsplash.com/photo-1759090988109-2ed7abd1eefc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYmxhY2slMjBkcmVzcyUyMGZhc2hpb24lMjBtb2RlbHxlbnwxfHx8fDE3NzAzMzI4ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1644860588182-0998b4ef5587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGJsb3VzZSUyMHNoaXJ0JTIwZWxlZ2FudCUyMHN0dWRpb3xlbnwxfHx8fDE3NzAzMzI4ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  ];
};

const getProductDescription = (product: Product): string => {
  return `This beautiful ${product.name.toLowerCase()} from ${product.brand} is a perfect addition to your wardrobe. 
  
Features:
• Premium quality materials
• Excellent craftsmanship
• Gently used in ${product.condition.toLowerCase()} condition
• Authentic ${product.brand} product
• Size: ${product.size}

This pre-loved item has been carefully inspected to ensure it meets our quality standards. By purchasing second-hand, you're making a sustainable fashion choice while saving ${product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : '0'}% off the original retail price.

All sales are final. Please review the measurements and condition carefully before purchasing.`;
};

export function ProductModal({ product, isOpen, onClose, onAddToCart, onToggleFavorite, isFavorite, onBuyNow }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = getProductImages(product);
  const description = getProductDescription(product);

  if (!isOpen) return null;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(product);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto relative rounded-lg shadow-2xl border-2 border-gray-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-md"
        >
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-gray-100">
              <ImageWithFallback
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square bg-gray-100 overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-black' : 'border-transparent'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="flex-1">
              {/* Brand & Name */}
              <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
              <h2 className="text-2xl md:text-3xl font-light mb-4">{product.name}</h2>

              {/* Pricing */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-light">
                  <span className="text-lg">EGP</span> {Math.round(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      <span className="text-sm">EGP</span> {Math.round(product.originalPrice)}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 text-sm">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">{product.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Condition:</span>
                  <span className="font-medium">{product.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">DESCRIPTION</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t">
              <button
                onClick={handleAddToCart}
                className="w-full bg-white text-black border-2 border-black py-3 px-6 hover:bg-gray-50 transition-colors font-medium"
              >
                ADD TO CART
              </button>
              {onBuyNow && (
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-black text-white py-3 px-6 hover:bg-gray-800 transition-colors font-medium"
                >
                  BUY NOW
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
