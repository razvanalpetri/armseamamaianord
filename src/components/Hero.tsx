import { useState, useEffect } from 'react';
import { COLORS, TRANSITIONS } from '../utils/constants';

const SLIDES = [
  {
    image: '../assets/797f6e61-22e6-45d7-96e2-6bfe4b07e65e.JPG',
    title: (
      <>
        <span style={{ color: COLORS.white }}>ARMSEA </span>
        <span style={{ color: COLORS.turquoise.light }}>MAMAIA </span>
        <span style={{ color: COLORS.white }}>NORD</span>
      </>
    ),
    description: 'Descoperă confortul și eleganța la Armsea Mamaia Nord. Vacanța ta perfectă la malul mării te așteaptă, la doar 10 minute de mers pe jos până la plajă.',
    cta: {
      primary: {
        text: 'Vezi Camerele',
        href: '#accommodations'
      }
    }
  },
  {
    image: '../assets/IMG_0503 3.JPG',
    title: (
      <>
        <span>STUDIO </span>
        <span style={{ color: COLORS.turquoise.light }}>ARMSEA</span>
        <span> MAMAIA NORD</span>
      </>
    ),
    description: 'La doar 3 minute de plajă. Confort și eleganță într-o locație premium.',
    cta: {
      primary: {
        text: 'Vezi Studiourile',
        href: '#studios'
      }
    }
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: currentSlide === index ? 1 : 0,
            backgroundImage: `url("${slide.image}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: currentSlide === index ? 1 : 0,
            imageRendering: 'crisp-edges',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Overlay */}
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              backdropFilter: 'blur(0px)'
            }}
          ></div>
          
          <div className="relative h-full container mx-auto px-4 flex flex-col justify-center pt-16 md:pt-0">
            <div 
              className="max-w-2xl text-white transform -translate-y-12 md:-translate-y-16" 
              style={{ 
                animation: currentSlide === index ? 'fadeInUp 1s ease-out' : 'none',
                opacity: currentSlide === index ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
              }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold leading-tight mb-4 tracking-wide">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed font-light">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={slide.cta.primary.href}
                  className="px-8 py-3 bg-transparent text-white font-medium rounded border-2 border-white hover:bg-white hover:text-turquoise-DEFAULT transition-all"
                  style={{ transition: TRANSITIONS.default }}
                >
                  {slide.cta.primary.text}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#accommodations" aria-label="Derulează în jos">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 5V19M12 19L19 12M12 19L5 12" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;