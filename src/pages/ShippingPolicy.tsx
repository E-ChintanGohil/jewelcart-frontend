import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, MapPin, Clock, Package, Shield, IndianRupee } from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Header */}
      <div className="text-center mb-20">
        <div className="inline-block mb-6">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-4"></div>
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full">
              <Truck className="h-10 w-10 text-amber-600" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-6">
            Shipping & <span className="font-serif italic">Delivery</span>
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
        </div>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
          We ensure safe and timely delivery of your precious jewelry to your doorstep.
          All shipments are fully insured and trackable.
        </p>
      </div>

      {/* Free Shipping Highlight */}
      <Card className="mb-12 bg-gradient-to-br from-green-50/50 to-green-100/50 border border-green-200/50 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <IndianRupee className="h-8 w-8 text-green-600 flex-shrink-0" />
            </div>
            <div>
              <h3 className="font-light text-green-900 text-xl mb-3 tracking-wide">Free Shipping on Orders Above <span className="font-serif italic">₹1,00,000</span></h3>
              <p className="text-green-800 leading-relaxed font-light">
                Enjoy complimentary shipping with full insurance on all orders above ₹1,00,000.
                For orders below this amount, a nominal shipping fee of ₹2,000 applies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 1. Shipping Zones */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-4 font-light text-xl tracking-wide">
            <MapPin className="h-6 w-6 text-amber-500" />
            1. Shipping Zones & Coverage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">1.1 Domestic Shipping (India)</h3>
            <p className="text-gray-700 text-sm mb-3">
              We deliver to all states and union territories across India, including:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm mb-2">Metro Cities</h4>
                <p className="text-gray-700 text-xs">
                  Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm mb-2">Tier 2 & 3 Cities</h4>
                <p className="text-gray-700 text-xs">
                  All other cities and towns across India
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">1.2 International Shipping</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              Currently, we only ship within India. International shipping will be available soon.
              Please contact us at international@jewelcart.com for special requests.
            </p>
          </div>

          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">1.3 Remote Areas</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              Deliveries to remote or difficult-to-reach areas may require additional 2-3 business
              days. We will inform you if your location falls under this category.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 2. Delivery Timeline */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-4 font-light text-xl tracking-wide">
            <Clock className="h-6 w-6 text-amber-500" />
            2. Delivery Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">2.1 Processing Time</h3>
            <p className="text-gray-700 text-sm mb-2">
              Order processing times vary based on product type:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Ready-to-ship items:</strong> 1-2 business days</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Made-to-order items:</strong> 7-10 business days</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Custom designs:</strong> 2-4 weeks (discussed during consultation)</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Engraving services:</strong> Additional 2-3 business days</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">2.2 Shipping Time</h3>
            <p className="text-gray-700 text-sm mb-2">
              Once shipped, delivery times are:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-amber-500" />
                  <h4 className="font-semibold text-gray-900">Metro Cities</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed font-light">3-5 business days</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-amber-500" />
                  <h4 className="font-semibold text-gray-900">Other Cities</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed font-light">5-7 business days</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-amber-500" />
                  <h4 className="font-semibold text-gray-900">Remote Areas</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed font-light">7-10 business days</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-amber-500" />
                  <h4 className="font-semibold text-gray-900">Northeast & Islands</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed font-light">7-12 business days</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-900 font-medium mb-2">Total Delivery Time</p>
            <p className="text-blue-800 text-sm">
              <strong>Total Time = Processing Time + Shipping Time</strong>
              <br />
              Example: Ready-to-ship item to Mumbai = 1-2 days (processing) + 3-5 days (shipping) = 4-7 business days
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 3. Shipping Costs */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-4 font-light text-xl tracking-wide">
            <IndianRupee className="h-6 w-6 text-amber-500" />
            3. Shipping Costs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Orders ≥ ₹1,00,000</h4>
              <div className="text-3xl font-bold text-green-700 mb-1">FREE</div>
              <p className="text-green-800 text-sm">Free shipping with full insurance</p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Orders &lt; ₹1,00,000</h4>
              <div className="text-3xl font-bold text-gray-700 mb-1">₹2,000</div>
              <p className="text-gray-700 text-sm leading-relaxed font-light">Includes insurance and tracking</p>
            </div>
          </div>

          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">What's Included</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Full insurance coverage for the value of jewelry</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Real-time tracking</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Secure packaging</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Proof of delivery</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* 4. Shipping Partners */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-4 font-light text-xl tracking-wide">
            <Truck className="h-6 w-6 text-amber-500" />
            4. Our Shipping Partners
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <p className="text-gray-700 text-sm">
            We partner with India's most trusted courier services to ensure safe delivery:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 border rounded-lg text-center">
              <p className="font-semibold text-gray-900">Blue Dart</p>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <p className="font-semibold text-gray-900">FedEx</p>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <p className="font-semibold text-gray-900">DHL</p>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <p className="font-semibold text-gray-900">DTDC</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm">
            The shipping partner is selected based on your location to ensure fastest and safest delivery.
          </p>
        </CardContent>
      </Card>

      {/* 5. Order Tracking */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-4 font-light text-xl tracking-wide">
            <Package className="h-6 w-6 text-amber-500" />
            5. Order Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">5.1 Tracking Your Order</h3>
            <p className="text-gray-700 text-sm mb-2">
              Once your order is shipped, you will receive:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Email with tracking number and courier partner details</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>SMS updates at key delivery milestones</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Real-time tracking on your account dashboard</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">5.2 Tracking Methods</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm mb-1">Website</h4>
                <p className="text-gray-700 text-xs">
                  Log in to your account → My Orders → View Order → Track Shipment
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm mb-1">Email Link</h4>
                <p className="text-gray-700 text-xs">
                  Click the tracking link in your shipping confirmation email
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm mb-1">Courier Website</h4>
                <p className="text-gray-700 text-xs">
                  Use the tracking number on the courier partner's website
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 6. Delivery Process */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-4 font-light text-xl tracking-wide">
            <Shield className="h-6 w-6 text-amber-500" />
            6. Delivery Process & Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">6.1 Delivery Requirements</h3>
            <p className="text-gray-700 text-sm mb-2">
              For security reasons, our delivery process requires:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>ID Verification:</strong> Valid government-issued photo ID (Aadhaar, PAN, Driving License, Passport)</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Signature Required:</strong> Recipient must sign for the package</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Adult Recipient:</strong> Must be 18 years or older</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Inspect Before Accepting:</strong> Open and inspect the package in front of delivery person</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">6.2 Multiple Delivery Attempts</h3>
            <p className="text-gray-700 text-sm mb-2">
              If delivery is unsuccessful, the courier will:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Make up to 3 delivery attempts</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Leave a delivery notification with contact number</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Hold package at local courier office for pickup (with ID)</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Return to us after 7 days if unclaimed</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">6.3 Address Accuracy</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              Please ensure your delivery address is complete and accurate. Delays or failed
              deliveries due to incorrect addresses may incur additional charges for re-delivery.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 7. Packaging */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="font-light text-xl tracking-wide">7. Packaging & Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <p className="text-gray-700 text-sm">
            All jewelry is packaged with utmost care to ensure it reaches you safely:
          </p>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Tamper-proof, sealed packaging</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Bubble wrap and cushioning for fragile items</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Elegant Jewelcart packaging box</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>All certificates and authenticity documents included</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>No external markings indicating jewelry contents (for security)</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 8. Delays & Issues */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="font-light text-xl tracking-wide">8. Delivery Delays & Issues</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">8.1 Possible Delays</h3>
            <p className="text-gray-700 text-sm mb-2">
              Deliveries may be delayed due to:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Natural disasters, extreme weather conditions</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Political unrest, strikes, or lockdowns</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Public holidays and festivals</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Courier service issues or customs delays</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Incorrect or incomplete address</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">8.2 Lost or Damaged Shipments</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              All shipments are fully insured. If your package is lost or damaged in transit,
              please contact us immediately at support@jewelcart.com. We will file a claim with
              the courier and provide a replacement or full refund within 7-10 business days.
            </p>
          </div>

          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">8.3 Non-Delivery</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              If you have not received your order within the estimated delivery window, please
              contact us. We will investigate with the courier and resolve the issue promptly.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-gradient-to-br from-white via-amber-50/30 to-amber-100/50 border border-amber-100/50 shadow-xl">
        <CardHeader className="border-b border-amber-200/50">
          <CardTitle className="font-light text-xl tracking-wide">Shipping <span className="font-serif italic">Support</span></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <p className="text-gray-800 font-light leading-relaxed">
            Questions about shipping or delivery? We're here to help:
          </p>
          <div className="space-y-2 text-gray-700 font-light">
            <p><span className="text-gray-900">Shipping Support:</span> shipping@jewelcart.com</p>
            <p><span className="text-gray-900">Customer Care:</span> +91 98765 43210</p>
            <p><span className="text-gray-900">WhatsApp:</span> +91 98765 43210</p>
            <p><span className="text-gray-900">Hours:</span> Monday to Saturday, 10:00 AM - 8:00 PM IST</p>
          </div>
          <p className="text-gray-700 text-sm mt-4 font-light">
            We aim to respond to all shipping inquiries within 24 hours.
          </p>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
