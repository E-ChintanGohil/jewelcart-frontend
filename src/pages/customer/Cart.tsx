import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/currency';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  category: string;
}

export default function Cart() {
  const { items: cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100000 ? 0 : 2000; // Free shipping over ₹1,00,000
  const tax = subtotal * 0.03; // 3% tax
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Looks like you haven't added any items to your cart yet.
          Start shopping to fill it up!
        </p>
        <Link to="/shop">
          <Button className="bg-amber-600 hover:bg-amber-700">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.productId}`}
                        className="font-semibold text-gray-900 hover:text-amber-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary">{item.category}</Badge>
                        <span className="text-sm text-gray-600">
                          {formatCurrency(item.price)} each
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-1"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (3%)</span>
                <span className="font-semibold">{formatCurrency(tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-amber-600">{formatCurrency(total)}</span>
              </div>

              {shipping > 0 && (
                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="text-sm text-amber-800">
                    Add {formatCurrency(100000 - subtotal)} more for free shipping!
                  </p>
                </div>
              )}

              <div className="space-y-3 pt-4">
                <Link to="/checkout">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Security Badge */}
          <Card className="mt-4">
            <CardContent className="p-4 text-center">
              <div className="text-sm text-gray-600">
                <p className="font-semibold mb-2">Secure Checkout</p>
                <p>Your information is protected with 256-bit SSL encryption</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}