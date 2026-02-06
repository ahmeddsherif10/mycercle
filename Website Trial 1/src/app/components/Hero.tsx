import { ImageWithFallback } from '@/app/components/ui/ImageWithFallback';

interface HeroProps {
  onShopClick: () => void;
  onSellClick: () => void;
  t: any; // Translations object
}

export function Hero({ onShopClick, onSellClick, t }: HeroProps) {
  return (
    <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      <div className="relative h-[50vh] md:h-[60vh] bg-black text-white overflow-hidden">
        {/* Scrolling container with duplicated images */}
        <div className="absolute inset-0 flex animate-scroll-infinite">
          <ImageWithFallback
            src="/carousel/carousel-1.png"
            alt="My Cercle Banner"
            className="h-full w-auto flex-shrink-0 opacity-80"
            style={{ imageRendering: 'high-quality' }}
          />
          <ImageWithFallback
            src="/carousel/carousel-1.png"
            alt="My Cercle Banner"
            className="h-full w-auto flex-shrink-0 opacity-80"
            style={{ imageRendering: 'high-quality' }}
          />
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 max-w-2xl">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onSellClick}
              className="bg-white text-black px-8 py-3 hover:bg-gray-100 transition-all duration-300"
            >
              {t.sellButton}
            </button>
            <button
              onClick={onShopClick}
              className="bg-black text-white px-8 py-3 border border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              {t.shopNow}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollInfinite {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-infinite {
          animation: scrollInfinite 40s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}