import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiService } from '@/lib/apiService';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Search, Heart, ShoppingCart, SlidersHorizontal, X } from 'lucide-react';
import { formatCurrency } from '@/lib/currency';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { getProductImageUrl } from '@/lib/config';
import { useToast } from '@/hooks/use-toast';
import ProductFilters, { FilterState } from '@/components/ProductFilters';
import { productPath } from '@/lib/slug';

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
    metals: [], purities: [], gemstones: [],
    priceRange: [0, 300000], inStock: false, featured: false,
  });
  const [maxPrice, setMaxPrice] = useState(300000);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const apiFilters: Record<string, any> = { limit: 1000 };
        if (collection) apiFilters.collection = collection;
        const response = await apiService.getProducts(apiFilters);
        const allProducts = response.products ?? [];
        const maxP = allProducts.length > 0
          ? Math.max(...allProducts.map((p: any) => p.calculated_price ?? p.base_price ?? 0))
          : 300000;
        setMaxPrice(maxP);
        setFilters(prev => ({ ...prev, priceRange: [0, maxP] }));
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

  useEffect(() => {
    const cat = category ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() : '';
    setFilters(prev => ({ ...prev, categories: cat ? [cat] : [] }));
  }, [category]);

  useEffect(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (filters.categories.length > 0) {
      const lowerCats = filters.categories.map((c: string) => c.toLowerCase());
      filtered = filtered.filter(p => lowerCats.includes((p.category || '').toLowerCase()));
    }

    if (filters.metals.length > 0) {
      filtered = filtered.filter(p => filters.metals.includes(p.material_name ?? ''));
    }

    if (filters.purities.length > 0) {
      filtered = filtered.filter(p => filters.purities.includes(p.karat_value ?? ''));
    }

    if (filters.gemstones.length > 0) {
      filtered = filtered.filter(p => p.gemstone && filters.gemstones.includes(p.gemstone));
    }

    filtered = filtered.filter(p => {
      const price = p.calculated_price ?? p.base_price ?? 0;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    if (filters.inStock) filtered = filtered.filter(p => (p.stock_quantity ?? 0) > 0);
    if (filters.featured) filtered = filtered.filter(p => p.is_featured);

    filtered.sort((a, b) => {
      const pa = a.calculated_price ?? a.base_price ?? 0;
      const pb = b.calculated_price ?? b.base_price ?? 0;
      switch (sortBy) {
        case 'price-low': return pa - pb;
        case 'price-high': return pb - pa;
        case 'newest': return new Date(b.createdAt ?? b.created_at).getTime() - new Date(a.createdAt ?? a.created_at).getTime();
        default: return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, sortBy, filters]);

  const pageTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : collection
      ? collection.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Collection'
      : 'Products';

  return (
    <div className="bg-white min-h-screen">
      {/* Toolbar */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center gap-3 justify-between">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-sm border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brandgold"
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden h-9 border-gray-200 text-gray-600">
                  <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-5">
                <ProductFilters
                  onFiltersChange={setFilters}
                  maxPrice={maxPrice}
                  isMobile={true}
                  initialCategory={category}
                />
              </SheetContent>
            </Sheet>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-44 h-9 text-sm border-gray-200 text-gray-600">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters
                onFiltersChange={setFilters}
                maxPrice={maxPrice}
                initialCategory={category}
              />
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="flex items-baseline justify-between mb-6">
              <h1 className="text-2xl font-semibold text-brandblue">{pageTitle}</h1>
              <p className="text-sm text-gray-400">
                {isLoading ? 'Loading...' : `${filteredProducts.length} of ${products.length}`}
              </p>
            </div>

            {filteredProducts.length === 0 && !isLoading ? (
              <div className="text-center py-20">
                <p className="text-gray-400">No products match your filters.</p>
                <button
                  className="mt-3 text-sm text-brandgold hover:underline"
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      categories: [], metals: [], purities: [], gemstones: [],
                      priceRange: [0, maxPrice], inStock: false, featured: false,
                    });
                    setSortBy('name');
                  }}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                {filteredProducts.map((product) => {
                  const price = product.calculated_price ?? product.base_price ?? 0;
                  const stock = product.stock_quantity ?? product.stock ?? 0;
                  const inCart = isInCart(product.id);
                  const wishlisted = isInWishlist(product.id);

                  return (
                    <Link key={product.id} to={productPath(product.id, product.name)} className="group">
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={getProductImageUrl(product)}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Wishlist */}
                        <button
                          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist({
                              id: product.id, name: product.name, price,
                              primary_image: product.primary_image, category: product.category,
                            });
                          }}
                        >
                          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                        </button>

                        {/* Cart overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          {inCart ? (
                            <div className="flex gap-1.5">
                              <Button
                                size="sm"
                                className="flex-1 h-8 bg-brandblue hover:bg-brandblue/90 text-white text-xs"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('/cart'); }}
                              >
                                <ShoppingCart className="w-3 h-3 mr-1" /> Go to Cart
                              </Button>
                              <Button
                                size="sm"
                                className="h-8 w-8 p-0 bg-red-500 hover:bg-red-600 text-white"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeByProductId(product.id); }}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              className="w-full h-8 bg-white/95 backdrop-blur-sm hover:bg-white text-brandblue text-xs font-medium"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (stock <= 0) {
                                  toast({ title: "Out of stock", variant: "destructive" });
                                  return;
                                }
                                addToCart({
                                  id: product.id, name: product.name, price,
                                  primary_image: product.primary_image, category: product.category,
                                });
                              }}
                            >
                              <ShoppingCart className="w-3 h-3 mr-1" /> Add to Cart
                            </Button>
                          )}
                        </div>

                        {/* Sold out */}
                        {stock <= 0 && (
                          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                            <span className="text-xs font-medium uppercase tracking-wider text-gray-600 bg-white px-3 py-1 rounded-full">
                              Sold out
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="mt-3 space-y-1">
                        <p className="text-[11px] uppercase tracking-wider text-gray-400">
                          {product.category}
                          {product.material_name && <span> &middot; {product.material_name}</span>}
                        </p>
                        <h3 className="text-sm font-medium text-brandblue leading-snug group-hover:text-brandgold transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm font-semibold text-black">
                          {formatCurrency(price)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
