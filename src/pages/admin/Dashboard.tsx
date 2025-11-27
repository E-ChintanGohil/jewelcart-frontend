import { useEffect, useState } from 'react';
import { Product, Customer, Order } from '@/lib/localStorage';
import { apiService } from '@/lib/apiService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/lib/currency';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Star,
  Eye,
  Loader2,
  RefreshCw
} from 'lucide-react';

const Dashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
    pendingOrders: 0,
    monthlyRevenue: 0,
    monthlyOrders: 0,
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);

        // Load data from API
        const [productsResponse, customersResponse, ordersResponse] = await Promise.all([
          apiService.getAdminProducts(),
          apiService.getCustomers(),
          apiService.getOrders()
        ]);

        const products = productsResponse.products || [];
        const customers = customersResponse || [];
        const orders = ordersResponse || [];

        // Current month calculations
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthlyOrders = orders.filter((order: any) => new Date(order.createdAt) >= startOfMonth);

        const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.totalAmount || order.total || 0), 0);
        const monthlyRevenue = monthlyOrders.reduce((sum: number, order: any) => sum + (order.totalAmount || order.total || 0), 0);
        const lowStockItems = products.filter((product: any) => (product.stockQuantity || product.stock || 0) < 5);
        const pendingOrdersCount = orders.filter((order: any) => order.status?.toLowerCase() === 'pending').length;

        setStats({
          totalProducts: products.length,
          totalCustomers: customers.length,
          totalOrders: orders.length,
          totalRevenue,
          lowStockProducts: lowStockItems.length,
          pendingOrders: pendingOrdersCount,
          monthlyRevenue,
          monthlyOrders: monthlyOrders.length,
        });

        // Recent orders (last 5)
        const sortedOrders = orders
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        setRecentOrders(sortedOrders);

        // Low stock products
        setLowStockProducts(lowStockItems.slice(0, 5));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast({
          title: "Error loading dashboard",
          description: "Failed to load dashboard data. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [toast]);

  const refreshData = () => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);

        // Load data from API
        const [productsResponse, customersResponse, ordersResponse] = await Promise.all([
          apiService.getAdminProducts(),
          apiService.getCustomers(),
          apiService.getOrders()
        ]);

        const products = productsResponse.products || [];
        const customers = customersResponse || [];
        const orders = ordersResponse || [];

        // Current month calculations
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthlyOrders = orders.filter((order: any) => new Date(order.createdAt) >= startOfMonth);

        const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.totalAmount || order.total || 0), 0);
        const monthlyRevenue = monthlyOrders.reduce((sum: number, order: any) => sum + (order.totalAmount || order.total || 0), 0);
        const lowStockItems = products.filter((product: any) => (product.stockQuantity || product.stock || 0) < 5);
        const pendingOrdersCount = orders.filter((order: any) => order.status?.toLowerCase() === 'pending').length;

        setStats({
          totalProducts: products.length,
          totalCustomers: customers.length,
          totalOrders: orders.length,
          totalRevenue,
          lowStockProducts: lowStockItems.length,
          pendingOrders: pendingOrdersCount,
          monthlyRevenue,
          monthlyOrders: monthlyOrders.length,
        });

        // Recent orders (last 5)
        const sortedOrders = orders
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        setRecentOrders(sortedOrders);

        // Low stock products
        setLowStockProducts(lowStockItems.slice(0, 5));

        toast({
          title: "Dashboard refreshed",
          description: "Latest data has been loaded successfully.",
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast({
          title: "Error refreshing dashboard",
          description: "Failed to load latest data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your jewelry business.
          </p>
        </div>
        <Button onClick={refreshData} disabled={isLoading} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/console/reports">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(stats.monthlyRevenue)} this month
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/console/orders">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                {stats.monthlyOrders} this month
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/console/products">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                {stats.lowStockProducts} low stock
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/console/customers">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">
                Total registered customers
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Alerts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.length > 0 ? (
                recentOrders.map((order: any) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Order #{String(order.id).slice(-8)}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customerInfo?.firstName || order.customer?.firstName || 'N/A'} {order.customerInfo?.lastName || order.customer?.lastName || ''}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(order.totalAmount || order.total || 0)}</p>
                      <Badge className={getStatusColor(order.status || 'pending')}>
                        {(order.status || 'pending').charAt(0).toUpperCase() + (order.status || 'pending').slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No recent orders</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Low Stock Alert
            </CardTitle>
            <CardDescription>Products running low on inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockProducts.length > 0 ? (
                lowStockProducts.map((product: any) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">SKU: {product.sku || `JC-${product.id}`}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-red-600">
                        {product.stockQuantity || product.stock || 0} left
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>All products well stocked</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Revenue and order trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Monthly Revenue Goal</span>
                <span>{formatCurrency(stats.monthlyRevenue)} / {formatCurrency(10000)}</span>
              </div>
              <Progress value={(stats.monthlyRevenue / 10000) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Monthly Orders Goal</span>
                <span>{stats.monthlyOrders} / 50</span>
              </div>
              <Progress value={(stats.monthlyOrders / 50) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Key business metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Pending Orders</span>
              <Badge variant="outline">{stats.pendingOrders}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Low Stock Items</span>
              <Badge variant="outline" className="text-yellow-600">
                {stats.lowStockProducts}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Average Order Value</span>
              <span className="text-sm font-medium">
                {formatCurrency(stats.totalOrders > 0 ? stats.totalRevenue / stats.totalOrders : 0)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;