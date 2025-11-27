import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { Product } from '@/lib/localStorage';
import { apiService } from '@/lib/apiService';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart, Star, ArrowLeft, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '@/lib/currency';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        try {
          setLoading(true);
          const foundProduct = await apiService.getProduct(id);
          if (foundProduct) {
            setProduct(foundProduct);

            // Get similar products (same category, different product)
            const allProductsData = await apiService.getProducts();
            const allProducts = allProductsData.products || allProductsData;
            const similar = allProducts
              .filter(p => (p.categoryName || p.category) === (foundProduct.categoryName || foundProduct.category) && p.id !== foundProduct.id)
              .slice(0, 5);
            setSimilarProducts(similar);
          }
        } catch (error) {
          console.error('Failed to load product:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProduct();
  }, [id]);


  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button className="bg-black hover:bg-gray-800 text-white">
              Back to Products
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={product ? `${product.name} - ${product.categoryName || 'Jewelry'} | Jewelcart` : "Product Details - Jewelcart"}
        description={product ? `${product.description || `Buy ${product.name} from Jewelcart. Premium quality ${product.categoryName || 'jewelry'} with secure payment and free shipping on orders above ₹1,00,000.`}` : "View product details at Jewelcart"}
        image={product?.imageUrl || product?.image_url || "/og-image.jpg"}
        keywords={product ? `${product.name}, ${product.categoryName}, jewelry, ${product.categoryName || 'jewelry'} online, buy ${product.categoryName || 'jewelry'}, premium jewelry` : "jewelry, product details"}
      />
      <Header />
      
      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <Link to={`/products/${(product.categoryName || product.category)?.toLowerCase()}`} className="hover:text-black">
              {product.categoryName || product.category}
            </Link>
            <span>/</span>
            <span className="text-black">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={(product.images && product.images[selectedImage]) || (product.images && product.images[0]) || product.imageUrl || '/placeholder-jewelry.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-black' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-black mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-black">
                    {formatCurrency(product.calculatedPrice || product.price || 0)}
                  </span>
                  {product.isFeatured && (
                    <Badge className="bg-black text-white">Featured</Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-600 ml-2">(4.8) 124 reviews</span>
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>

              {/* Product Details */}
              <div className="space-y-3 py-4 border-t border-gray-200">
                {product.materialName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Material:</span>
                    <span className="text-black font-medium">
                      {product.materialName} - {product.karatValue}
                    </span>
                  </div>
                )}
                {product.gemstone && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gemstone:</span>
                    <span className="text-black font-medium">{product.gemstone}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="text-black font-medium">{product.weight}g</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span className="text-black font-medium">{product.sku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Availability:</span>
                  <Badge variant={(product.stockQuantity || product.stock || 0) > 0 ? "secondary" : "destructive"}>
                    {(product.stockQuantity || product.stock || 0) > 0 ? `${product.stockQuantity || product.stock} in stock` : 'Out of stock'}
                  </Badge>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity || product.stock || 0, quantity + 1))}
                    className="p-2 hover:bg-gray-100"
                    disabled={quantity >= (product.stockQuantity || product.stock || 0)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button
                  className="flex-1 bg-black hover:bg-gray-800 text-white"
                  disabled={(product.stockQuantity || product.stock || 0) === 0}
                  onClick={() => product && addToCart(product, quantity)}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="border-black text-black hover:bg-black hover:text-white">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Certifications */}
              {product.certification && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-black mb-2">Certification</h3>
                  <p className="text-sm text-gray-600">{product.certification}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">Similar Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {similarProducts.map((similar) => (
                <Link key={similar.id} to={`/product/${similar.id}`}>
                  <Card className="group cursor-pointer hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={(similar.images && similar.images[0]) || similar.imageUrl || '/placeholder-jewelry.jpg'}
                        alt={similar.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-black mb-2 line-clamp-2">{similar.name}</h3>
                      <p className="text-xl font-bold text-black">{formatCurrency(similar.calculatedPrice || similar.price || 0)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetails;
