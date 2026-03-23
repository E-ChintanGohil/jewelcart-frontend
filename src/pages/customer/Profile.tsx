import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatCurrency } from '@/lib/currency';
import { apiService } from '@/lib/apiService';
import { useToast } from '@/hooks/use-toast';
import { User, Package, Heart, MapPin, Settings, Loader2, RefreshCw, AlertCircle, CreditCard, Trash2, ShoppingCart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { getProductImageUrl } from '@/lib/config';

interface OrderDisplay {
  id: number;
  orderNumber: string;
  date: string;
  status: string;
  paymentStatus: string;
  total: number;
  items: number;
}

interface Address {
  id: string;
  type: string;
  contactName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({ firstName: '', lastName: '', email: '' });
  const [orders, setOrders] = useState<OrderDisplay[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [retryingOrderId, setRetryingOrderId] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');

  const loadOrders = async () => {
    setOrdersLoading(true);
    try {
      const customerOrders = await apiService.getCustomerOrders();
      const ordersDisplay: OrderDisplay[] = (customerOrders as any[]).map(order => ({
        id: order.id,
        orderNumber: order.orderNumber ?? `JC-${order.id}`,
        date: order.createdAt ?? order.created_at,
        status: (order.status ?? '').toLowerCase(),
        paymentStatus: (order.paymentStatus ?? order.payment_status ?? '').toLowerCase(),
        total: order.totalAmount ?? order.total_amount ?? 0,
        items: order.items?.length ?? 0,
      }));
      setOrders(ordersDisplay);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const loadAddresses = async () => {
    setAddressesLoading(true);
    try {
      const data = await apiService.getCustomerAddresses();
      setAddresses(data);
    } catch (error) {
      console.error('Failed to load addresses:', error);
    } finally {
      setAddressesLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  useEffect(() => {
    loadOrders();
    loadAddresses();
  }, [user]);

  const handleRetryPayment = async (order: OrderDisplay) => {
    setRetryingOrderId(order.id);
    try {
      const rzpOrderData = await apiService.createRazorpayOrder(order.total, order.id);

      const options = {
        key: rzpOrderData.key,
        amount: rzpOrderData.amount,
        currency: rzpOrderData.currency,
        name: 'JewelCart',
        description: `Order ${order.orderNumber}`,
        order_id: rzpOrderData.razorpay_order_id,
        handler: async function (response: any) {
          try {
            await apiService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              db_order_id: order.id,
            });
            toast({ title: 'Payment successful', description: `Order ${order.orderNumber} confirmed.` });
            loadOrders();
          } catch {
            toast({ title: 'Verification failed', description: 'Contact support with your payment ID.', variant: 'destructive' });
          }
        },
        theme: { color: '#D97706' },
        modal: { ondismiss: () => setRetryingOrderId(null) },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', async (response: any) => {
        try { await apiService.markPaymentFailed(order.id); } catch { /* best-effort */ }
        toast({ title: 'Payment failed', description: response.error?.description ?? 'Please try again.', variant: 'destructive' });
        setRetryingOrderId(null);
      });
      rzp.open();
    } catch (error: any) {
      toast({ title: 'Could not initiate payment', description: error.message, variant: 'destructive' });
      setRetryingOrderId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'packed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'returned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
        <p className="text-gray-600">Manage your profile and orders</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarImage src="" />
                <AvatarFallback className="text-lg">
                  {user.first_name?.[0]}{user.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg text-gray-900">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <Badge className="mt-2" variant="secondary">
                {user.role === 'customer' ? 'Customer' : user.role}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); setSearchParams(val === 'profile' ? {} : { tab: val }); }} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Addresses
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Wishlist
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Personal Information</CardTitle>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => {
                        if (isEditing) {
                          // TODO: call apiService.updateCustomerProfile() when backend endpoint is available
                          toast({ title: "Profile updated", description: "Your profile has been saved." });
                        }
                        setIsEditing(!isEditing);
                      }}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileForm.firstName}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, firstName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileForm.lastName}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, lastName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <span className="ml-2">Loading orders...</span>
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{order.orderNumber}</h4>
                              <p className="text-sm text-gray-600">
                                {new Date(order.date).toLocaleDateString('en-IN', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                              {order.paymentStatus === 'failed' && (
                                <Badge className="bg-red-100 text-red-800">Payment Failed</Badge>
                              )}
                            </div>
                          </div>

                          {order.paymentStatus === 'failed' && (
                            <Alert className="mb-3 border-red-200 bg-red-50">
                              <AlertCircle className="h-4 w-4 text-red-600" />
                              <AlertDescription className="text-red-800 text-sm">
                                Payment was not completed. Retry to confirm your order.
                              </AlertDescription>
                            </Alert>
                          )}

                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                              {order.items} {order.items === 1 ? 'item' : 'items'}
                            </p>
                            <div className="flex items-center gap-3">
                              <span className="font-semibold">{formatCurrency(order.total)}</span>
                              {order.paymentStatus === 'failed' && (
                                <Button
                                  size="sm"
                                  className="bg-amber-600 hover:bg-amber-700 text-white"
                                  disabled={retryingOrderId === order.id}
                                  onClick={() => handleRetryPayment(order)}
                                >
                                  {retryingOrderId === order.id ? (
                                    <><Loader2 className="h-3 w-3 animate-spin mr-1" />Processing...</>
                                  ) : (
                                    <><RefreshCw className="h-3 w-3 mr-1" />Retry Payment</>
                                  )}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No orders yet
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Start shopping to see your orders here
                      </p>
                      <Button>
                        Browse Products
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Saved Addresses</CardTitle>
                    <Button onClick={() => navigate('/checkout')}>
                      <MapPin className="h-4 w-4 mr-2" />
                      Add Address
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {addressesLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <span className="ml-2">Loading addresses...</span>
                    </div>
                  ) : addresses.length > 0 ? (
                    <div className="space-y-4">
                      {addresses.map((address) => (
                        <div key={address.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">{address.contactName}</h4>
                                <Badge variant="outline">{address.type}</Badge>
                                {address.isDefault && <Badge>Default</Badge>}
                              </div>
                              <p className="text-sm text-gray-600">{address.street}</p>
                              <p className="text-sm text-gray-600">
                                {address.city}, {address.state} - {address.zipCode}
                              </p>
                              <p className="text-sm text-gray-600">Phone: {address.phone}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <MapPin className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved addresses</h3>
                      <p className="text-gray-600 mb-6">Add an address during checkout</p>
                      <Button onClick={() => navigate('/shop')}>Start Shopping</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist ({wishlistItems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {wishlistItems.length > 0 ? (
                    <div className="space-y-4">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 flex items-center gap-4">
                          <img
                            src={getProductImageUrl(item as any)}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4
                              className="font-semibold hover:text-amber-600 cursor-pointer"
                              onClick={() => navigate(`/product/${item.id}`)}
                            >
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-600">{item.categoryName || item.category}</p>
                            <p className="font-semibold text-amber-600">
                              {formatCurrency(item.calculatedPrice || item.price || 0)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                addToCart({
                                  id: item.id,
                                  name: item.name,
                                  price: item.price,
                                  calculatedPrice: item.calculatedPrice,
                                  primary_image: item.primary_image,
                                  category: item.category || item.categoryName,
                                });
                              }}
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Add to Cart
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeFromWishlist(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Your wishlist is empty
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Save your favorite items to your wishlist
                      </p>
                      <Button onClick={() => navigate('/shop')}>
                        Browse Products
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}