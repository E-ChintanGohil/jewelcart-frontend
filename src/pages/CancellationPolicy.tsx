import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, Clock, CreditCard, AlertTriangle, CheckCircle, Package } from 'lucide-react';

export default function CancellationPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <XCircle className="h-12 w-12 text-amber-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cancellation Policy</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We understand that plans change. Our cancellation policy is designed to be fair
          while protecting both our customers and our business.
        </p>
      </div>

      {/* Key Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6 text-center">
            <Clock className="h-10 w-10 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-blue-900 mb-2">Before Dispatch</h3>
            <p className="text-blue-800 text-sm">
              Free cancellation before order is shipped
            </p>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-6 text-center">
            <Package className="h-10 w-10 text-amber-600 mx-auto mb-3" />
            <h3 className="font-semibold text-amber-900 mb-2">After Dispatch</h3>
            <p className="text-amber-800 text-sm">
              Cannot cancel, but can return after delivery
            </p>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <CreditCard className="h-10 w-10 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-green-900 mb-2">Full Refund</h3>
            <p className="text-green-800 text-sm">
              100% refund for eligible cancellations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 1. When You Can Cancel */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-amber-500" />
            1. When You Can Cancel Your Order
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1.1 Order Placed - Not Yet Processed</h3>
            <div className="p-4 bg-green-50 rounded-lg mb-3">
              <p className="text-green-900 font-medium mb-1">Status: Eligible for Cancellation ✓</p>
              <p className="text-green-800 text-sm">
                Time Window: Within 30 minutes of order placement
              </p>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>You can cancel freely through your account or by contacting us</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>100% refund will be processed</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>No cancellation charges apply</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1.2 Order Being Processed</h3>
            <div className="p-4 bg-yellow-50 rounded-lg mb-3">
              <p className="text-yellow-900 font-medium mb-1">Status: Contact Required</p>
              <p className="text-yellow-800 text-sm">
                Time Window: Before order is shipped
              </p>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Contact us immediately at +91 98765 43210 or orders@jewelcart.com</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>We'll attempt to stop the shipment</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>If successful, 100% refund; if shipped, follow return process</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1.3 Order Shipped/In Transit</h3>
            <div className="p-4 bg-red-50 rounded-lg mb-3">
              <p className="text-red-900 font-medium mb-1">Status: Cannot Cancel ✗</p>
              <p className="text-red-800 text-sm">
                Alternative: Return after delivery
              </p>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Order cannot be cancelled once shipped</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>You can refuse delivery and return to sender (refund processed after we receive the item)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Or accept delivery and initiate return within 30 days</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1.4 Order Delivered</h3>
            <div className="p-4 bg-red-50 rounded-lg mb-3">
              <p className="text-red-900 font-medium mb-1">Status: Cannot Cancel ✗</p>
              <p className="text-red-800 text-sm">
                Alternative: Return within 30 days
              </p>
            </div>
            <p className="text-gray-700 text-sm">
              Once delivered, you cannot cancel. Please refer to our <strong>Refund & Return Policy</strong> for
              returning delivered items within 30 days.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 2. How to Cancel */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-amber-500" />
            2. How to Cancel Your Order
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Method 1: Self-Service (Recommended)</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-amber-700 text-sm">1</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 text-sm">
                    Log in to your Jewelcart account
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-amber-700 text-sm">2</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 text-sm">
                    Go to "My Orders" and find your order
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-amber-700 text-sm">3</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 text-sm">
                    Click "Cancel Order" button (available if not yet shipped)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-amber-700 text-sm">4</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 text-sm">
                    Select reason for cancellation and confirm
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-amber-700 text-sm">5</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 text-sm">
                    You'll receive cancellation confirmation via email
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Method 2: Contact Customer Support</h3>
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <p className="text-gray-700 text-sm">
                <strong>Phone:</strong> +91 98765 43210 (Available 10 AM - 8 PM, Mon-Sat)
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Email:</strong> orders@jewelcart.com
              </p>
              <p className="text-gray-700 text-sm">
                <strong>WhatsApp:</strong> +91 98765 43210
              </p>
              <p className="text-gray-700 text-sm mt-3">
                <strong>Information needed:</strong> Order number, registered email, reason for cancellation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Refund Process */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <CreditCard className="h-6 w-6 text-amber-500" />
            3. Refund for Cancelled Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">3.1 Refund Amount</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Full refund</strong> of the product price (100%)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Shipping charges</strong> will be refunded if order was not dispatched</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>No cancellation charges</strong> for pre-dispatch cancellations</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">3.2 Refund Timeline</h3>
            <div className="space-y-3">
              <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                <h4 className="font-medium text-blue-900 text-sm mb-1">Order Not Shipped</h4>
                <p className="text-blue-800 text-sm">Refund initiated within 24-48 hours</p>
              </div>
              <div className="p-3 border-l-4 border-amber-500 bg-amber-50">
                <h4 className="font-medium text-amber-900 text-sm mb-1">Order Refused at Delivery</h4>
                <p className="text-amber-800 text-sm">Refund initiated within 3-5 days after we receive the returned item</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">3.3 Refund Method</h3>
            <p className="text-gray-700 text-sm mb-2">
              Refund will be credited to the original payment method:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Credit/Debit Card:</strong> 5-7 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>UPI/Net Banking:</strong> 3-5 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Wallets:</strong> 2-3 business days</span>
              </li>
            </ul>
            <p className="text-gray-700 text-sm mt-3">
              <strong>Note:</strong> Refund timeline depends on your bank/payment provider.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 4. Special Cases */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            4. Special Cases & Exceptions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">4.1 Custom/Personalized Orders</h3>
            <div className="p-4 bg-red-50 border-l-4 border-red-500">
              <p className="text-red-900 font-medium mb-1">Non-Cancellable</p>
              <p className="text-red-800 text-sm">
                Custom-made, personalized, or engraved jewelry <strong>cannot be cancelled</strong> once
                production has started. A confirmation is sent before starting production.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">4.2 Made-to-Order Items</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Can be cancelled within 24 hours of order placement</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>After 24 hours, cancellation may incur 20% restocking fee</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Once production starts, cannot be cancelled</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">4.3 Sale/Clearance Items</h3>
            <p className="text-gray-700 text-sm">
              Items marked as "Final Sale" or purchased during clearance sales <strong>cannot be
              cancelled</strong> after 1 hour of order placement. Please review carefully before ordering.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">4.4 Bulk Orders</h3>
            <p className="text-gray-700 text-sm">
              For orders of 5+ items or orders exceeding ₹5,00,000, please contact our bulk
              order team for cancellation policies. Special terms may apply.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 5. Important Notes */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>5. Important Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Cancellation vs. Return</h3>
            <p className="text-gray-700 text-sm mb-2">
              <strong>Cancellation:</strong> Stopping an order before it is shipped (free, no charges)
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Return:</strong> Sending back a delivered item within 30 days (subject to return policy)
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Multiple Cancellations</h3>
            <p className="text-gray-700 text-sm">
              Frequent cancellations may result in restrictions on your account. We understand that
              circumstances change, but please order responsibly.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Partial Cancellations</h3>
            <p className="text-gray-700 text-sm">
              If your order contains multiple items, you can cancel individual items before the
              order is shipped. Contact customer support for assistance with partial cancellations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Auto-Cancellation</h3>
            <p className="text-gray-700 text-sm">
              Orders may be auto-cancelled in the following situations:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm mt-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Payment not received or payment failed</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Product out of stock or discontinued</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Incorrect pricing or product information</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Suspected fraudulent activity</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Undeliverable address after multiple attempts</span>
              </li>
            </ul>
            <p className="text-gray-700 text-sm mt-2">
              You will be notified via email/SMS if your order is auto-cancelled, and a full refund
              will be processed.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Policy Changes */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>6. Changes to This Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-sm mb-3">
            We reserve the right to modify this cancellation policy at any time. Changes will be
            posted on this page.
          </p>
          <p className="text-gray-700 text-sm">
            The policy in effect at the time of your order placement will apply to your order.
          </p>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-gradient-to-r from-amber-50 to-amber-100">
        <CardHeader>
          <CardTitle>Need to Cancel Your Order?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-800 font-medium">
            Contact us immediately for fastest service:
          </p>
          <div className="space-y-2 text-gray-700">
            <p><strong>Cancellation Hotline:</strong> +91 98765 43210</p>
            <p><strong>Email:</strong> orders@jewelcart.com</p>
            <p><strong>WhatsApp:</strong> +91 98765 43210</p>
            <p><strong>Self-Service:</strong> Login to your account → My Orders → Cancel Order</p>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-900 font-medium text-sm">
              ⏱️ Quick Tip: The sooner you contact us, the higher the chance of successful cancellation!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
