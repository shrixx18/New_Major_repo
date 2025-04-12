
import { Heart, Home, ShieldCheck, Cake, ScanEye, BadgeAlert } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const services = [
    {
      title: "Senior citizens laws in India",
      description: "Understanding the Maintenance and Welfare of Parents and Senior Citizens Act, 2007 and other legal protections available for the elderly in India.",
      icon: <Heart size={24} />,
      slug: "senior-citizens-laws"
    },
    {
      title: "Rise in old age populations in India",
      description: "Insights into the demographic shift in India with over 104 million elderly citizens and projections showing this number doubling by 2050.",
      icon: <Home size={24} />,
      slug: "old-age-population"
    },
    {
      title: "Old age home's role",
      description: "How residential facilities provide comprehensive care, social engagement, and healthcare services to ensure dignity and quality of life for seniors.",
      icon: <ShieldCheck size={24} />,
      slug: "old-age-homes-role"
    },
    {
      title: "Cyber Frauds against senior citizens",
      description: "Awareness about the increasing cyber frauds targeting the elderly, including scams and phishing attacks, and how to protect against them.",
      icon: <BadgeAlert size={24} />,
      slug: "cyber-frauds"
    },
    {
      title: "Specialized care for elderly",
      description: "Understanding the unique healthcare needs of seniors, including chronic disease management, rehabilitation, and palliative care.",
      icon: <ScanEye size={24} />,
      slug: "specialized-care"
    },
    {
      title: "Recreational activities for seniors",
      description: "Exploring various recreational and social activities designed to enhance the quality of life for elderly individuals, including arts, crafts, and community events.",
      icon: <Cake size={24} />,
      slug: "recreational-activities"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="services">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              slug={service.slug}
            />
          ))}
        </div>
        
        {/* <div className="mt-12 text-center">
          <Button className="btn-primary">Learn More</Button>
        </div> */}
      </div>
    </section>
  );
};

export default ServicesSection;
