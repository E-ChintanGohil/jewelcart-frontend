import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { apiService } from '@/lib/apiService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/currency';
import { useToast } from '@/hooks/use-toast';
import {
  Truck,
  MapPin,
  Plus,
  Shield,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

interface Address {
  id: string;
  type: 'HOME' | 'WORK' | 'OTHER';
  contactName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export default function Checkout() {
  const { user } = useAuth();
  const { items: cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [currentStep, setCurrentStep] = useState<'address' | 'review'>('address');
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<string>('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountAmount: number;
    discountType: string;
    discountValue: number;
  } | null>(null);

  // New Address Form State
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    phone: '',
    type: 'HOME',
    isDefault: false
  });

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const fetchedAddresses = await apiService.getCustomerAddresses();
      setAddresses(fetchedAddresses);
      // Select default address if available
      const defaultAddr = fetchedAddresses.find((a: Address) => a.isDefault);
      if (defaultAddr) {
        setSelectedAddress(defaultAddr.id);
      } else if (fetchedAddresses.length > 0) {
        setSelectedAddress(fetchedAddresses[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    } finally {
      setLoadingAddresses(false);
    }
  };

  const subtotal = getTotalPrice();
  // Free shipping within Gujarat (home state), or on orders over ₹1,00,000.
  // State is free-typed, so normalise before matching (handles case/spacing and the
  // common "Gujrat" spelling).
  const shipState = (addresses.find(a => a.id === selectedAddress)?.state || '')
    .toLowerCase().replace(/[^a-z]/g, '');
  const isGujarat = shipState === 'gujarat' || shipState === 'gujrat';
  // Shipping is only known once a delivery address is chosen — until then it is
  // left out of the summary instead of showing a guess.
  const hasAddress = Boolean(selectedAddress);
  const shipping = (isGujarat || subtotal > 100000) ? 0 : 2000;
  const tax = subtotal * 0.03;
  const couponDiscount = appliedCoupon?.discountAmount ?? 0;
  const total = subtotal + (hasAddress ? shipping : 0) + tax - couponDiscount;

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    try {
      const result = await apiService.validateCoupon(couponInput.trim(), subtotal);
      setAppliedCoupon({
        code: result.code,
        discountAmount: result.discountAmount,
        discountType: result.discountType,
        discountValue: result.discountValue,
      });
      setCouponInput('');
      toast({ title: 'Coupon applied!', description: `Saving ${formatCurrency(result.discountAmount)}` });
    } catch (err: any) {
      toast({ title: 'Invalid coupon', description: err.message, variant: 'destructive' });
    } finally {
      setCouponLoading(false);
    }
  };

  const handleAddressNext = () => {
    if (!selectedAddress) {
      toast({ title: 'Address required', description: 'Please select a delivery address.', variant: 'destructive' });
      return;
    }
    setCurrentStep('review');
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsProcessing(true);
      const addedAddress = await apiService.addCustomerAddress(newAddress);
      setAddresses(prev => [addedAddress, ...prev]);
      setSelectedAddress(addedAddress.id);
      setShowAddressForm(false);
      setNewAddress({ name: '', street: '', city: '', state: '', zipCode: '', country: 'India', phone: '', type: 'HOME', isDefault: false });
    } catch (error) {
      console.error('Failed to add address:', error);
      toast({ title: 'Failed to add address', description: 'Please try again.', variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    let dbOrderId: number | null = null;

    try {
      const selectedAddr = addresses.find(a => a.id === selectedAddress);
      if (!selectedAddr) throw new Error('Address not found');

      // Step 1: Create DB order
      const dbOrder = await apiService.createCustomerOrder({
        billingAddressId: parseInt(selectedAddress),
        shippingAddressId: parseInt(selectedAddress),
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        subtotal,
        taxAmount: tax,
        shippingAmount: shipping,
        couponCode: appliedCoupon?.code,
      });
      dbOrderId = dbOrder.id;

      // Step 2: Create Razorpay order (backend generates order_id)
      const rzpOrderData = await apiService.createRazorpayOrder(total, dbOrderId!);

      // Step 3: Open Razorpay modal
      const options = {
        key: rzpOrderData.key,
        amount: rzpOrderData.amount,
        currency: rzpOrderData.currency,
        name: 'JewelCart',
        description: `Order #${dbOrder.orderNumber}`,
        image: '/logo.png',
        order_id: rzpOrderData.razorpay_order_id,
        handler: async function (response: any) {
          try {
            // Step 4: Verify payment signature on backend
            await apiService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              db_order_id: dbOrderId!,
            });

            clearCart();
            navigate(`/order-success?order=${encodeURIComponent(dbOrder.orderNumber)}`, {
              state: {
                orderId: dbOrder.id,
                orderNumber: dbOrder.orderNumber,
                amount: total,
              },
            });
          } catch {
            toast({
              title: 'Payment verification failed',
              description: 'Your payment was received but verification failed. Please contact support with your payment ID.',
              variant: 'destructive',
            });
            setIsProcessing(false);
          }
        },
        prefill: {
          name: selectedAddr.contactName,
          email: user?.email,
          contact: selectedAddr.phone,
        },
        notes: {
          order_id: dbOrder.id,
          order_number: dbOrder.orderNumber,
        },
        theme: { color: '#D97706' },
        modal: {
          ondismiss: () => setIsProcessing(false),
        },
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.on('payment.failed', async function (response: any) {
        try {
          if (dbOrderId) await apiService.markPaymentFailed(dbOrderId);
        } catch { /* best-effort */ }
        toast({
          title: 'Payment failed',
          description: response.error?.description || 'Please try again from your order history.',
          variant: 'destructive',
        });
        setIsProcessing(false);
      });

      rzp.open();
    } catch (error: any) {
      toast({
        title: 'Order could not be placed',
        description: error.message || 'Please try again.',
        variant: 'destructive',
      });
      setIsProcessing(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to checkout</h1>
        <Button onClick={() => navigate('/login', { state: { from: '/checkout' } })}>Login</Button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
      </div>
    );
  }

  const selectedAddressData = addresses.find(a => a.id === selectedAddress);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/cart')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center space-x-4">
          <div className={`flex items-center ${currentStep === 'address' ? 'text-amber-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep === 'address' ? 'border-amber-600 bg-amber-50' : 'border-gray-300'}`}>
              1
            </div>
            <span className="ml-2 font-medium">Address</span>
          </div>
          <div className="w-16 h-px bg-gray-300"></div>
          <div className={`flex items-center ${currentStep === 'review' ? 'text-amber-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep === 'review' ? 'border-amber-600 bg-amber-50' : 'border-gray-300'}`}>
              2
            </div>
            <span className="ml-2 font-medium">Review & Pay</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Address Step */}
          {currentStep === 'address' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loadingAddresses ? (
                  <div className="text-center py-4">Loading addresses...</div>
                ) : (
                  <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                    {addresses.map((address) => (
                      <div key={address.id} className="border rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Label htmlFor={address.id} className="font-semibold">
                                {address.contactName}
                              </Label>
                              <Badge variant="outline">{address.type}</Badge>
                              {address.isDefault && <Badge>Default</Badge>}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{address.street}</p>
                            <p className="text-sm text-gray-600 mb-1">
                              {address.city}, {address.state} - {address.zipCode}
                            </p>
                            <p className="text-sm text-gray-600">Phone: {address.phone}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {showAddressForm ? (
                  <form onSubmit={handleAddAddress} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                    <h3 className="font-semibold">Add New Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Contact Name</Label>
                        <Input
                          id="name"
                          value={newAddress.name}
                          onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          value={newAddress.street}
                          onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input
                          id="zipCode"
                          value={newAddress.zipCode}
                          onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Address Type</Label>
                        <select
                          id="type"
                          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={newAddress.type}
                          onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                        >
                          <option value="HOME">Home</option>
                          <option value="WORK">Work</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setShowAddressForm(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isProcessing}>
                        {isProcessing ? 'Saving...' : 'Save Address'}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowAddressForm(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Address
                  </Button>
                )}

                <div className="flex justify-end">
                  <Button onClick={handleAddressNext} className="bg-amber-600 hover:bg-amber-700">
                    Review Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Review Step */}
          {currentStep === 'review' && (
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image_url || item.imageUrl || '/placeholder.svg'}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary">{item.category || item.categoryName}</Badge>
                            <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            {formatCurrency(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                      {index < cartItems.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Address</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedAddressData && (
                    <div>
                      <div className="font-semibold">{selectedAddressData.contactName}</div>
                      <p className="text-gray-600">{selectedAddressData.street}</p>
                      <p className="text-gray-600">
                        {selectedAddressData.city}, {selectedAddressData.state} - {selectedAddressData.zipCode}
                      </p>
                      <p className="text-gray-600">Phone: {selectedAddressData.phone}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep('address')}>
                  Back
                </Button>
                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isProcessing ? 'Processing...' : `Place Order - ${formatCurrency(total)}`}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span className="font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              {hasAddress && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (3%)</span>
                <span className="font-semibold">{formatCurrency(tax)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-700">
                  <span className="flex items-center gap-1">
                    Coupon <Badge variant="outline" className="text-xs">{appliedCoupon.code}</Badge>
                    <button className="text-xs underline ml-1" onClick={() => setAppliedCoupon(null)}>remove</button>
                  </span>
                  <span className="font-semibold">−{formatCurrency(appliedCoupon.discountAmount)}</span>
                </div>
              )}

              {/* Coupon Input */}
              {!appliedCoupon && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Coupon code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    className="text-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponInput.trim()}
                    className="shrink-0"
                  >
                    {couponLoading ? '...' : 'Apply'}
                  </Button>
                </div>
              )}

              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-amber-600">{formatCurrency(total)}</span>
              </div>

              {!hasAddress ? null : isGujarat ? (
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800">
                    Free shipping to Gujarat applied.
                  </p>
                </div>
              ) : shipping > 0 && (
                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="text-sm text-amber-800">
                    Add {formatCurrency(100000 - subtotal)} more for free shipping!
                  </p>
                </div>
              )}

              <div className="space-y-2 pt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span>Free shipping in Gujarat, or on orders over ₹1,00,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-purple-600" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}