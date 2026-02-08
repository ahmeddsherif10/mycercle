// ============================================
// CATEGORY-SPECIFIC MEGA MENU COMPONENT
// ============================================
// Individual mega menu for each category with glassmorphism effect

interface CategoryMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  t: any; // Translations object
  language?: string; // Current language for RTL support
}

export function CategoryMegaMenu({ isOpen, onClose, category, t, language }: CategoryMegaMenuProps) {
  console.log('CategoryMegaMenu render:', { category, isOpen });
  if (!isOpen) return null;

  // Category-specific menu data
  const getMenuData = (category: string) => {
    switch (category) {
      case 'Women':
        return {
          title: t.megaMenu.women,
          columns: [
            {
              title: t.megaMenu.clothing,
              items: [t.megaMenu.tops, t.megaMenu.pants, t.megaMenu.dresses, t.megaMenu.skirts, t.megaMenu.jacketsCoats, t.megaMenu.suitsSets, t.megaMenu.shorts]
            },
            {
              title: t.megaMenu.accessories,
              items: [t.megaMenu.jewelry, t.megaMenu.belts, t.megaMenu.scarves, t.megaMenu.clutches, t.megaMenu.bags, t.megaMenu.shoes]
            }
          ]
        };

      case 'Kids':
        return {
          title: t.megaMenu.kids,
          columns: [
            {
              title: t.megaMenu.girls,
              items: [t.megaMenu.dresses, t.megaMenu.skirts, t.megaMenu.tops, t.megaMenu.pants, t.megaMenu.jackets, t.megaMenu.shorts, t.megaMenu.swimwear, t.megaMenu.activewear]
            },
            {
              title: t.megaMenu.boys,
              items: [t.megaMenu.tops, t.megaMenu.pants, t.megaMenu.denim, t.megaMenu.jackets, t.megaMenu.shorts, t.megaMenu.swimwear, t.megaMenu.activewear]
            },
            {
              title: t.megaMenu.baby,
              items: [t.megaMenu.tops, t.megaMenu.pants, t.megaMenu.jackets, t.megaMenu.rompers, t.megaMenu.onesies, t.megaMenu.toys]
            }
          ]
        };

      case 'Designer':
        return {
          title: t.megaMenu.designer,
          columns: [
            {
              title: t.megaMenu.productType,
              items: [t.megaMenu.handbags, t.megaMenu.readyToWear, t.megaMenu.accessories, t.megaMenu.belts, t.megaMenu.scarves, t.megaMenu.wallets]
            },
            {
              title: t.megaMenu.browseByBrand,
              items: [t.megaMenu.louisVuitton, t.megaMenu.chanel, t.megaMenu.gucci, t.megaMenu.prada, t.megaMenu.hermes, t.megaMenu.dior, t.megaMenu.fendi, t.megaMenu.valentino]
            }
          ]
        };

      case 'Edits':
        return {
          title: t.megaMenu.edits,
          columns: [
            {
              title: t.megaMenu.curatedCollections,
              items: [t.megaMenu.summerEssentials, t.megaMenu.workwearEdit, t.megaMenu.weekendVibes, t.megaMenu.holidayParty, t.megaMenu.newThisMonth]
            }
          ]
        };

      case 'Vintage':
        return {
          title: t.megaMenu.vintage,
          columns: [
            {
              title: t.megaMenu.categories,
              items: [t.megaMenu.tops, t.megaMenu.pants, t.megaMenu.denim, t.megaMenu.jacketsCoats, t.megaMenu.skirts, t.megaMenu.shorts, t.megaMenu.accessories, t.megaMenu.bags]
            }
          ]
        };

      default:
        return {
          title: category,
          columns: [
            {
              title: 'Categories',
              items: ['Coming Soon']
            }
          ]
        };
    }
  };

  const menuData = getMenuData(category);

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
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        onMouseLeave={onClose}
      >
        <div className="glass-menu p-8 shadow-2xl max-h-[70vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Category Title */}
            <h1 className={`text-2xl font-light mb-6 pb-4 border-b border-black/10 dark:border-white/10 text-black dark:text-white ${
              language === 'ar' ? 'tracking-wide text-right' : 'tracking-wider'
            }`}>
              {menuData.title}
            </h1>

            {/* Columns Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${language === 'ar' ? 'gap-8' : 'gap-12'}`}>
              {menuData.columns.map((column, columnIdx) => (
                <div key={columnIdx} className={language === 'ar' ? 'space-y-4' : 'space-y-3'}>
                  {/* Column Title */}
                  <h2 className={`text-lg font-medium text-black dark:text-white ${
                    language === 'ar' ? 'tracking-wide text-right' : 'tracking-wider'
                  }`}>
                    {column.title}
                  </h2>

                  {/* Column Items */}
                  <ul className={language === 'ar' ? 'space-y-3' : 'space-y-2'}>
                    {column.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <button className={`text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:opacity-100 transition-all duration-200 w-full ${
                          language === 'ar' ? 'text-right' : 'text-left'
                        }`}>
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