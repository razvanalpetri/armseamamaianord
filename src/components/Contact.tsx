import { Map, Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Contact</h2>
          <div className="w-20 h-1 bg-turquoise-DEFAULT mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg">
            Ai întrebări sau ești gata să rezervi? Contactează-ne și te vom
            ajuta cu orice informații despre Armsea Mamaia Nord.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6">Informații Contact</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-turquoise-light flex items-center justify-center mr-4">
                  <Map size={18} className="text-turquoise-dark" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Locație</h4>
                  <p className="text-gray-600">Mamaia Nord, Constanța, România</p>
                  <p className="text-gray-600 mt-1">
                    <a 
                      href="https://maps.google.com/maps?q=Pensiunea+Armsea+4*" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-turquoise-DEFAULT transition-colors"
                    >
                      Pensiunea Armsea 4*
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-turquoise-light flex items-center justify-center mr-4">
                  <Mail size={18} className="text-turquoise-dark" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email</h4>
                  <a href="mailto:razvanalpetri@yahoo.ro" className="text-gray-600 hover:text-turquoise-DEFAULT transition-colors">
                    razvanalpetri@yahoo.ro
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-turquoise-light flex items-center justify-center mr-4">
                  <Phone size={18} className="text-turquoise-dark" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Telefon</h4>
                  <a href="tel:0721450907" className="text-gray-600 hover:text-turquoise-DEFAULT transition-colors">
                    0721 450 907
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;