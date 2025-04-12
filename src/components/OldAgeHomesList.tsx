
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Heart } from 'lucide-react';

interface OldAgeHome {
  id: string;
  name: string;
  shortDescription: string;
  location: string;
  contact: string;
  slug: string;
}

const oldAgeHomesData: OldAgeHome[] = [
  {
    id: '1',
    name: 'Astha Vriddhajan Sewa Ashram',
    shortDescription: 'A peaceful sanctuary providing compassionate care for elderly residents with medical facilities and recreational activities.',
    location: 'Near Pipliyahana Lake, Indore',
    contact: '0731-2556789',
    slug: 'astha-vriddhajan'
  },
  {
    id: '2',
    name: 'Daan Patra',
    shortDescription: 'Community-focused old age home offering personalized care services with spiritual and wellness programs.',
    location: 'MR-10 Road, Vijay Nagar, Indore',
    contact: '0731-4912345',
    slug: 'daan-patra'
  },
  {
    id: '3',
    name: 'Ashanjali',
    shortDescription: 'Modern facility with dedicated staff providing 24/7 care and a homely environment for elderly residents.',
    location: 'Near Bombay Hospital, Indore',
    contact: '0731-3678901',
    slug: 'ashanjali'
  },
  {
    id: '4',
    name: 'Ekaansh Foundation',
    shortDescription: 'NGO-run old age home focusing on holistic well-being with medical care and cultural activities.',
    location: 'Scheme No. 54, Indore',
    contact: '0731-2987654',
    slug: 'ekaansh-foundation'
  },
  {
    id: '5',
    name: 'Dashrath Sevashram',
    shortDescription: 'Traditional old age home with spiritual focus and modern amenities for comfortable living.',
    location: 'Rau Road, Indore',
    contact: '0731-2345678',
    slug: 'dashrath-sevashram'
  },
  {
    id: '6',
    name: 'Lakshyasneh Sevashram',
    shortDescription: 'Spacious facility with garden areas and regular health check-ups for residents.',
    location: 'Bypass Road, Indore',
    contact: '0731-5432109',
    slug: 'lakshyasneh-sevashram'
  },
  {
    id: '7',
    name: 'Rajshanti Ashiyana',
    shortDescription: 'Community-based old age home with focus on family-like environment and regular social activities.',
    location: 'Annapurna Road, Indore',
    contact: '0731-6789012',
    slug: 'rajshanti-ashiyana'
  },
  {
    id: '8',
    name: 'Ishwar Old Aged Home',
    shortDescription: 'Faith-based care center with dedicated medical staff and comfortable accommodations.',
    location: 'Kanadiya Road, Indore',
    contact: '0731-8901234',
    slug: 'ishwar-old-aged-home'
  },
  {
    id: '9',
    name: 'Sai Shraddha Palace',
    shortDescription: 'Luxury old age home with premium facilities, regular health monitoring, and recreational activities.',
    location: 'AB Road, Indore',
    contact: '0731-7890123',
    slug: 'sai-shraddha-palace'
  },
  {
    id: '10',
    name: 'Shree Ram Vraddhashram',
    shortDescription: 'Traditional ashram-style old age home with spiritual activities and modern healthcare services.',
    location: 'Khandwa Road, Indore',
    contact: '0731-3456789',
    slug: 'shree-ram-vraddhashram'
  }
];

const OldAgeHomesList = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  
  const displayedHomes = showAll ? oldAgeHomesData : oldAgeHomesData.slice(0, 5);
  
  const handleHomeClick = (slug: string) => {
    navigate(`/old-age-home/${slug}`);
  };
  
  return (
    <section className="py-16 bg-age-cream" id="old-age-homes">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-age-navy mb-4">Old Age Homes in Indore</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Find reliable and caring old age homes in Indore. Each facility is verified for quality of care and services.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedHomes.map((home) => (
            <Card 
              key={home.id} 
              className="cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => handleHomeClick(home.slug)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-age-navy text-xl">{home.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{home.shortDescription}</p>
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin size={16} className="mr-2 text-age-teal" />
                  <span className="text-sm">{home.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Phone size={16} className="mr-2 text-age-teal" />
                  <span className="text-sm">{home.contact}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {!showAll && (
          <div className="text-center">
            <Button 
              onClick={() => setShowAll(true)}
              className="bg-age-teal hover:bg-age-teal/90"
            >
              <Heart size={16} className="mr-2" /> Show More Homes
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default OldAgeHomesList;
