
import { useState, useEffect } from 'react';
import { localStorageService, Product } from '@/lib/localStorage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';
import { formatCurrency } from '@/lib/currency';
import { Link } from 'react-router-dom';

const WomenCollection = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const allProducts = localStorageService.getProducts();
    // Filter products suitable for women or show all if no specific filter
    setProducts(allProducts.slice(0, 12)); // Show first 12 products
  }, []);


  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0 && product.images[0]) {
      return product.images[0];
    }
    return "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80";
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Women's Jewellery Collection</h1>
            <p className="text-xl text-primary-light max-w-2xl mx-auto">
              Elegant and sophisticated pieces designed for the modern woman
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="group cursor-pointer hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-white border-gray-200">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="bg-white/90 backdrop-blur-sm text-black hover:bg-white"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        className="w-full bg-primary hover:bg-primary/80 text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg leading-tight text-black">{product.name}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2 text-gray-600">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-black">
                        {formatCurrency(product.price)}
                      </span>
                      <Badge variant={product.stock > 0 ? "secondary" : "destructive"}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WomenCollection;
