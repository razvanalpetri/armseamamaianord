import { useState, useEffect } from 'react';
import { ROOMS_DATA, SHADOWS, TRANSITIONS } from '../utils/constants';
import { Star, Wind, Tv, Wifi, Refrigerator, Car, UtensilsCrossed, Coffee, Baby, Maximize, ChevronLeft, ChevronRight } from 'lucide-react';

const Accommodations = () => {
  const accommodations = ROOMS_DATA.filter(room => room.type === 'accommodation');
  const [activeRoom, setActiveRoom] = useState(accommodations[0]);
  const [imageIndices, setImageIndices] = useState<Record<number, number>>({});

  useEffect(() => {
    const roomsWithCarousel = accommodations.filter(room => 'images' in room);
    
    roomsWithCarousel.forEach(room => {
      const interval = setInterval(() => {
        setImageIndices(prev => ({
          ...prev,
          [room.id]: ((prev[room.id] || 0) + 1) % (('images' in room ? room.images.length : 1))
        }));
      }, 5000);

      return () => clearInterval(interval);
    });
  }, []);

  const handlePrevImage = (e: React.MouseEvent, room: typeof accommodations[0]) => {
    e.stopPropagation();
    if ('images' in room) {
      setImageIndices(prev => ({
        ...prev,
        [room.id]: prev[room.id] === 0 ? room.images.length - 1 : prev[room.id] - 1
      }));
    }
  };

  const handleNextImage = (e: React.MouseEvent, room: typeof accommodations[0]) => {
    e.stopPropagation();
    if ('images' in room) {
      setImageIndices(prev => ({
        ...prev,
        [room.id]: (prev[room.id] + 1) % room.images.length
      }));
    }
  };

  return (
    <section id="accommodations" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Armsea Mamaia Nord</h2>
          <div className="w-20 h-1 bg-turquoise-DEFAULT mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg">
            Bucură-te de o experiență unică într-o locație exclusivistă, la doar 10 minute de mers pe jos până la plajă. 
            Camerele noastre sunt atent amenajate pentru a-ți oferi confortul și liniștea de care ai nevoie.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {accommodations.map(room => (
            <div 
              key={room.id}
              className="rounded-lg overflow-hidden transition-all cursor-pointer transform hover:-translate-y-2"
              style={{ 
                boxShadow: SHADOWS.md,
                transition: TRANSITIONS.default
              }}
            >
              <div className="h-64 overflow-hidden relative group">
                {'images' in room ? (
                  <>
                    <img 
                      src={room.images[imageIndices[room.id] || 0]} 
                      alt={room.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ transition: 'opacity 0.5s ease-in-out' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handlePrevImage(e, room)}
                        className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors focus:outline-none"
                        aria-label="Imaginea anterioară"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={(e) => handleNextImage(e, room)}
                        className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors focus:outline-none"
                        aria-label="Imaginea următoare"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {room.images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all ${
                            (imageIndices[room.id] || 0) === index ? 'bg-white w-4' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star} 
                        size={16} 
                        fill="#05B3B6" 
                        color="#05B3B6"
                      />
                    ))}
                  </div>
                  <a 
                    href="#contact"
                    className="px-4 py-2 bg-turquoise-DEFAULT text-turquoise-DEFAULT bg-transparent border-2 border-turquoise-DEFAULT rounded hover:bg-turquoise-DEFAULT hover:text-white transition-all"
                    style={{ transition: TRANSITIONS.default }}
                  >
                    Vreau să rezerv!
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accommodations;