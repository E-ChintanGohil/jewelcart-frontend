import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Package, Clock, CreditCard, AlertTriangle, CheckCircle } from 'lucide-react';

export default function RefundPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <RotateCcw className="h-12 w-12 text-amber-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund & Return Policy</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We want you to be completely satisfied with your purchase. If for any reason you are not
          happy with your jewelry, we offer a hassle-free return and refund process.
        </p>
      </div>

      {/* 30-Day Return Policy Highlight */}
      <Card className="mb-8 border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-green-900 text-xl mb-2">30-Day Return Policy</h3>
              <p className="text-green-800">
                We offer a 30-day return policy from the date of delivery for most jewelry items.
                Products must be unworn, undamaged, and in original condition with all tags and
                certificates intact.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 1. Eligibility for Returns */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Package className="h-6 w-6 text-amber-500" />
            1. Eligibility for Returns
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1.1 Eligible Items</h3>
            <p className="text-gray-700 text-sm mb-3">To be eligible for a return, items must meet ALL of the following criteria:</p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Returned within 30 days of delivery date</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Unworn and in original condition</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Original tags and certificates attached</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Original packaging intact</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Proof of purchase (invoice or order number)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>All accompanying accessories and certificates included</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1.2 Non-Returnable Items</h3>
            <p className="text-gray-700 text-sm mb-3">The following items CANNOT be returned:</p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Custom-made or personalized jewelry</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Engraved items</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Worn or damaged jewelry</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Items with missing certificates or tags</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Sale or clearance items (unless defective)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Items purchased during final sale promotions</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* 2. Return Process */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-amber-500" />
            2. How to Initiate a Return
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Step-by-Step Return Process:</h3>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-amber-700">1</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Contact Us</h4>
                  <p className="text-gray-700 text-sm">
                    Email us at returns@jewelcart.com or call +91 98765 43210 within 30 days of
                    delivery. Provide your order number and reason for return.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-amber-700">2</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Get Return Authorization</h4>
                  <p className="text-gray-700 text-sm">
                    We will review your request and issue a Return Authorization Number (RAN)
                    within 24-48 hours if eligible.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-amber-700">3</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Package Securely</h4>
                  <p className="text-gray-700 text-sm">
                    Pack the item securely in its original packaging with all tags, certificates,
                    and accessories. Include the RAN and invoice copy inside.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-amber-700">4</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Ship the Item</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Ship to: Jewelcart Returns, 123 Jewelry Street, Zaveri Bazaar, Mumbai,
                    Maharashtra 400002
                  </p>
                  <p className="text-gray-700 text-sm">
                    We recommend using insured, trackable shipping. You are responsible for
                    return shipping costs unless the item is defective or we made an error.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-amber-700">5</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Inspection & Refund</h4>
                  <p className="text-gray-700 text-sm">
                    Once received, we'll inspect the item within 3-5 business days and process
                    your refund if approved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Refund Information */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <CreditCard className="h-6 w-6 text-amber-500" />
            3. Refund Processing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">3.1 Refund Timeline</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Inspection:</strong> 3-5 business days after receiving your return</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Refund Initiation:</strong> 1-2 business days after approval</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Bank Credit:</strong> 5-7 business days (depends on your bank)</span>
              </li>
            </ul>
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Total Timeline:</strong> Expect your refund within 10-14 business days
                from when we receive your return.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">3.2 Refund Method</h3>
            <p className="text-gray-700 text-sm mb-2">
              Refunds will be issued to the original payment method used for purchase:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Credit/Debit Card:</strong> Refunded to the original card</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>UPI/Net Banking:</strong> Refunded to source account</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Wallets:</strong> Credited back to wallet</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">3.3 Refund Amount</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Full product price will be refunded</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Original shipping charges are non-refundable (unless defective/error)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Return shipping costs are customer's responsibility</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Any applicable discounts or promotions will be adjusted</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* 4. Exchanges */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>4. Exchanges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">4.1 Exchange Policy</h3>
            <p className="text-gray-700 text-sm mb-3">
              We currently do not offer direct exchanges. If you wish to exchange an item:
            </p>
            <ol className="space-y-2 text-gray-700 text-sm list-decimal list-inside">
              <li>Return the original item following our return process</li>
              <li>Place a new order for the desired item</li>
              <li>Once we receive and approve your return, we'll process the refund</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">4.2 Size Exchanges</h3>
            <p className="text-gray-700 text-sm">
              For ring sizing issues, please contact us at support@jewelcart.com. We may offer
              complimentary resizing for certain products purchased within the last 30 days.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 5. Damaged or Defective Items */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            5. Damaged or Defective Items
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">5.1 Reporting Damage</h3>
            <p className="text-gray-700 text-sm mb-2">
              If you receive a damaged or defective item, please contact us immediately within
              48 hours of delivery:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Email photos of the damage to returns@jewelcart.com</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Include your order number and description of the issue</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Keep all packaging materials for inspection</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">5.2 Resolution for Defective Items</h3>
            <p className="text-gray-700 text-sm mb-2">For damaged or defective items, we will:</p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Provide a prepaid return label (no cost to you)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Offer a replacement or full refund including shipping</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Expedite processing (1-3 business days)</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">5.3 Manufacturing Defects</h3>
            <p className="text-gray-700 text-sm">
              All jewelry comes with a warranty against manufacturing defects. If a defect is
              discovered after 30 days, please contact us for warranty service options.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 6. Important Notes */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>6. Important Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Return Shipping Insurance</h3>
            <p className="text-gray-700 text-sm">
              We strongly recommend using insured, trackable shipping when returning jewelry.
              We are not responsible for items lost or damaged during return shipment.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Inspection Rights</h3>
            <p className="text-gray-700 text-sm">
              We reserve the right to reject returns that do not meet our eligibility criteria
              (worn items, missing components, etc.). Rejected items will be returned to you at
              your expense.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Partial Returns</h3>
            <p className="text-gray-700 text-sm">
              If your order contains multiple items, you may return individual items. Refunds
              will be prorated based on the returned item's value.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-gradient-to-r from-amber-50 to-amber-100">
        <CardHeader>
          <CardTitle>Questions About Returns?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-800 font-medium">
            Our customer service team is here to help with your return:
          </p>
          <div className="space-y-2 text-gray-700">
            <p><strong>Returns Email:</strong> returns@jewelcart.com</p>
            <p><strong>Customer Support:</strong> support@jewelcart.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Hours:</strong> Monday to Saturday, 10:00 AM - 8:00 PM IST</p>
          </div>
          <p className="text-gray-700 text-sm mt-4">
            We aim to respond to all return inquiries within 24 hours.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
