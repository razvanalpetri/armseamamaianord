import { useState, useEffect } from 'react';
import { ROOMS_DATA, SHADOWS, TRANSITIONS } from '../utils/constants';
import { Bed, Sofa, Bath, Mountain, UtensilsCrossed, Wifi, Monitor, Wind, Coffee, WashingMachine as Washing, Car, ChevronLeft, ChevronRight } from 'lucide-react';

const Studios = () => {
  const studios = ROOMS_DATA.filter(room => room.type === 'studio');
  const [activeStudio] = useState(studios[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % activeStudio.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeStudio.images.length]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === 0 ? activeStudio.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      (prev + 1) % activeStudio.images.length
    );
  };

  const facilities = [
    { icon: <Bed size={24} />, name: 'Pat King-size' },
    { icon: <Sofa size={24} />, name: 'Canapea extensibilă' },
    { icon: <Bath size={24} />, name: 'Baie privată' },
    { icon: <Mountain size={24} />, name: 'Balcon cu vedere la lac și mare' },
    { icon: <UtensilsCrossed size={24} />, name: 'Bucătărie complet utilată' },
    { icon: <Wifi size={24} />, name: 'Wi-Fi gratuit' },
    { icon: <Monitor size={24} />, name: 'Smart TV (YouTube, Netflix)' },
    { icon: <Wind size={24} />, name: 'Aer condiționat' },
    { icon: <Coffee size={24} />, name: 'Espressor' },
    { icon: <Washing size={24} />, name: 'Mașină de spălat' },
    { icon: <Car size={24} />, name: 'Parcare Gratuită' }
  ];

  return (
    <section id="studios" className="py-16 md:py-24 bg-offWhite">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Studio Armsea Mamaia Nord</h2>
          <div className="w-20 h-1 bg-turquoise-DEFAULT mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg">
            Studiourile noastre premium combină confortul de acasă cu luxul, la doar 3 minute de mers pe jos până la plajă și 5 minute de mers pe jos până la cluburi. 
            Perfecte pentru șederi prelungite sau oaspeți care doresc spațiu și facilități suplimentare.
          </p>
        </div>

        <div className="bg-white rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="order-2 md:order-1 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">{activeStudio.name}</h3>
              <p className="text-gray-700 mb-6">{activeStudio.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {facilities.map((facility, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-turquoise-light flex items-center justify-center">
                      <div className="text-turquoise-dark">{facility.icon}</div>
                    </div>
                    <span className="text-gray-700">{facility.name}</span>
                  </div>
                ))}
              </div>

              <a 
                href="#contact"
                className="px-8 py-3 bg-transparent text-turquoise-DEFAULT border-2 border-turquoise-DEFAULT rounded self-start hover:bg-turquoise-DEFAULT hover:text-white transition-all"
                style={{ transition: TRANSITIONS.default }}
              >
                Vreau să rezerv!
              </a>
            </div>
            <div className="relative order-1 md:order-2 h-[500px] md:h-[600px]">
              <div className="h-full relative group">
                <img 
                  src={activeStudio.images[currentImageIndex]} 
                  alt={`${activeStudio.name} - Imagine ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <button
                    onClick={handlePrevImage}
                    className="p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors focus:outline-none"
                    aria-label="Imaginea anterioară"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors focus:outline-none"
                    aria-label="Imaginea următoare"
                  >
                    <ChevronRight size={32} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {activeStudio.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentImageIndex === index ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Studios;