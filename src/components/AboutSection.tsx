
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section className="py-16 md:py-24 bg-age-light" id="about">
      <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-age-navy mb-6">Comitment to Quality Care</h2>
          <p className="text-gray-700 mb-4">
            We believe that every senior deserves to age with dignity, respect, and comfort. Our mission is to provide exceptional care services that enhance the quality of life.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <span className="block text-3xl font-bold text-age-teal mb-1">30+</span>
              <span className="text-gray-600">Old age homes available</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <span className="block text-3xl font-bold text-age-teal mb-1">4</span>
              <span className="text-gray-600">Available to donate</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <span className="block text-3xl font-bold text-age-teal mb-1">100%</span>
              <span className="text-gray-600">Satisfaction</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <span className="block text-3xl font-bold text-age-teal mb-1">24/7</span>
              <span className="text-gray-600">Support</span>
            </div>
          </div>
          
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/60d39192-5e00-42ab-982c-e67bb676643d.png" 
              alt="Senior care" 
              className="rounded-lg h-full object-cover shadow-md"
            />
          </div>
          <div className="space-y-4 mt-6">
            <img 
              src="/lovable-uploads/e6f40c8a-5e02-42d6-a228-1320ef2e5181.png" 
              alt="Senior couple blowing bubbles" 
              className="rounded-lg h-40 object-cover shadow-md"
            />
            <img 
              src="/lovable-uploads/b68f99f8-6554-4a71-ba90-56e465d16763.png" 
              alt="Elderly community" 
              className="rounded-lg h-48 object-cover shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
