import { useState } from 'react';
import { GALLERY_IMAGES, TRANSITIONS } from '../utils/constants';
import { X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-offWhite">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Galerie</h2>
          <div className="w-20 h-1 bg-turquoise-DEFAULT mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg">
            Descoperă frumusețea și eleganța Armsea Mamaia Nord prin galeria noastră.
            Privește experiența luxoasă care te așteaptă.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((image) => (
            <div 
              key={image.id} 
              className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg cursor-pointer relative group"
              onClick={() => openLightbox(image.id)}
            >
              <img 
                src={image.url} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <span className="text-xl">Vezi Mai Mare</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="max-w-4xl w-full p-4">
            <button 
              className="absolute top-6 right-6 text-white"
              onClick={closeLightbox}
              aria-label="Închide"
            >
              <X size={32} />
            </button>
            
            <img 
              src={GALLERY_IMAGES.find(img => img.id === selectedImage)?.url} 
              alt={GALLERY_IMAGES.find(img => img.id === selectedImage)?.alt} 
              className="max-h-[80vh] max-w-full mx-auto object-contain"
              style={{ animation: 'fadeIn 0.3s ease-in-out' }}
            />
            
            <p className="text-white text-center mt-4 text-lg">
              {GALLERY_IMAGES.find(img => img.id === selectedImage)?.alt}
            </p>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Gallery;