
import { Users, Heart, TrendingUp, Building } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatItem = ({ icon, value, label }: StatItemProps) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <div className="flex items-center mb-4">
      <div className="p-3 rounded-full bg-age-teal/10 text-age-teal mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-3xl font-bold text-age-navy">{value}</h3>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  </div>
);

const StatisticsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-age-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Elderly Care in India</h2>
          <p className="section-subtitle">
            Key statistics highlighting the growing importance of elder care services in India
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatItem 
            icon={<Users size={24} />}
            value="104M+"
            label="Senior Citizens in India"
          />
          <StatItem 
            icon={<TrendingUp size={24} />}
            value="20%"
            label="Projected Elderly Population by 2050"
          />
          <StatItem 
            icon={<Building size={24} />}
            label="Old Age Homes in Indore district"
            value="31+"
          />
          <StatItem 
            icon={<Heart size={24} />}
            value="60%"
            label="Elderly Living Without Adequate Support"
          />
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
