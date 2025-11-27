import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/currency';
import { apiService } from '@/lib/apiService';
import { Order } from '@/lib/localStorage';
import { User, Package, Heart, MapPin, CreditCard, Settings, Loader2 } from 'lucide-react';

interface OrderDisplay {
  id: string | number;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState<OrderDisplay[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    const loadOrders = async () => {
      if (user && user.role === 'customer') {
        try {
          setOrdersLoading(true);
          const customerOrders = await apiService.getCustomerOrders();

          // Transform orders to display format
          const ordersDisplay: OrderDisplay[] = customerOrders.map(order => ({
            id: order.id,
            date: order.createdAt,
            status: order.status.toLowerCase() as OrderDisplay['status'],
            total: order.totalAmount || order.total || 0,
            items: order.items?.length || 0
          }));

          setOrders(ordersDisplay);
        } catch (error) {
          console.error('Failed to load orders:', error);
        } finally {
          setOrdersLoading(false);
        }
      }
    };

    loadOrders();
  }, [user]);

  const [addresses] = useState<Address[]>([
    {
      id: '1',
      type: 'home',
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 98765 43210',
      isDefault: true
    }
  ]);

  const getStatusColor = (status: OrderDisplay['status']) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
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
          <Tabs defaultValue="profile" className="space-y-6">
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
                      onClick={() => setIsEditing(!isEditing)}
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
                        defaultValue={user.first_name}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        defaultValue={user.last_name}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user.email}
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
                              <h4 className="font-semibold">Order #{order.id}</h4>
                              <p className="text-sm text-gray-600">
                                {new Date(order.date).toLocaleDateString('en-IN', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                              {order.items} {order.items === 1 ? 'item' : 'items'}
                            </p>
                            <div className="flex items-center space-x-4">
                              <span className="font-semibold">
                                {formatCurrency(order.total)}
                              </span>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
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
                    <Button>
                      <MapPin className="h-4 w-4 mr-2" />
                      Add Address
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{address.name}</h4>
                              <Badge variant="outline">
                                {address.type}
                              </Badge>
                              {address.isDefault && (
                                <Badge>Default</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {address.address}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.city}, {address.state} - {address.pincode}
                            </p>
                            <p className="text-sm text-gray-600">
                              Phone: {address.phone}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Delete</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Your wishlist is empty
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Save your favorite items to your wishlist
                    </p>
                    <Button>
                      Browse Products
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}