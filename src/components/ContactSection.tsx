
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section className="py-16 bg-age-light" id="contact">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have questions or ready to discuss care options? We're here to help.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-age-navy">Send Us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-age-teal focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-age-teal focus:border-transparent"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-age-teal focus:border-transparent"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-age-teal focus:border-transparent"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <Button className="btn-primary w-full">Send Message</Button>
            </form>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-start">
              <div className="mr-4 bg-age-teal/10 p-3 rounded-full text-age-teal">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-age-navy mb-1">Our Location</h4>
                <p className="text-gray-600">Indore</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-start">
              <div className="mr-4 bg-age-teal/10 p-3 rounded-full text-age-teal">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-age-navy mb-1">Phone</h4>
                <p className="text-gray-600">(+91) 9XXXXXXXXXX</p>
                <p className="text-gray-500 text-sm">Mon-Fri, 8am-6pm</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-start">
              <div className="mr-4 bg-age-teal/10 p-3 rounded-full text-age-teal">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-age-navy mb-1">Email</h4>
                <p className="text-gray-600">Vruddhsewa@gmail.com</p>
                <p className="text-gray-500 text-sm">We respond within 24 hours</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-start">
              <div className="mr-4 bg-age-teal/10 p-3 rounded-full text-age-teal">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-age-navy mb-1">Hours of Operation</h4>
                <p className="text-gray-600">Monday to Friday: 8am - 6pm</p>
                <p className="text-gray-600">Saturday: 9am - 2pm</p>
                <p className="text-gray-600">Sunday: Closed</p>
                <p className="text-gray-500 text-sm mt-1"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
