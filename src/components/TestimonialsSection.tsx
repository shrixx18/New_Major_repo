
import Testimonial from './Testimonial';
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "The care provided to my mother has been nothing short of exceptional. The caregivers are compassionate, skilled, and truly care about her wellbeing.",
      name: "Sarah Johnson",
      relation: "Daughter of Client",
      image: "/lovable-uploads/3ed4d951-d772-4fe2-95c9-5fec2090dcfb.png"
    },
    {
      quote: "AgeWell Solutions has given me peace of mind knowing my father is in good hands. Their personalized approach makes all the difference.",
      name: "Michael Rodriguez",
      relation: "Son of Client",
      image: "/lovable-uploads/60d39192-5e00-42ab-982c-e67bb676643d.png"
    },
    {
      quote: "The staff truly understand the unique needs of seniors and provide care with dignity and respect. I couldn't be happier with their services.",
      name: "Jennifer Williams",
      relation: "Client",
      image: "/lovable-uploads/b68f99f8-6554-4a71-ba90-56e465d16763.png"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-age-cream" id="testimonials">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">What Families Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it. Hear from the families we've had the privilege to serve.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              relation={testimonial.relation}
              image={testimonial.image}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button className="btn-secondary">
            Read More Testimonials
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
