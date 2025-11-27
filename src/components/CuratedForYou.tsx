
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";

const CuratedForYou = () => {
  const curatedCollections = [
    {
      id: 1,
      title: "Bridal Elegance",
      subtitle: "For Your Special Day",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
      description: "Exquisite pieces for the bride-to-be",
      link: "/collections/bridal"
    },
    {
      id: 2,
      title: "Everyday Luxury",
      subtitle: "For Daily Wear",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
      description: "Elegant pieces for your daily style",
      link: "/collections/everyday"
    },
    {
      id: 3,
      title: "Anniversary Special",
      subtitle: "Celebrate Love",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
      description: "Perfect gifts for special occasions",
      link: "/collections/anniversary"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-black">Curated For You</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked collections designed just for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {curatedCollections.map((collection) => (
            <div key={collection.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium text-black">Curated</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2">{collection.title}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{collection.subtitle}</p>
                  <p className="text-gray-600 text-sm mb-4">{collection.description}</p>
                  
                  <Button 
                    asChild
                    variant="outline" 
                    size="sm" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Link to={collection.link}>Explore Collection</Link>
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

export default CuratedForYou;
