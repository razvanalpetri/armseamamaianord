import { 
  Waves, Wind, Wifi, Utensils, Droplets, Car, UtensilsCrossed, Flower2, Gamepad2
} from 'lucide-react';
import { AMENITIES, SHADOWS, TRANSITIONS } from '../utils/constants';

const Features = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves': return <Waves size={28} className="text-turquoise-DEFAULT" />;
      case 'Wind': return <Wind size={28} className="text-turquoise-DEFAULT" />;
      case 'Wifi': return <Wifi size={28} className="text-turquoise-DEFAULT" />;
      case 'Utensils': return <Utensils size={28} className="text-turquoise-DEFAULT" />;
      case 'Droplets': return <Droplets size={28} className="text-turquoise-DEFAULT" />;
      case 'Car': return <Car size={28} className="text-turquoise-DEFAULT" />;
      case 'UtensilsCrossed': return <UtensilsCrossed size={28} className="text-turquoise-DEFAULT" />;
      case 'Flower2': return <Flower2 size={28} className="text-turquoise-DEFAULT" />;
      case 'Gamepad2': return <Gamepad2 size={28} className="text-turquoise-DEFAULT" />;
      default: return <Waves size={28} className="text-turquoise-DEFAULT" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {AMENITIES.map((amenity, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg text-center transition-transform hover:-translate-y-2"
              style={{ 
                boxShadow: SHADOWS.sm,
                transition: TRANSITIONS.default
              }}
            >
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gray-50 rounded-full mb-4">
                {getIcon(amenity.icon)}
              </div>
              <h3 className="text-xl font-bold mb-2">{amenity.name}</h3>
              <div className="w-12 h-1 bg-turquoise-light mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;