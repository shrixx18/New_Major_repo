
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-age-cream to-white py-16 md:py-24">
      <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-age-navy leading-tight mb-6">
            Compassionate Elder Care You Can Trust
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Providing professional, personalized care services that help seniors maintain independence and dignity in the comfort old age homes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="btn-primary">
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-age-teal text-age-teal hover:bg-age-teal/10">
              Learn More
            </Button>
          </div>
        </div>
        <div className="animate-fade-in hidden md:block">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-full h-full rounded-2xl bg-age-orange/20 transform rotate-3"></div>
            <img 
              src="/lovable-uploads/e6f40c8a-5e02-42d6-a228-1320ef2e5181.png" 
              alt="Senior couple enjoying life" 
              className="w-full h-auto rounded-2xl shadow-lg relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
