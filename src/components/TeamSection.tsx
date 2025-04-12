
import TeamMember from './TeamMember';
import { Button } from "@/components/ui/button";

const TeamSection = () => {
  const team = [
    {
      name: "Ritesh Telkar",
      
      image: "/lovable-uploads/8656b250-ecca-401a-b487-759ab30cd0c9.png",
      bio: " Student CSIT-III."
    },
    {
      name: "Shriverdhan Pathak",
      
      image: "/lovable-uploads/d5e4bdc9-dadb-42b7-8c42-d7cba27a546f.png",
      bio: "Student CSIT-III. "
    },
    {
      name: "Rishabh Rathore",
      
      image: "/lovable-uploads/c246caa8-d6a6-4aa1-92bb-c41efb9432a5.png",
      bio: " Student CSIT-III."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="team">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            Our dedicated team of professionals is committed to providing the highest quality care for your loved ones.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <TeamMember 
              key={index}
              name={member.name}
          
              image={member.image}
              bio={member.bio}
            />
          ))}
        </div>
        
        {/* <div className="mt-12 text-center">
          <Button variant="outline" className="border-age-teal text-age-teal hover:bg-age-teal/10">
            View All Team Members
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default TeamSection;
