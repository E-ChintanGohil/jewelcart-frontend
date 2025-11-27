import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/currency';
import { CheckCircle, Package, Truck, Clock, Download, ArrowRight } from 'lucide-react';

interface OrderDetails {
  orderId: string;
  amount: number;
  status: string;
  estimatedDelivery: string;
}

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const state = location.state;
    if (state?.orderId && state?.amount) {
      // Generate order details
      const today = new Date();
      const deliveryDate = new Date(today);
      deliveryDate.setDate(today.getDate() + 7); // 7 days from now

      setOrderDetails({
        orderId: `JC${Date.now().toString().slice(-6)}`,
        amount: state.amount,
        status: 'confirmed',
        estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      });
    } else {
      // Redirect to home if no order data
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!orderDetails) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="mb-6">
          <CardHeader className="bg-green-50 border-b">
            <CardTitle className="flex items-center justify-between">
              <span>Order Details</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                {orderDetails.status.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Order Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono font-semibold">{orderDetails.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span>{new Date().toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-semibold text-amber-600">
                      {formatCurrency(orderDetails.amount)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Delivery Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Processing: 1-2 business days</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Truck className="w-4 h-4" />
                    <span>Estimated Delivery:</span>
                  </div>
                  <div className="font-semibold text-gray-900 ml-6">
                    {orderDetails.estimatedDelivery}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Timeline */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Order Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Order Confirmed</h4>
                  <p className="text-sm text-gray-600">
                    {new Date().toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="ml-4 border-l-2 border-gray-200 h-8"></div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-500">Processing</h4>
                  <p className="text-sm text-gray-400">1-2 business days</p>
                </div>
              </div>

              <div className="ml-4 border-l-2 border-gray-200 h-8"></div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-500">Shipped</h4>
                  <p className="text-sm text-gray-400">You'll receive tracking information</p>
                </div>
              </div>

              <div className="ml-4 border-l-2 border-gray-200 h-8"></div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-500">Delivered</h4>
                  <p className="text-sm text-gray-400">{orderDetails.estimatedDelivery}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Order Confirmation Email</h4>
              <p className="text-blue-800 text-sm">
                We've sent a confirmation email with your order details and receipt.
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-900 mb-2">Tracking Updates</h4>
              <p className="text-amber-800 text-sm">
                You'll receive SMS and email updates as your order progresses through each stage.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Customer Support</h4>
              <p className="text-green-800 text-sm">
                Need help? Contact us at support@jewelcart.com or call +91 98765 43210
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => window.print()}
          >
            <Download className="w-4 h-4" />
            Download Receipt
          </Button>

          <Link to="/profile">
            <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
              <Package className="w-4 h-4" />
              Track Order
            </Button>
          </Link>

          <Link to="/shop">
            <Button className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2">
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Customer Satisfaction */}
        <div className="text-center mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">We Value Your Feedback</h3>
          <p className="text-gray-600 text-sm mb-4">
            How was your shopping experience? Let us know!
          </p>
          <Button variant="outline" size="sm">
            Rate Your Experience
          </Button>
        </div>
      </div>
    </div>
  );
}