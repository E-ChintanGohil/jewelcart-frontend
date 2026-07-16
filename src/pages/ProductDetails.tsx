import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { Product } from '@/lib/localStorage';
import { apiService } from '@/lib/apiService';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Minus, Plus, X, ChevronRight, Lock, RotateCcw, Truck } from 'lucide-react';
import { formatCurrency } from '@/lib/currency';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { resolveImageUrl, getProductImageUrl } from '@/lib/config';

const imgUrl = (src?: string | null) =>
  resolveImageUrl(src) || getProductImageUrl({});

// Color swatch styles
const COLOR_SWATCHES: Record<string, { label: string; bg: string; ring: string }> = {
  yellow: { label: 'Yellow', bg: 'linear-gradient(135deg, #f4d35e, #e8b923)', ring: '#d4a015' },
  white: { label: 'White', bg: 'linear-gradient(135deg, #f0f0f0, #c8c8c8)', ring: '#a8a8a8' },
  rose: { label: 'Rose', bg: 'linear-gradient(135deg, #f7cac9, #e8a899)', ring: '#c98777' },
};

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, isInCart, removeByProductId } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedPurity, setSelectedPurity] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        try {
          setLoading(true);
          const foundProduct = await apiService.getProduct(id);
          if (foundProduct) {
            setProduct(foundProduct);
            const fp: any = foundProduct;
            const colors: string[] = fp.availableColors || fp.available_colors || [];
            const purities: string[] = fp.availablePurities || fp.available_purities || [];
            setSelectedColor(fp.defaultColor || fp.default_color || colors[0] || '');
            setSelectedPurity(fp.defaultPurity || fp.default_purity || purities[0] || '');
            const sMin = fp.sizeMin ?? fp.size_min;
            if (sMin != null) setSelectedSize(sMin);
            const allProductsData = await apiService.getProducts();
            const allProducts = allProductsData.products || allProductsData;
            const similar = allProducts
              .filter(p => (p.categoryName || p.category) === (foundProduct.categoryName || foundProduct.category) && p.id !== foundProduct.id)
              .slice(0, 4);
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-brandgold border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-semibold text-brandblue mb-2">Product not found</h1>
        <p className="text-gray-500 mb-6">This product may have been removed or doesn't exist.</p>
        <Link to="/shop" className="text-sm text-brandgold hover:underline">
          Browse all jewellery
        </Link>
      </div>
    );
  }

  const price = product.calculatedPrice || product.price || 0;
  const stock = product.stockQuantity || product.stock || 0;
  const inCart = isInCart(product.id);
  const wishlisted = isInWishlist(product.id);
  const images = product.images && product.images.length > 0
    ? product.images
    : [product.imageUrl || product.image_url];
  const categorySlug = (product.categoryName || product.category || '').toLowerCase();

  return (
    <div className="bg-white">
      <SEO
        title={`${product.name} - ${product.categoryName || 'Jewelry'} | Jewelcart`}
        description={product.description || `Buy ${product.name} from Jewelcart.`}
        image={product.imageUrl || product.image_url || "/og-image.jpg"}
      />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link to="/" className="hover:text-brandblue transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/products/${categorySlug}`} className="hover:text-brandblue transition-colors">
              {product.categoryName || product.category}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brandblue">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product section */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">

          {/* Images */}
          <div className="space-y-3">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={imgUrl(images[selectedImage])}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {images.map((image, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden transition-all ${
                      selectedImage === i
                        ? 'ring-2 ring-brandblue ring-offset-1'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl(image)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-2">
              {product.categoryName || product.category}
              {product.materialName && ` · ${product.materialName}`}
              {product.karatValue && ` · ${product.karatValue}`}
            </p>

            <h1 className="text-2xl lg:text-3xl font-semibold text-brandblue leading-tight">
              {product.name}
            </h1>

            <p className="text-2xl font-semibold text-black mt-3">
              {formatCurrency(price)}
            </p>

            {/* Stock status */}
            <p className={`text-xs mt-2 ${stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {stock > 0 ? `In stock · ${stock} available` : 'Out of stock'}
            </p>

            {/* Description */}
            {product.description && (
              <p className="text-sm text-gray-500 leading-relaxed mt-6">
                {product.description}
              </p>
            )}

            {/* PDP Options: Color / Purity / Size */}
            {(() => {
              const fp: any = product;
              const colors: string[] = fp.availableColors || fp.available_colors || [];
              const purities: string[] = fp.availablePurities || fp.available_purities || [];
              const sMin = fp.sizeMin ?? fp.size_min;
              const sMax = fp.sizeMax ?? fp.size_max;
              const sUnit = fp.sizeUnit || fp.size_unit;
              const showColors = colors.length > 0;
              const showPurities = purities.length > 0;
              const showSize = sUnit && sMin != null && sMax != null;
              if (!showColors && !showPurities && !showSize) return null;
              const sizeLabel = sUnit === 'ring' ? 'Ring Size' : sUnit === 'inch' ? 'Length (inches)' : sUnit === 'cm' ? 'Length (cm)' : 'Size';
              const sizes: number[] = [];
              if (showSize) for (let i = sMin; i <= sMax; i++) sizes.push(i);
              return (
                <div className="mt-6 space-y-4">
                  {showColors && (
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2">Color</p>
                      <div className="flex gap-2">
                        {colors.map(c => {
                          const swatch = COLOR_SWATCHES[c] || { label: c, bg: '#e5e7eb', ring: '#9ca3af' };
                          const active = selectedColor === c;
                          return (
                            <button
                              key={c}
                              onClick={() => setSelectedColor(c)}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-md border transition-colors ${active ? 'border-brandblue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                              <span className="w-4 h-4 rounded-full" style={{ background: swatch.bg, boxShadow: `inset 0 0 0 1px ${swatch.ring}` }} />
                              <span className={`text-xs ${active ? 'text-brandblue font-medium' : 'text-gray-600'}`}>{swatch.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {showPurities && (
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2">Metal Purity</p>
                      <div className="flex flex-wrap gap-1.5">
                        {purities.map(p => {
                          const active = selectedPurity === p;
                          return (
                            <button
                              key={p}
                              onClick={() => setSelectedPurity(p)}
                              className={`px-3 py-1.5 rounded text-xs transition-colors ${active ? 'bg-brandblue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                              {p}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {showSize && (
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2">{sizeLabel}</p>
                      <select
                        value={selectedSize ?? ''}
                        onChange={(e) => setSelectedSize(parseInt(e.target.value))}
                        className="w-32 h-10 border border-gray-200 rounded-md px-3 text-sm bg-gray-50/50 focus:bg-white focus:border-brandgold"
                      >
                        {sizes.map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Specs */}
            <div className="mt-6 space-y-0 border-t border-gray-100">
              {product.materialName && (
                <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
                  <span className="text-gray-400">Purity</span>
                  <span className="text-brandblue font-medium">{product.materialName}{product.karatValue ? ` — ${product.karatValue}` : ''}</span>
                </div>
              )}
              {product.gemstone && (
                <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
                  <span className="text-gray-400">Gemstone</span>
                  <span className="text-brandblue font-medium">{product.gemstone}</span>
                </div>
              )}
              {/* Weight shown only for weight-based products — hidden for fixed-price items */}
              {!product.is_fixed_price && !product.fixed_price && product.weight ? (
                <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
                  <span className="text-gray-400">Weight</span>
                  <span className="text-brandblue font-medium">{product.weight}g</span>
                </div>
              ) : null}
              {product.sku && (
                <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
                  <span className="text-gray-400">SKU</span>
                  <span className="text-gray-500 font-mono text-xs">{product.sku}</span>
                </div>
              )}
            </div>

            {/* Quantity + Actions */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-gray-400">Qty</span>
                <div className="flex items-center border border-gray-200 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-400 hover:text-brandblue transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium text-brandblue">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                    className="p-2 text-gray-400 hover:text-brandblue transition-colors"
                    disabled={quantity >= stock}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                {inCart ? (
                  <>
                    <Button
                      className="flex-1 h-12 bg-brandblue hover:bg-brandblue/90 text-white font-medium tracking-wide"
                      onClick={() => navigate('/cart')}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Go to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300"
                      onClick={() => removeByProductId(product.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Button
                    className="flex-1 h-12 bg-brandblue hover:bg-brandblue/90 text-white font-medium tracking-wide"
                    disabled={stock === 0}
                    onClick={() => addToCart(product, quantity)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className={`h-12 w-12 transition-colors ${
                    wishlisted
                      ? 'border-red-200 text-red-500 hover:bg-red-50'
                      : 'border-gray-200 text-gray-400 hover:text-brandblue hover:border-brandblue'
                  }`}
                  onClick={() => toggleWishlist(product as any)}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Trust strip */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Truck className="w-3.5 h-3.5" />
                <span>Free shipping over &#8377;1,00,000</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>30-day returns</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Lock className="w-3.5 h-3.5" />
                <span>Secure checkout</span>
              </div>
            </div>

            {/* Certification */}
            {product.certification && (
              <div className="mt-4 px-4 py-3 bg-gray-50 rounded-md">
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Certification</p>
                <p className="text-sm text-brandblue">{product.certification}</p>
              </div>
            )}
          </div>
        </div>

        {/* Diamond + Other Stones + Price Breakup tables */}
        {(() => {
          const fp: any = product;
          const dd = fp.diamondDetails || fp.diamond_details;
          const sd: any[] = fp.stoneDetails || fp.stone_details || [];
          const pb: any[] = fp.priceBreakup || fp.price_breakup || [];
          const hasDiamond = dd && (dd.shape || dd.count != null || dd.totalWeight != null || dd.color || dd.clarity || dd.sizeRange || dd.size_range);
          const hasStones = sd.length > 0;
          const hasBreakup = pb.length > 0;
          if (!hasDiamond && !hasStones && !hasBreakup) return null;

          const tableHeader = "text-[11px] uppercase tracking-wider text-gray-400 px-4 py-2.5 border-b border-gray-200 text-left font-medium";
          const tableCell = "px-4 py-2.5 border-b border-gray-100 text-sm text-brandblue";
          const sectionTitle = "text-sm font-semibold text-brandblue mb-3";

          return (
            <div className="mt-12 grid lg:grid-cols-2 gap-8">
              {/* Diamond Details */}
              {hasDiamond && (
                <div>
                  <h3 className={sectionTitle}>Diamond Details</h3>
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        {dd.shape && <tr><td className={tableCell + ' text-gray-400 w-1/3'}>Shape</td><td className={tableCell}>{dd.shape}</td></tr>}
                        {dd.count != null && <tr><td className={tableCell + ' text-gray-400'}>No. of Diamonds</td><td className={tableCell}>{dd.count}</td></tr>}
                        {(dd.totalWeight != null || dd.total_weight != null) && <tr><td className={tableCell + ' text-gray-400'}>Total Weight</td><td className={tableCell}>{dd.totalWeight ?? dd.total_weight} ct</td></tr>}
                        {dd.color && <tr><td className={tableCell + ' text-gray-400'}>Color</td><td className={tableCell}>{dd.color}</td></tr>}
                        {dd.clarity && <tr><td className={tableCell + ' text-gray-400'}>Clarity</td><td className={tableCell}>{dd.clarity}</td></tr>}
                        {(dd.sizeRange || dd.size_range) && <tr><td className={tableCell + ' text-gray-400'}>Size Range</td><td className={tableCell}>{dd.sizeRange || dd.size_range}</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Other Stones */}
              {hasStones && (
                <div>
                  <h3 className={sectionTitle}>Other Stones</h3>
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className={tableHeader}>Name</th>
                          <th className={tableHeader}>No. of Stones</th>
                          <th className={tableHeader}>Total Weight</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sd.map((s, i) => (
                          <tr key={i}>
                            <td className={tableCell}>{s.name}</td>
                            <td className={tableCell}>{s.count ?? '—'}</td>
                            <td className={tableCell}>{(s.totalWeight ?? s.total_weight) != null ? `${s.totalWeight ?? s.total_weight} g` : '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Price Breakup */}
              {hasBreakup && (
                <div className={hasDiamond && hasStones ? 'lg:col-span-2' : ''}>
                  <h3 className={sectionTitle}>Price Breakup</h3>
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className={tableHeader}>Particulars</th>
                          <th className={tableHeader + ' text-right'}>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pb.map((b, i) => (
                          <tr key={i}>
                            <td className={tableCell}>{b.label}</td>
                            <td className={tableCell + ' text-right'}>{formatCurrency(b.amount)}</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-50">
                          <td className={tableCell + ' font-semibold'}>Total</td>
                          <td className={tableCell + ' text-right font-semibold'}>{formatCurrency(pb.reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0))}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Final price may vary based on actual weight and current metal rates.</p>
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="border-t border-gray-100">
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-lg font-semibold text-brandblue mb-6">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
              {similarProducts.map((similar) => (
                <Link key={similar.id} to={`/product/${similar.id}`} className="group">
                  <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={imgUrl(similar.primary_image || (similar.images && similar.images[0]) || similar.imageUrl || similar.image_url)}
                      alt={similar.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-3 space-y-1">
                    <p className="text-[11px] uppercase tracking-wider text-gray-400">
                      {similar.categoryName || similar.category}
                    </p>
                    <h3 className="text-sm font-medium text-brandblue group-hover:text-brandgold transition-colors leading-snug">
                      {similar.name}
                    </h3>
                    <p className="text-sm font-semibold text-black">
                      {formatCurrency(similar.calculatedPrice || similar.price || 0)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
