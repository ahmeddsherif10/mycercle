export function Footer() {
  return (
    <footer className="bg-black text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-light tracking-wider mb-4">MY CERCLE</h3>
            <p className="text-sm text-gray-400">
              Sustainable luxury fashion for the conscious consumer.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">SHOP</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button className="hover:text-white transition-colors">Women</button></li>
              <li><button className="hover:text-white transition-colors">Kids</button></li>
              <li><button className="hover:text-white transition-colors">Designer</button></li>
              <li><button className="hover:text-white transition-colors">New Arrivals</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">ABOUT</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button className="hover:text-white transition-colors">Our Story</button></li>
              <li><button className="hover:text-white transition-colors">Sustainability</button></li>
              <li><button className="hover:text-white transition-colors">Sell With Us</button></li>
              <li><button className="hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">HELP</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button className="hover:text-white transition-colors">Shipping</button></li>
              <li><button className="hover:text-white transition-colors">Returns</button></li>
              <li><button className="hover:text-white transition-colors">FAQ</button></li>
              <li><button className="hover:text-white transition-colors">Size Guide</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 My Cercle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
