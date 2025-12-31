
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const NewArrivals = () => {
  const newProducts = [
    {
      id: 1,
      title: "Sapphire Drop Earrings",
      price: "₹45,000",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
      category: "earrings",
      isNew: true
    },
    {
      id: 2,
      title: "Pearl Statement Necklace",
      price: "₹32,000",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
      category: "necklaces",
      isNew: true
    },
    {
      id: 3,
      title: "Vintage Rose Gold Ring",
      price: "₹28,000",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
      category: "rings",
      isNew: true
    },
    {
      id: 4,
      title: "Tennis Bracelet",
      price: "₹55,000",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&q=80",
      category: "bracelets",
      isNew: true
    },
    {
      id: 5,
      title: "Diamond Stud Earrings",
      price: "₹38,000",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
      category: "earrings",
      isNew: true
    },
    {
      id: 6,
      title: "Emerald Pendant",
      price: "₹42,000",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
      category: "necklaces",
      isNew: true
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-brandgold" />
            <h2 className="text-3xl font-bold text-black">New Arrivals</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our latest collection of exquisite jewelry pieces
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {newProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg bg-white shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        New
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-black mb-1 line-clamp-2">{product.title}</h3>
                    <p className="text-sm font-bold text-brandgold">{product.price}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            asChild
            className="bg-brandgold hover:bg-brandblue text-white"
          >
            <Link to="/products/new">View All New Arrivals</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
