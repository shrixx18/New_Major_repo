
interface TestimonialProps {
  quote: string;
  name: string;
  relation: string;
  image: string;
}

const Testimonial = ({ quote, name, relation, image }: TestimonialProps) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
        <img 
          src={image} 
          alt={name} 
          className="w-16 h-16 rounded-full object-cover shadow-sm border-2 border-age-teal"
        />
        <div>
          <div className="mb-4 text-gray-700 italic">
            "{quote}"
          </div>
          <div className="font-semibold text-age-navy">{name}</div>
          <div className="text-sm text-gray-500">{relation}</div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
