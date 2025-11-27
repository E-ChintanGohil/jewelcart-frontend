
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Phone, Award } from "lucide-react";

const JewelCartExperience = () => {
  const experiences = [
    {
      id: 1,
      icon: MapPin,
      title: "Find a Boutique",
      description: "Locate our nearest store and explore our collections in person",
      action: "Find Store",
      link: "/stores"
    },
    {
      id: 2,
      icon: Calendar,
      title: "Book a Consultation",
      description: "Schedule a personal consultation with our jewelry experts",
      action: "Book Now",
      link: "/consultation"
    },
    {
      id: 3,
      icon: Phone,
      title: "Virtual Try-On",
      description: "Experience our jewelry virtually from the comfort of your home",
      action: "Try Now",
      link: "/virtual-try-on"
    },
    {
      id: 4,
      icon: Award,
      title: "Custom Design",
      description: "Create your own unique piece with our design specialists",
      action: "Start Design",
      link: "/custom-design"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-4">JewelCart Experience</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the JewelCart difference with our personalized services and expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {experiences.map((experience) => {
            const Icon = experience.icon;
            return (
              <div key={experience.id} className="text-center">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-black mb-2">{experience.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{experience.description}</p>
                  
                  <Button 
                    asChild
                    variant="outline" 
                    size="sm" 
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Link to={experience.link}>{experience.action}</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-primary">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
              alt="JewelCart Store Interior"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          
          <div className="relative z-10 p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Visit Our Flagship Store
            </h3>
            <p className="text-lg text-primary-light mb-6 max-w-2xl mx-auto">
              Experience our complete collection and receive personalized service from our expert consultants
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg" 
                className="bg-white hover:bg-gray-100 text-primary"
              >
                <Link to="/stores">Find Nearest Store</Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Link to="/consultation">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JewelCartExperience;
