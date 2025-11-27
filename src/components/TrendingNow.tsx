
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const TrendingNow = () => {
  const trendingItems = [
    {
      id: 1,
      title: "Diamond Earrings",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
      category: "earrings",
      trending: true
    },
    {
      id: 2,
      title: "Gold Necklaces",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
      category: "necklaces",
      trending: true
    },
    {
      id: 3,
      title: "Engagement Rings",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
      category: "rings",
      trending: true
    },
    {
      id: 4,
      title: "Designer Bracelets",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&q=80",
      category: "bracelets",
      trending: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-black">Trending Now</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what's popular right now in our jewelry collection
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trendingItems.map((item) => (
            <Link key={item.id} to={`/products/${item.category}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg bg-white shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Trending
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-black text-center group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            asChild
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Link to="/products/all">View All Trending</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingNow;
