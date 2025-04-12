
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-age-navy text-white">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <span className="text-white font-merriweather font-bold text-2xl">वृद्ध<span className="text-age-orange">सेवा</span></span>
              <span className="text-gray-300 font-medium ml-1">Solutions</span>
            </div>
            <p className="text-gray-300 mb-4">
              Get to know about the old age homes, tips for better life and donations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Old Age Homes</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Awareness</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Donations</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Health</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Activities</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Our Team</a></li>
              
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Blog</a></li>
              
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-age-orange" />
                <a href="mailto:vrudhsevasolutions.com" className="text-gray-300 hover:text-white transition-colors duration-300">vrudhsevasolutions.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-age-orange" />
                <a href="tel:5551234567" className="text-gray-300 hover:text-white transition-colors duration-300">(+91) 9XXXXXXXX1</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} वृद्धसेवा Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
