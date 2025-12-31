
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ShopByCategory = () => {
  const categories = [
    {
      id: 1,
      title: "Rings",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80",
      description: "Elegant engagement and wedding rings"
    },
    {
      id: 2,
      title: "Necklaces",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
      description: "Beautiful necklaces for every occasion"
    },
    {
      id: 3,
      title: "Earrings",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
      description: "Stunning earrings to complete your look"
    },
    {
      id: 4,
      title: "Bracelets",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&q=80",
      description: "Elegant bracelets for sophisticated style"
    }
  ];

  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-black mb-6">Shop by Category</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover our curated collections of fine jewelry, each piece crafted with precision and care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link key={category.id} to={`/products/${category.title.toLowerCase()}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl bg-white shadow-soft border border-gray-200 hover:shadow-elegant transition-all duration-300 h-[400px]">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-black group-hover:text-gray-700 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {category.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Shop Now
                    </Button>
                  </div> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
