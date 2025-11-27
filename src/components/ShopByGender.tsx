
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ShopByGender = () => {
  const genderCategories = [
    {
      id: 1,
      title: "Women's Jewellery",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      description: "Elegant and sophisticated pieces for women",
      link: "/collections/women",
      featured: true
    },
    {
      id: 2,
      title: "Men's Jewellery",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
      description: "Bold and refined accessories for men",
      link: "/collections/men",
      featured: false
    },
    {
      id: 3,
      title: "Kids Jewellery",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      description: "Delicate and safe pieces for children",
      link: "/collections/kids",
      featured: false
    },
    {
      id: 4,
      title: "Unisex Collection",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      description: "Versatile pieces for everyone",
      link: "/collections/unisex",
      featured: false
    }
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Shop By Gender</h2>
          <p className="text-lg text-primary-light max-w-2xl mx-auto">
            Find the perfect jewelry for everyone in your family
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {genderCategories.map((category) => (
            <Link key={category.id} to={category.link}>
              <div className="group cursor-pointer">
                <div className={`relative overflow-hidden rounded-xl bg-white shadow-soft border border-gray-200 hover:shadow-elegant transition-all duration-300 ${category.featured ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                  <div className={`aspect-square overflow-hidden ${category.featured ? 'lg:aspect-[2/1]' : ''}`}>
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="mb-4">
                      <h3 className={`font-bold mb-2 ${category.featured ? 'text-2xl' : 'text-xl'}`}>
                        {category.title}
                      </h3>
                      <p className={`opacity-90 ${category.featured ? 'text-base' : 'text-sm'}`}>
                        {category.description}
                      </p>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="bg-white hover:bg-gray-100 text-black border-0"
                    >
                      Shop Now
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

export default ShopByGender;
