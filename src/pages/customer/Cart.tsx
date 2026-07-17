import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/currency';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Lock } from 'lucide-react';
import { getProductImageUrl } from '@/lib/config';

export default function Cart() {
  const { items: cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100000 ? 0 : 2000;
  const tax = subtotal * 0.03;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
        <h1 className="text-2xl font-semibold text-brandblue mb-1">Your cart is empty</h1>
        <p className="text-sm text-gray-400 mb-6">Add some pieces to get started.</p>
        <Link to="/shop">
          <Button className="bg-brandblue hover:bg-brandblue/90 text-white h-10 px-6 text-sm">
            Browse Jewellery
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-8">
          <h1 className="text-2xl font-semibold text-brandblue">Cart</h1>
          <p className="text-sm text-gray-400">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-0">
            {/* Column headers — desktop */}
            <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-6 pb-3 border-b border-gray-200 text-[11px] uppercase tracking-wider text-gray-400">
              <span>Product</span>
              <span className="w-28 text-center">Quantity</span>
              <span className="w-24 text-right">Total</span>
              <span className="w-8" />
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[80px_1fr] md:grid-cols-[1fr_auto_auto_auto] gap-4 md:gap-6 py-5 border-b border-gray-100 items-center"
              >
                {/* Product */}
                <div className="col-span-2 md:col-span-1 flex items-center gap-4">
                  <Link to={`/product/${item.productId}`} className="flex-shrink-0">
                    <img
                      src={item.image_url || getProductImageUrl({ category: item.category })}
                      alt={item.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md bg-gray-100"
                    />
                  </Link>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-gray-400">{item.category}</p>
                    <Link
                      to={`/product/${item.productId}`}
                      className="text-sm font-medium text-brandblue hover:text-brandgold transition-colors leading-snug line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-0.5">{formatCurrency(item.price)}</p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="w-28 flex items-center justify-center">
                  <div className="flex items-center border border-gray-200 rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 text-gray-400 hover:text-brandblue transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-brandblue">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.stock != null && item.quantity >= item.stock}
                      className="p-1.5 text-gray-400 hover:text-brandblue transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-400"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="w-24 text-right">
                  <span className="text-sm font-semibold text-black">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>

                {/* Remove */}
                <div className="w-8 flex justify-center">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Link to="/shop" className="text-sm text-brandgold hover:underline">
                Continue shopping
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-brandblue">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-black">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-black'}`}>
                    {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax (3%)</span>
                  <span className="font-medium text-black">{formatCurrency(tax)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-gray-400">
                  Add {formatCurrency(100000 - subtotal)} more for free shipping
                </p>
              )}

              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-sm font-semibold text-brandblue">Total</span>
                <span className="text-lg font-semibold text-black">{formatCurrency(total)}</span>
              </div>

              <Button
                className="w-full h-12 bg-brandblue hover:bg-brandblue/90 text-white font-medium tracking-wide"
                onClick={() => navigate('/checkout')}
              >
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                <Lock className="w-3 h-3" />
                <span>Secure checkout with SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
