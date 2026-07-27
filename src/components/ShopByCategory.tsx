import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiService from "@/lib/apiService";
import { resolveImageUrl } from "@/lib/config";
import { ArrowUpRight } from "lucide-react";

const ShopByCategory = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getCategories().then((data) => {
      const list = Array.isArray(data) ? data : (data as any)?.categories || [];
      const homepage = list.filter((c: any) => c.showOnHomepage !== false && c.show_on_homepage !== false);
      setCategories(homepage);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const getCategoryImage = (cat: any): string => {
    const resolved = resolveImageUrl(cat.image_url || cat.imageUrl);
    return resolved || "/placeholder.svg";
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <p className="text-sm tracking-[0.3em] text-brandgold uppercase mb-3">Browse</p>
            <h2 className="text-4xl md:text-5xl font-serif text-brandblue">Shop by Category</h2>
          </div>
          <p className="text-base text-neutral-600 max-w-md">
            Discover our curated collections of fine jewelry, each piece crafted with precision and care.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-wrap justify-center gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-neutral-100 aspect-[4/5] w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((category, idx) => (
              <Link
                key={category.id}
                to={`/products/${(category.name || "").toLowerCase()}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                {/* Image */}
                <img
                  src={getCategoryImage(category)}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-contain transition-transform duration-[800ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient overlay — always present, strengthens on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

                {/* Index chip */}
                <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs tracking-[0.2em] font-medium">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Name + CTA */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-serif leading-tight">{category.name}</h3>
                      {category.description && (
                        <p className="text-sm text-white/80 mt-2 line-clamp-2 max-w-xs">{category.description}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:bg-brandgold group-hover:rotate-45">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                  {/* Animated underline accent */}
                  <div className="mt-4 h-px w-12 bg-brandgold transition-all duration-500 group-hover:w-full" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopByCategory;
