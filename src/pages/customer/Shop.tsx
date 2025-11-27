import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiService } from '@/lib/apiService';
import { formatCurrency } from '@/lib/currency';
import { useCart } from '@/contexts/CartContext';
import { Loader2, ShoppingCart, Heart, Star } from 'lucide-react';

interface Product {
  id: string | number;
  name: string;
  calculatedPrice?: number;
  price?: number;
  categoryName?: string;
  category?: string;
  imageUrl?: string;
  image_url?: string;
  description?: string;
  stockQuantity?: number;
  in_stock?: boolean;
  isActive?: boolean;
}

interface Category {
  id: string;
  name: string;
  description?: string;
}

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          apiService.getProducts(),
          apiService.getCategories()
        ]);

        // Handle different response structures
        const products = productsData.products || productsData;
        const categories = categoriesData.categories || categoriesData;

        setProducts(products);
        setCategories(categories);
      } catch (error) {
        console.error('Failed to load shop data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = products.filter(product => {
    // Filter by category if selected
    if (selectedCategory && (product.categoryName || product.category) !== selectedCategory) {
      return false;
    }

    // Filter by search query if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query)) ||
        (product.categoryName && product.categoryName.toLowerCase().includes(query)) ||
        (product.category && product.category.toLowerCase().includes(query))
      );
    }

    return true;
  });

  const featuredProducts = products.filter(p => p.isActive !== false).slice(0, 8);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title={searchQuery ? `Search: ${searchQuery} - Jewelcart` : "Shop Jewelry Online - Rings, Necklaces, Earrings & More | Jewelcart"}
        description={searchQuery 
          ? `Search results for "${searchQuery}" at Jewelcart. Find the perfect jewelry piece from our exquisite collection.`
          : "Shop our complete collection of handcrafted jewelry online. Browse rings, necklaces, earrings, bracelets, and more. Free shipping on orders above ₹1,00,000. Secure payment options available."
        }
        image="/og-image.jpg"
        keywords={searchQuery 
          ? `${searchQuery}, jewelry search, find jewelry`
          : "shop jewelry online, buy jewelry, jewelry store, rings, necklaces, earrings, bracelets, jewelry shopping, online jewelry store"
        }
      />
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Exquisite Jewelry Collection'}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {searchQuery
            ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} matching your search`
            : 'Discover our handcrafted pieces made with precious metals and finest gemstones'
          }
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={selectedCategory === '' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('')}
            className="mb-2"
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.name)}
              className="mb-2"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      {selectedCategory === '' && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} featured />
            ))}
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {searchQuery
            ? 'Search Results'
            : selectedCategory
              ? `${selectedCategory} Collection`
              : 'All Products'
          }
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${featured ? 'border-amber-200' : ''}`}>
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          {featured && (
            <Badge className="absolute top-2 left-2 z-10 bg-amber-500">
              Featured
            </Badge>
          )}
          <img
            src={product.imageUrl || product.image_url
              ? `http://localhost:5001${product.imageUrl || product.image_url}`
              : '/placeholder-jewelry.jpg'}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 space-x-2">
              <Button
                size="sm"
                className="bg-white text-black hover:bg-gray-100"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="bg-white border-white hover:bg-gray-100">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {product.categoryName || product.category}
            </Badge>
            <div className="flex items-center">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <Star className="h-3 w-3 fill-gray-200 text-gray-200" />
            </div>
          </div>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-900 mb-2 hover:text-amber-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-amber-600">
              {formatCurrency(product.calculatedPrice || product.price || 0)}
            </span>
            <Badge
              variant={(product.stockQuantity && product.stockQuantity > 0) || product.in_stock ? "default" : "destructive"}
              className="text-xs"
            >
              {(product.stockQuantity && product.stockQuantity > 0) || product.in_stock ? 'In Stock' : 'Out of Stock'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}