
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const fullName = user?.user_metadata?.full_name as string | undefined;
  const initials = getInitials(fullName || user?.email);

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center">
        <a href="/" className="flex items-center">
          <span className="text-age-teal font-merriweather font-bold text-2xl">वृद्ध<span className="text-age-orange">सेवा</span></span>
          <span className="text-age-navy font-medium ml-1">Solutions</span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            <a href="#services" className="text-gray-700 hover:text-age-teal transition-colors duration-300">Blogs</a>
            <a href="#old-age-homes" className="text-gray-700 hover:text-age-teal transition-colors duration-300">Old Age Homes</a>
            <a href="#about" className="text-gray-700 hover:text-age-teal transition-colors duration-300">About</a>
            <a href="#team" className="text-gray-700 hover:text-age-teal transition-colors duration-300">Our Team</a>
          </div>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-age-teal text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link to="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg animate-slide-in">
          <div className="flex flex-col space-y-4">
            <a 
              href="#services" 
              className="text-gray-700 hover:text-age-teal transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blogs
            </a>
            <a 
              href="#old-age-homes" 
              className="text-gray-700 hover:text-age-teal transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Old Age Homes
            </a>
            <a 
              href="#about" 
              className="text-gray-700 hover:text-age-teal transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#team" 
              className="text-gray-700 hover:text-age-teal transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Team
            </a>
            {user && (
              <Link
                to="/profile"
                className="text-gray-700 hover:text-age-teal transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            )}
            {user ? (
              <Button 
                variant="ghost" 
                className="justify-start pl-0 hover:bg-transparent"
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            ) : (
              <Link 
                to="/auth" 
                className="block"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
