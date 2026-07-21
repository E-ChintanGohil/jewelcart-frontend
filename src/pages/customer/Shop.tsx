import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { apiService } from '@/lib/apiService';
import { formatCurrency } from '@/lib/currency';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { getProductImageUrl } from '@/lib/config';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ShoppingCart, Heart, X, Search } from 'lucide-react';
import { productPath } from '@/lib/slug';

interface Product {
  id: string | number;
  name: string;
  calculatedPrice?: number;
  calculated_price?: number;
  base_price?: number;
  price?: number;
  categoryName?: string;
  category?: string;
  imageUrl?: string;
  image_url?: string;
  primary_image?: string;
  description?: string;
  stockQuantity?: number;
  stock?: number;
  stock_quantity?: number;
  in_stock?: boolean;
  isActive?: boolean;
  is_featured?: boolean;
  material_name?: string;
  weight?: number;
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
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setLoadError(false);
      try {
        const [productsData, categoriesData] = await Promise.all([
          apiService.getProducts({ limit: 1000 }),
          apiService.getCategories()
        ]);
        setProducts(productsData.products || productsData);
        setCategories(categoriesData.categories || categoriesData);
      } catch (error) {
        console.error('Failed to load shop data:', error);
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [reloadKey]);

  const filteredProducts = products.filter(product => {
    if (selectedCategory && (product.categoryName || product.category) !== selectedCategory) {
      return false;
    }
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-brandgold" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <p className="text-lg font-medium text-brandblue">We couldn't load the collection.</p>
        <p className="mt-1 text-sm text-gray-500">
          Something went wrong on our side. Please try again in a moment.
        </p>
        <Button
          className="mt-5 bg-brandblue hover:bg-brandblue/90 text-white"
          onClick={() => setReloadKey((k) => k + 1)}
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <SEO
        title={searchQuery ? `Search: ${searchQuery} - Jewelcart` : "Shop Jewelry Online - Rings, Necklaces, Earrings & More | Jewelcart"}
        description={searchQuery
          ? `Search results for "${searchQuery}" at Jewelcart.`
          : "Shop our complete collection of handcrafted jewelry online."
        }
        image="/og-image.jpg"
      />

      {/* Page header */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          {searchQuery ? (
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <div>
                <h1 className="text-2xl font-semibold text-brandblue">
                  Results for "{searchQuery}"
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-baseline justify-between">
              <h1 className="text-2xl font-semibold text-brandblue">All Jewellery</h1>
              <p className="text-sm text-gray-500">{filteredProducts.length} products</p>
            </div>
          )}
        </div>
      </div>

      {/* Category strip */}
      {!searchQuery && (
        <div className="border-b border-gray-100 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-6 py-3 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setSelectedCategory('')}
                className={`shrink-0 pb-1 text-xs font-medium uppercase tracking-wider transition-colors border-b-2 ${
                  selectedCategory === ''
                    ? 'border-brandblue text-brandblue'
                    : 'border-transparent text-gray-400 hover:text-brandblue'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`shrink-0 pb-1 text-xs font-medium uppercase tracking-wider transition-colors border-b-2 ${
                    selectedCategory === cat.name
                      ? 'border-brandblue text-brandblue'
                      : 'border-transparent text-gray-400 hover:text-brandblue'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Product grid */}
      <div className="container mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products found.</p>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory('')}
                className="mt-3 text-sm text-brandgold hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart, isInCart, removeByProductId } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const navigate = useNavigate();
  const wishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const price = product.calculated_price ?? product.calculatedPrice ?? product.base_price ?? product.price ?? 0;
  const stock = product.stock ?? product.stockQuantity ?? product.stock_quantity ?? 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (stock <= 0 && !product.in_stock) {
      toast({ title: "Out of stock", description: "This product is out of stock", variant: "destructive" });
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price,
      primary_image: product.primary_image,
      category: product.category || product.categoryName,
    });
  };

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeByProductId(product.id);
  };

  return (
    <Link to={productPath(product.id, product.name)} className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={getProductImageUrl(product)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Wishlist button — always visible */}
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>

        {/* Cart action — bottom overlay on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {inCart ? (
            <div className="flex gap-1.5">
              <Button
                size="sm"
                className="flex-1 h-8 bg-brandblue hover:bg-brandblue/90 text-white text-xs"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/cart');
                }}
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Go to Cart
              </Button>
              <Button
                size="sm"
                className="h-8 w-8 p-0 bg-red-500 hover:bg-red-600 text-white"
                onClick={handleRemoveFromCart}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              className="w-full h-8 bg-white/95 backdrop-blur-sm hover:bg-white text-brandblue text-xs font-medium"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-3 h-3 mr-1" />
              Add to Cart
            </Button>
          )}
        </div>

        {/* Out of stock overlay */}
        {stock <= 0 && !product.in_stock && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-600 bg-white px-3 py-1 rounded-full">
              Sold out
            </span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="mt-3 space-y-1">
        <p className="text-[11px] uppercase tracking-wider text-gray-400">
          {product.categoryName || product.category}
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
}
