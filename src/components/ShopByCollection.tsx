
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ShopByCollection = () => {
  const collections = [
    {
      id: 1,
      title: "Engagement Collection",
      subtitle: "Forever Begins Here",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      price: "From ₹45,000",
      slug: "engagement"
    },
    {
      id: 2,
      title: "Vintage Collection", 
      subtitle: "Timeless Elegance",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      price: "From ₹32,000",
      slug: "vintage"
    },
    {
      id: 3,
      title: "Anniversary Collection",
      subtitle: "Celebrate Love",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80", 
      price: "From ₹28,000",
      slug: "anniversary"
    },
    {
      id: 4,
      title: "Bridal Collection",
      subtitle: "Your Special Day",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      price: "From ₹55,000",
      slug: "bridal"
    }
  ];

  return (
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-6">Shop by Collection</h2>
          <p className="text-lg text-primary-light max-w-2xl mx-auto">
            Explore our signature collections, each telling a unique story of craftsmanship and beauty.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {collections.map((collection) => (
            <Link key={collection.id} to={`/collections/${collection.slug}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl bg-white shadow-soft border border-gray-200 hover:shadow-elegant transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
                      <p className="text-lg opacity-90">{collection.subtitle}</p>
                      <p className="text-sm mt-2 opacity-80">{collection.price}</p>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-white hover:bg-gray-100 text-black border-0"
                    >
                      Explore Collection
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCollection;
