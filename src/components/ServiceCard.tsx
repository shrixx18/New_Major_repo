
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  slug: string;
}

const ServiceCard = ({ title, description, icon, slug }: ServiceCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/article/${slug}`);
  };
  
  return (
    <div 
      className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-14 h-14 bg-age-teal/10 rounded-full flex items-center justify-center text-age-teal mb-6 group-hover:bg-age-teal group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-age-navy mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
