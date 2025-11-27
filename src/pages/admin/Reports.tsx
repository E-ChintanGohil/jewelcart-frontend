import { useState, useEffect } from 'react';
import { Order, Product, Customer } from '@/lib/localStorage';
import { apiService } from '@/lib/apiService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/currency';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Download, TrendingUp, Users, Package, DollarSign } from 'lucide-react';

const Reports = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [dateRange, setDateRange] = useState('30'); // days
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersData, productsData, customersData] = await Promise.all([
        apiService.getOrders(),
        apiService.getProducts(),
        apiService.getCustomers()
      ]);

      setOrders(ordersData);
      setProducts(productsData.products || productsData);
      setCustomers(customersData);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setLoading(false);
    }
  };


  // Calculate filtered orders based on date range
  const getFilteredOrders = () => {
    const days = parseInt(dateRange);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return orders.filter(order => new Date(order.createdAt) >= cutoffDate);
  };

  const filteredOrders = getFilteredOrders();

  // Sales Analytics
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + (order.totalAmount || order.total), 0);
  const totalOrders = filteredOrders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Top Products
  const productSales = filteredOrders.reduce((acc, order) => {
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach(item => {
        if (acc[item.productName]) {
          acc[item.productName] += item.quantity;
        } else {
          acc[item.productName] = item.quantity;
        }
      });
    }
    return acc;
  }, {} as Record<string, number>);

  const topProducts = Object.entries(productSales)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([name, quantity]) => ({ name, quantity }));

  // Revenue by Category
  const categoryRevenue = filteredOrders.reduce((acc, order) => {
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach(item => {
        const product = products.find(p => p.name === item.productName);
        const category = product?.categoryName || product?.category || 'Other';
        const itemTotal = item.totalPrice || item.total;
        if (acc[category]) {
          acc[category] += itemTotal;
        } else {
          acc[category] = itemTotal;
        }
      });
    }
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categoryRevenue).map(([category, revenue]) => ({
    category,
    revenue,
    percentage: totalRevenue > 0 ? (revenue / totalRevenue * 100).toFixed(1) : '0'
  }));

  // Order Status Distribution
  const orderStatusData = orders.reduce((acc, order) => {
    if (acc[order.status]) {
      acc[order.status]++;
    } else {
      acc[order.status] = 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.entries(orderStatusData).map(([status, count]) => ({
    status,
    count,
    percentage: (count / orders.length * 100).toFixed(1)
  }));

  // Monthly Sales Trend (last 6 months)
  const monthlySales = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    
    const monthOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getMonth() === date.getMonth() && 
             orderDate.getFullYear() === date.getFullYear();
    });
    
    const revenue = monthOrders.reduce((sum, order) => sum + (order.totalAmount || order.total || 0), 0);
    
    return {
      month: `${month} ${year}`,
      revenue: revenue,
      orders: monthOrders.length
    };
  }).reverse();

  // Top Customers
  const customerSpending = customers
    .map(customer => ({
      name: `${customer.firstName} ${customer.lastName}`,
      email: customer.email,
      totalSpent: customer.totalSpent,
      orderCount: customer.orderCount,
      status: customer.status
    }))
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 10);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

  const exportToCSV = (data: any[], filename: string) => {
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Business insights and performance metrics</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={() => exportToCSV(filteredOrders, 'orders-report')}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Last {dateRange} days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">Last {dateRange} days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(averageOrderValue)}</div>
            <p className="text-xs text-muted-foreground">Per order</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Monthly revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>Sales distribution across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percentage }) => `${category} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>Most popular products by quantity sold</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
            <CardDescription>Highest spending customers</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerSpending.map((customer, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.orderCount}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(customer.totalSpent)}</TableCell>
                    <TableCell>
                      <Badge variant={customer.status === 'vip' ? 'default' : 'secondary'}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
            <CardDescription>Current status of all orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusData.map((status, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="capitalize">{status.status}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{status.count}</div>
                    <div className="text-sm text-muted-foreground">{status.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;