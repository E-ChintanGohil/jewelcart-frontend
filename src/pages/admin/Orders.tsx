import { useState, useEffect } from 'react';
import { Order } from '@/lib/localStorage';
import { apiService } from '@/lib/apiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Eye, Edit, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/currency';
import { useToast } from '@/hooks/use-toast';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  const loadOrders = async () => {
    try {
      const ordersData = await apiService.getOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error('Failed to load orders:', error);
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive"
      });
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      await apiService.updateOrderStatus(orderId, newStatus);
      loadOrders();
      toast({
        title: "Success",
        description: `Order status updated to ${newStatus}`
      });
    } catch (error) {
      console.error('Failed to update order status:', error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive"
      });
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };


  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Package className="h-4 w-4" />;
      case 'processing': return <Edit className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };


  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground">Manage customer orders and shipments</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {orders.filter(order => order.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {orders.filter(order => order.status === 'processing').length}
            </div>
            <p className="text-xs text-muted-foreground">Being prepared</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(orders.reduce((sum, order) => sum + (order.totalAmount || order.total), 0))}
            </div>
            <p className="text-xs text-muted-foreground">Total sales</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
          <CardDescription>
            {filteredOrders.length} of {orders.length} orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">
                        #{order.orderNumber || String(order.id).padStart(6, '0')}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {order.customerInfo.firstName} {order.customerInfo.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {order.customerInfo.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(order.totalAmount || order.total)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{order.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPaymentStatusBadgeColor(order.paymentStatus)}>
                          {order.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Order Details #{selectedOrder?.orderNumber || String(selectedOrder?.id).padStart(6, '0')}</DialogTitle>
                                <DialogDescription>
                                  Order placed on {selectedOrder && new Date(selectedOrder.createdAt).toLocaleDateString()}
                                </DialogDescription>
                              </DialogHeader>
                              
                              {selectedOrder && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Customer Information</h4>
                                      <div className="text-sm space-y-1">
                                        <p>{selectedOrder.customerInfo.firstName} {selectedOrder.customerInfo.lastName}</p>
                                        <p>{selectedOrder.customerInfo.email}</p>
                                        <p>{selectedOrder.customerInfo.phone}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Shipping Address</h4>
                                      <div className="text-sm space-y-1">
                                        {selectedOrder.shippingAddress ? (
                                          <>
                                            <p>{selectedOrder.shippingAddress.street}</p>
                                            <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}</p>
                                            <p>{selectedOrder.shippingAddress.country}</p>
                                          </>
                                        ) : (
                                          <p className="text-muted-foreground">No shipping address</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-medium mb-2">Order Items</h4>
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Product</TableHead>
                                          <TableHead>Quantity</TableHead>
                                          <TableHead>Price</TableHead>
                                          <TableHead>Total</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {selectedOrder.items.map((item, index) => (
                                          <TableRow key={index}>
                                            <TableCell>{item.productName}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{formatCurrency(item.unitPrice || item.price)}</TableCell>
                                            <TableCell>{formatCurrency(item.totalPrice || item.total)}</TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span>Subtotal:</span>
                                      <span>{formatCurrency(selectedOrder.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Tax:</span>
                                      <span>{formatCurrency(selectedOrder.taxAmount || selectedOrder.tax)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Shipping:</span>
                                      <span>{formatCurrency(selectedOrder.shippingAmount || selectedOrder.shipping)}</span>
                                    </div>
                                    <div className="flex justify-between font-medium text-lg border-t pt-2">
                                      <span>Total:</span>
                                      <span>{formatCurrency(selectedOrder.totalAmount || selectedOrder.total)}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    <Select
                                      value={selectedOrder.status}
                                      onValueChange={(status) => updateOrderStatus(selectedOrder.id, status as Order['status'])}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="shipped">Shipped</SelectItem>
                                        <SelectItem value="delivered">Delivered</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          <Select
                            value={order.status}
                            onValueChange={(status) => updateOrderStatus(order.id, status as Order['status'])}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
