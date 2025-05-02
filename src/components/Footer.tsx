import { Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-6">
          <h3 className="text-2xl font-serif font-bold mb-4 text-center">
            <span>ARMSEA</span>
            <span className="text-turquoise-DEFAULT"> MAMAIA NORD</span>
          </h3>
          <p className="text-gray-400 text-center max-w-xl mb-6">
            Cazare de lux și studiouri în zona Mamaia Nord, 
            oferind o experiență de neuitat la malul mării.
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://www.facebook.com/profile.php?id=100063660877664" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-turquoise-DEFAULT transition-all"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Armsea Mamaia Nord. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;