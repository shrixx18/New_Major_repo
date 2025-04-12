
interface TeamMemberProps {
  name: string;
  
  image: string;
  bio: string;
}

const TeamMember = ({ name, image, bio }: TeamMemberProps) => {
  return (
    <div className="group">
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover object-top transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-age-navy/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-white text-sm">{bio}</p>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-age-navy">{name}</h3>
      
    </div>
  );
};

export default TeamMember;
