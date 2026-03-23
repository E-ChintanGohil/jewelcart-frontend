
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiService from "@/lib/apiService";
import { resolveImageUrl } from "@/lib/config";

const fallbackImages: Record<string, string> = {
  rings: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80",
  necklaces: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
  earrings: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
  bracelets: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&q=80",
};

const defaultFallback = "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80";

const ShopByCategory = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getCategories().then((data) => {
      const list = Array.isArray(data) ? data : (data as any)?.categories || [];
      setCategories(list);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const getCategoryImage = (cat: any): string => {
    const resolved = resolveImageUrl(cat.image_url || cat.imageUrl);
    if (resolved) return resolved;
    const name = (cat.name || "").toLowerCase();
    return fallbackImages[name] || defaultFallback;
  };

  if (loading) {
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
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="rounded-xl bg-gray-200 aspect-square" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
            <Link key={category.id} to={`/products/${category.name.toLowerCase()}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl bg-white shadow-soft border border-gray-200 hover:shadow-elegant transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={getCategoryImage(category)}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
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

export default ShopByCategory;
