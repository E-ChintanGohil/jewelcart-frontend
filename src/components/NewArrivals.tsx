
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import apiService from "@/lib/apiService";
import { getProductImageUrl } from "@/lib/config";
import { formatCurrency } from "@/lib/currency";
import { productPath } from '@/lib/slug';

const NewArrivals = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getProducts({ limit: 6 }).then((res) => {
      setProducts(res.products?.slice(0, 6) || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

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

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="rounded-lg bg-gray-200 aspect-square" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.map((product) => (
              <Link key={product.id} to={productPath(product.id, product.name)}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg bg-white shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={getProductImageUrl(product)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          New
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-black mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-sm font-bold text-brandgold">
                        {formatCurrency(product.calculatedPrice || product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

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
