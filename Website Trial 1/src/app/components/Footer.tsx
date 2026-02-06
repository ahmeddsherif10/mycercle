import { Instagram, Facebook, Twitter } from 'lucide-react';

interface FooterProps {
  t: any; // Translations object
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="bg-black dark:bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-light tracking-wider mb-4">MY CERCLE</h3>
            <p className="text-sm text-gray-400 mb-4">
              {t.tagline}
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/mycercle.eg?igsh=eXE4Z2poZ3p4eGN1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                title={t.followInstagram}
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                title={t.followFacebook}
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                title={t.followTwitter}
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">{t.shopTitle}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button className="hover:text-white transition-colors">{t.women}</button></li>
              <li><button className="hover:text-white transition-colors">{t.kids}</button></li>
              <li><button className="hover:text-white transition-colors">{t.designer}</button></li>
              <li><button className="hover:text-white transition-colors">{t.newArrivals}</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">{t.aboutTitle}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button className="hover:text-white transition-colors">{t.ourStory}</button></li>
              <li><button className="hover:text-white transition-colors">{t.sustainability}</button></li>
              <li><button className="hover:text-white transition-colors">{t.faq}</button></li>
              <li><button className="hover:text-white transition-colors">{t.contact}</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">{t.legalTitle}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button className="hover:text-white transition-colors">{t.privacyPolicy}</button></li>
              <li><button className="hover:text-white transition-colors">{t.termsConditions}</button></li>
              <li><button className="hover:text-white transition-colors">{t.shippingPolicy}</button></li>
              <li><button className="hover:text-white transition-colors">{t.returnPolicy}</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
