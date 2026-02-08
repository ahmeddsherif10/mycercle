import { ImageWithFallback } from '@/app/components/ui/ImageWithFallback';

interface CategoryGridProps {
  onCategoryClick: (category: string) => void;
  t: any; // Translations object
}

export function CategoryGrid({ onCategoryClick, t }: CategoryGridProps) {
  const categories = [
    {
      key: 'Women',
      name: t.women,
      image: '/categories/women.jpg',
    },
    {
      key: 'Kids',
      name: t.kids,
      image: '/categories/kids.jpg',
    },
    {
      key: 'Designer',
      name: t.designer,
      image: '/categories/designer.jpg',
    },
  ];

  return (
    <section className="py-6 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-6 tracking-wide">
          {t.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => onCategoryClick(category.key)}
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
                  {category.name}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
