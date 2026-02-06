import { ImageWithFallback } from '@/app/components/ui/ImageWithFallback';

interface CategoryGridProps {
  onCategoryClick: (category: string) => void;
}

export function CategoryGrid({ onCategoryClick }: CategoryGridProps) {
  const categories = [
    {
      name: 'Women',
      image: '/categories/women.jpg',
    },
    {
      name: 'Kids',
      image: '/categories/kids.jpg',
    },
    {
      name: 'Designer',
      image: '/categories/designer.jpg',
    },
  ];

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-center mb-8 tracking-wide">
          SHOP BY CATEGORY
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryClick(category.name)}
              className="group relative h-96 overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity"
            >
              <ImageWithFallback
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-3xl md:text-4xl font-medium tracking-widest drop-shadow-lg">
                  {category.name.toUpperCase()}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
