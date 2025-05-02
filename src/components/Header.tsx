import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { COLORS, TRANSITIONS } from '../utils/constants';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex-1"></div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            ['Camere', 'accommodations'],
            ['Studiouri', 'studios'],
            ['Contact', 'contact']
          ].map(([label, link]) => (
            <a 
              key={link} 
              href={`#${link}`}
              className={`font-medium transition-all hover:text-turquoise-DEFAULT ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              {label}
            </a>
          ))}
          <button 
            className="px-6 py-2 rounded bg-turquoise-DEFAULT text-white font-medium hover:bg-turquoise-dark transition-all"
            style={{ transition: TRANSITIONS.default }}
          >
            Rezervă Acum
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Meniu"
        >
          {isMenuOpen ? (
            <X size={24} color={isScrolled ? COLORS.black : COLORS.white} />
          ) : (
            <Menu size={24} color={isScrolled ? COLORS.black : COLORS.white} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {[
              ['Camere', 'accommodations'],
              ['Studiouri', 'studios'],
              ['Contact', 'contact']
            ].map(([label, link]) => (
              <a 
                key={link} 
                href={`#${link}`}
                className="font-medium text-gray-800 py-2 hover:text-turquoise-DEFAULT"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <button 
              className="mt-2 px-6 py-3 rounded bg-turquoise-DEFAULT text-white font-medium hover:bg-turquoise-dark transition-all"
              style={{ transition: TRANSITIONS.default }}
            >
              Rezervă Acum
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;