// ============================================
// MEGA MENU COMPONENT
// ============================================
// Hover-activated dropdown menu with glassmorphism effect
// Shows category breakdowns for WOMEN, KIDS, DESIGNER, EDITS, VINTAGE

interface MegaMenuProps {
  category: string;
  isOpen: boolean;
  onClose: () => void;
  t: any; // Translations
}

export function MegaMenu({ category, isOpen, onClose, t }: MegaMenuProps) {
  if (!isOpen) return null;

  // Menu content for each category
  const menuContent = {
    Women: {
      title: t?.women || 'WOMEN',
      columns: [
        {
          title: t?.clothing || 'CLOTHING',
          items: ['Tops', 'Pants', 'Dresses', 'Skirts', 'Jackets & Coats', 'Suits & Sets', 'Shorts']
        },
        {
          title: t?.accessories || 'ACCESSORIES',
          items: ['Jewelry', 'Belts', 'Scarves', 'Clutches', 'Bags', 'Shoes']
        }
      ]
    },
    Kids: {
      title: t?.kids || 'KIDS',
      columns: [
        {
          title: t?.girls || 'GIRLS',
          items: ['0-24m', '2T-5T', '6-12y', 'Tops', 'Pants', 'Dresses', 'Skirts', 'Jackets', 'Shorts', 'Swimwear', 'Activewear']
        },
        {
          title: t?.boys || 'BOYS',
          items: ['0-3m', '3-6m', '12-18m', '18-24m', '2T-5T', '6-12y', 'Tops', 'Pants', 'Denim', 'Jackets', 'Shorts', 'Swimwear', 'Activewear']
        },
        {
          title: t?.baby || 'BABY',
          items: ['Newborn', '0-24 months', 'Tops', 'Pants', 'Jackets', 'Rompers', 'Onesies', 'Toys']
        }
      ]
    },
    Designer: {
      title: t?.designer || 'DESIGNER',
      columns: [
        {
          title: t?.productType || 'PRODUCT TYPE',
          items: ['Handbags', 'Ready-to-Wear', 'Accessories', 'Belts', 'Scarves', 'Wallets']
        },
        {
          title: t?.brands || 'BROWSE BY BRAND',
          items: ['Louis Vuitton', 'Chanel', 'Gucci', 'Prada', 'Hermès', 'Dior', 'Fendi', 'Valentino']
        }
      ]
    },
    More: {
      title: t?.more || 'MORE',
      columns: [
        {
          title: t?.edits || 'EDITS',
          items: ['Summer Essentials', 'Workwear Edit', 'Weekend Vibes', 'Holiday Party', 'New This Month']
        },
        {
          title: t?.vintage || 'VINTAGE',
          items: ['Tops', 'Pants', 'Denim', 'Jackets & Coats', 'Skirts', 'Shorts', 'Accessories', 'Bags']
        }
      ]
    }
  };

  const currentMenu = menuContent[category as keyof typeof menuContent];
  if (!currentMenu) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
        onMouseEnter={onClose}
      />
      
      {/* Mega Menu with Glassmorphism */}
      <div 
        className="absolute left-0 right-0 top-full z-50 animate-fadeIn"
        onMouseLeave={onClose}
      >
        <div className="container mx-auto px-4 py-8">
          {/* Glassmorphism Container */}
          <div className="glassmorphism-menu rounded-2xl p-8 shadow-2xl">
            {/* Menu Title */}
            <h3 className="text-2xl font-light tracking-wider mb-6 border-b border-white/20 pb-4">
              {currentMenu.title}
            </h3>
            
            {/* Columns Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {currentMenu.columns.map((column, idx) => (
                <div key={idx} className="space-y-4">
                  {/* Column Title */}
                  <h4 className="font-medium text-sm tracking-wider mb-3 text-black/80 dark:text-white/90">
                    {column.title}
                  </h4>
                  
                  {/* Column Items */}
                  <ul className="space-y-2">
                    {column.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <button className="text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors duration-200 text-left w-full">
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .glassmorphism-menu {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 8px 32px 0 rgba(31, 38, 135, 0.15),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
            inset 0 -1px 0 0 rgba(255, 255, 255, 0.2);
        }
        
        .dark .glassmorphism-menu {
          background: rgba(30, 30, 30, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 8px 32px 0 rgba(0, 0, 0, 0.4),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 0 rgba(255, 255, 255, 0.05);
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
