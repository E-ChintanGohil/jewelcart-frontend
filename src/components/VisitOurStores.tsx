
import { MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import storeImage from "@/assets/store-interior.jpg";

const stores = [
  {
    name: "Downtown Flagship",
    address: "123 Jewelry Avenue, Downtown District",
    hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-6PM", 
    phone: "(555) 123-4567",
    image: storeImage
  },
  {
    name: "Mall Location",
    address: "456 Shopping Center, Second Floor",
    hours: "Mon-Sun: 10AM-9PM",
    phone: "(555) 987-6543", 
    image: storeImage
  },
  {
    name: "Uptown Boutique",
    address: "789 Luxury Row, Uptown Area",
    hours: "Tue-Sat: 11AM-7PM, Closed Sun-Mon",
    phone: "(555) 456-7890",
    image: storeImage
  }
];

const VisitOurStores = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Visit Our Stores</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience our jewelry in person at one of our elegant showrooms
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.map((store, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-shadow duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black mb-4">
                  {store.name}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      {store.address}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      {store.hours}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-black flex-shrink-0" />
                    <span className="text-gray-600 text-sm">
                      {store.phone}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-black hover:bg-gray-800 text-white">
                    Get Directions
                  </Button>
                  <Button variant="outline" size="sm" className="border-black text-black hover:bg-black hover:text-white">
                    Call Store
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisitOurStores;
