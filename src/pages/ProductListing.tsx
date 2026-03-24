import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiService } from '@/lib/apiService';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Search, Filter, Heart, ShoppingCart, SlidersHorizontal, X } from 'lucide-react';
import { formatCurrency } from '@/lib/currency';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { getProductImageUrl } from '@/lib/config';
import { useToast } from '@/hooks/use-toast';
import ProductFilters, { FilterState } from '@/components/ProductFilters';

// Default product images for different categories
const defaultImages = {
  rings: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80",
  necklaces: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
  earrings: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
  bracelets: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&q=80",
  default: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80"
};

const ProductListing = () => {
  const { addToCart, isInCart, removeByProductId } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { category, collection } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(true);
  const initialCategory = category ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() : '';
  const [filters, setFilters] = useState<FilterState>({
    categories: initialCategory ? [initialCategory] : [],
    metals: [],
    purities: [],
    gemstones: [],
    priceRange: [0, 300000],
    inStock: false,
    featured: false,
  });
  const [maxPrice, setMaxPrice] = useState(300000);

  // Function to get appropriate image for product
  const getProductImage = (product: any) => getProductImageUrl(product);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Always fetch ALL products — sidebar filters handle narrowing
        const apiFilters: Record<string, any> = {};
        if (collection) apiFilters.collection = collection;

        const response = await apiService.getProducts(apiFilters);
        const allProducts = response.products ?? [];

        const maxProductPrice = allProducts.length > 0
          ? Math.max(...allProducts.map((p: any) => p.calculated_price ?? p.base_price ?? 0))
          : 300000;
        setMaxPrice(maxProductPrice);
        setFilters(prev => ({ ...prev, priceRange: [0, maxProductPrice] }));

        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [collection]);

  // When URL category changes, reset category filter
  useEffect(() => {
    const cat = category ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() : '';
    setFilters(prev => ({ ...prev, categories: cat ? [cat] : [] }));
  }, [category]);

  useEffect(() => {
    let filtered = [...products];
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }
    
    // Metal filter (Gold, Silver, Platinum)
    if (filters.metals.length > 0) {
      filtered = filtered.filter(product =>
        filters.metals.includes(product.material_name ?? '')
      );
    }

    // Purity filter (24K, 22K, 18K, etc.)
    if (filters.purities.length > 0) {
      filtered = filtered.filter(product =>
        filters.purities.includes(product.karat_value ?? '')
      );
    }

    // Gemstone filter
    if (filters.gemstones.length > 0) {
      filtered = filtered.filter(product =>
        product.gemstone && filters.gemstones.includes(product.gemstone)
      );
    }

    // Price filter
    filtered = filtered.filter(product => {
      const price = product.calculated_price ?? product.base_price ?? 0;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => (product.stock_quantity ?? 0) > 0);
    }

    // Featured filter
    if (filters.featured) {
      filtered = filtered.filter(product => product.is_featured);
    }

    // Sort
    filtered.sort((a, b) => {
      const priceA = a.calculated_price ?? a.base_price ?? 0;
      const priceB = b.calculated_price ?? b.base_price ?? 0;
      switch (sortBy) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'newest':
          return new Date(b.createdAt ?? b.created_at).getTime() - new Date(a.createdAt ?? a.created_at).getTime();
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    setFilteredProducts(filtered);
  }, [products, searchQuery, sortBy, filters]);


  const pageTitle = category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 
                   collection ? `${collection.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Collection` : 
                   'Products';

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black mb-4">{pageTitle}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our exquisite collection of handcrafted jewelry pieces
            </p>
          </div>
        </div>
      </section>

      {/* Search and Sort Controls */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-gray-300 text-black"
                />
              </div>
              
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden bg-white border-gray-300 text-black">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <div className="p-4">
                    <ProductFilters
                      onFiltersChange={setFilters}
                      maxPrice={maxPrice}
                      isMobile={true}
                      initialCategory={category}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48 bg-white border-gray-300 text-black">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  <SelectItem value="name" className="text-black hover:bg-gray-100">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low" className="text-black hover:bg-gray-100">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high" className="text-black hover:bg-gray-100">Price (High to Low)</SelectItem>
                  <SelectItem value="newest" className="text-black hover:bg-gray-100">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-80 flex-shrink-0">
              <div className="sticky top-8">
                <ProductFilters
                  onFiltersChange={setFilters}
                  maxPrice={maxPrice}
                  initialCategory={category}
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="mb-6">
                {isLoading ? (
                  <p className="text-gray-600">Loading products...</p>
                ) : (
                  <p className="text-gray-600">
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`}>
                    <Card className="group cursor-pointer hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-white border-gray-200">
                      <div className="relative aspect-square overflow-hidden rounded-t-lg">
                        <img
                          src={getProductImage(product)}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            // Fallback to default image if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.src = defaultImages.default;
                          }}
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          {product.is_featured && (
                            <Badge className="bg-primary text-white">Featured</Badge>
                          )}
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/90 backdrop-blur-sm text-black hover:bg-white"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleWishlist({
                                id: product.id,
                                name: product.name,
                                price: product.calculated_price ?? product.base_price ?? 0,
                                primary_image: product.primary_image,
                                category: product.category,
                              });
                            }}
                          >
                            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                          </Button>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {isInCart(product.id) ? (
                            <div className="flex gap-2">
                              <Button
                                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  navigate('/cart');
                                }}
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Go to Cart
                              </Button>
                              <Button
                                className="bg-red-500 hover:bg-red-600 text-white"
                                size="icon"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  removeByProductId(product.id);
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              className="w-full bg-primary hover:bg-primary/80 text-white"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const stock = product.stock_quantity ?? product.stock ?? 0;
                                if (stock <= 0) {
                                  toast({ title: "Out of stock", description: "This product is out of stock", variant: "destructive" });
                                  return;
                                }
                                addToCart({
                                  id: product.id,
                                  name: product.name,
                                  price: product.calculated_price ?? product.base_price ?? 0,
                                  primary_image: product.primary_image,
                                  category: product.category,
                                });
                              }}
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          )}
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
                            {formatCurrency(product.calculated_price ?? product.base_price ?? 0)}
                          </span>
                          <Badge
                            variant={(product.stock_quantity ?? 0) > 0 ? "secondary" : "destructive"}
                            className={(product.stock_quantity ?? 0) > 0 ? "bg-gray-100 text-black" : "bg-red-500 text-white"}
                          >
                            {(product.stock_quantity ?? 0) > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                          </Badge>
                        </div>

                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex justify-between">
                            <span>Material:</span>
                            <span>{product.material_name}</span>
                          </div>
                          {product.gemstone && (
                            <div className="flex justify-between">
                              <span>Gemstone:</span>
                              <span>{product.gemstone}</span>
                            </div>
                          )}
                          {product.weight && (
                            <div className="flex justify-between">
                              <span>Weight:</span>
                              <span>{product.weight}g</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">No products found matching your criteria.</p>
                  <Button 
                    className="mt-4 bg-primary hover:bg-primary/80 text-white" 
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({
                        categories: [],
                        metals: [],
                        purities: [],
                        gemstones: [],
                        priceRange: [0, maxPrice],
                        inStock: false,
                        featured: false,
                      });
                      setSortBy('name');
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductListing;
