// ============================================
// UNIFIED MEGA MENU COMPONENT WITH GLASSMORPHISM
// ============================================
// Hover-activated mega menu showing all categories at once

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  t: any; // Translations object
}

export function MegaMenu({ isOpen, onClose, t }: MegaMenuProps) {
  if (!isOpen) return null;

  // Unified menu structure - all categories displayed at once
  const menuContent = [
    {
      title: 'WOMEN',
      columns: [
        {
          title: 'CLOTHING',
          items: ['Tops', 'Pants', 'Dresses', 'Skirts', 'Jackets & Coats', 'Suits & Sets', 'Shorts']
        },
        {
          title: 'ACCESSORIES',
          items: ['Jewelry', 'Belts', 'Scarves', 'Clutches', 'Bags', 'Shoes']
        }
      ]
    },
    {
      title: 'KIDS',
      columns: [
        {
          title: 'GIRLS',
          items: ['0-24m', '2T-5T', '6-12y', 'Dresses', 'Skirts', 'Tops', 'Pants', 'Jackets', 'Shorts', 'Swimwear', 'Activewear']
        },
        {
          title: 'BOYS & BABY',
          items: ['Newborn', '0-24m', '2T-5T', '6-12y', 'Tops', 'Pants', 'Denim', 'Jackets', 'Shorts', 'Rompers', 'Onesies', 'Swimwear', 'Activewear', 'Toys']
        }
      ]
    },
    {
      title: 'DESIGNER',
      columns: [
        {
          title: 'PRODUCT TYPE',
          items: ['Handbags', 'Ready-to-Wear', 'Accessories', 'Belts', 'Scarves', 'Wallets']
        },
        {
          title: 'BROWSE BY BRAND',
          items: ['Louis Vuitton', 'Chanel', 'Gucci', 'Prada', 'Hermès', 'Dior', 'Fendi', 'Valentino']
        }
      ]
    },
    {
      title: 'EDITS',
      columns: [
        {
          title: 'CURATED COLLECTIONS',
          items: ['Summer Essentials', 'Workwear Edit', 'Weekend Vibes', 'Holiday Party', 'New This Month']
        }
      ]
    },
    {
      title: 'VINTAGE',
      columns: [
        {
          title: 'CATEGORIES',
          items: ['Tops', 'Pants', 'Denim', 'Jackets & Coats', 'Skirts', 'Shorts', 'Accessories', 'Bags']
        }
      ]
    }
  ];

  return (
    <>
      {/* Semi-transparent backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Mega menu dropdown - dangling from navigation bar */}
      <div
        className="absolute left-0 right-0 top-full z-50 fadeIn"
      >
        <div className="glass-menu p-8 shadow-2xl max-h-[70vh] overflow-y-auto">
          <div className="container mx-auto">
            {/* Main Grid - All Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
              {menuContent.map((category, categoryIdx) => (
                <div
                  key={categoryIdx}
                  className={`space-y-4 ${category.title === 'KIDS' ? 'lg:col-span-2' : ''}`}
                >
                  {/* Category Title */}
                  <h2 className="text-xl font-light tracking-wider mb-3 pb-3 border-b border-black/10 dark:border-white/10 text-black dark:text-white">
                    {category.title}
                  </h2>

                  {/* Columns within category */}
                  <div className={category.title === 'KIDS' ? 'grid grid-cols-2 gap-6' : 'space-y-4'}>
                    {category.columns.map((column, columnIdx) => (
                      <div key={columnIdx} className="space-y-2">
                        {/* Column Title */}
                        <h3 className="text-sm font-medium tracking-wider uppercase text-black/80 dark:text-white/90">
                          {column.title}
                        </h3>

                        {/* Column Items */}
                        <ul className="space-y-1.5">
                          {column.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <button className="text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:opacity-100 transition-all duration-200 text-left w-full">
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Glassmorphism Effect - Light Mode */
        .glass-menu {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-top: 2px solid rgba(0, 0, 0, 0.1);
          box-shadow:
            0 10px 40px 0 rgba(0, 0, 0, 0.1),
            0 6px 20px 0 rgba(0, 0, 0, 0.08),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.9),
            inset 0 -1px 0 0 rgba(255, 255, 255, 0.5);
        }

        /* Glassmorphism Effect - Dark Mode */
        .dark .glass-menu {
          background: rgba(30, 30, 30, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-top: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow:
            0 10px 40px 0 rgba(0, 0, 0, 0.6),
            0 6px 20px 0 rgba(0, 0, 0, 0.4),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 0 rgba(255, 255, 255, 0.08);
        }

        /* Fade-in animation */
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

        .fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        /* Smooth hover transitions */
        .glass-menu button {
          transition: color 200ms ease, opacity 200ms ease;
        }
      `}</style>
    </>
  );
}
