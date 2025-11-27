import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, AlertCircle, ShoppingCart, CreditCard, Scale, Shield } from 'lucide-react';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Header */}
      <div className="text-center mb-20">
        <div className="inline-block mb-6">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-4"></div>
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full">
              <FileText className="h-10 w-10 text-amber-600" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-6">
            Terms & <span className="font-serif italic">Conditions</span>
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
        </div>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
          Please read these terms and conditions carefully before using our website and services.
          By accessing or using Jewelcart, you agree to be bound by these terms.
        </p>
      </div>

      {/* Agreement Notice */}
      <Card className="mb-12 bg-gradient-to-br from-amber-50/50 to-amber-100/50 border border-amber-200/50 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
            </div>
            <div>
              <h3 className="font-light text-amber-900 mb-3 tracking-wide text-xl">Important <span className="font-serif italic">Notice</span></h3>
              <p className="text-amber-800 leading-relaxed font-light">
                By accessing and using www.jewelcart.com ("Website"), you accept and agree to be bound
                by these Terms and Conditions. If you do not agree with any part of these terms,
                please do not use our website or services.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 1. General Terms */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-4 font-light text-xl tracking-wide">
            <div className="p-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
              <FileText className="h-6 w-6 text-amber-600" />
            </div>
            1. General <span className="font-serif italic">Terms</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">1.1 About <span className="font-serif italic">Jewelcart</span></h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              Jewelcart is operated by Jewelcart Private Limited, a company registered under the
              Companies Act in India. Our registered office is at 123 Jewelry Street, Zaveri Bazaar,
              Mumbai, Maharashtra 400002, India.
            </p>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">1.2 <span className="font-serif italic">Definitions</span></h3>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><span className="text-gray-900">"We"</span>, <span className="text-gray-900">"Us"</span>, <span className="text-gray-900">"Our"</span> refers to Jewelcart Private Limited</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><span className="text-gray-900">"You"</span>, <span className="text-gray-900">"Your"</span> refers to the user or customer of our website</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><span className="text-gray-900">"Products"</span> refers to jewelry items available for purchase on our website</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span><span className="text-gray-900">"Services"</span> refers to our website, customer support, and related services</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">1.3 <span className="font-serif italic">Eligibility</span></h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              You must be at least 18 years old to use our services and make purchases. By using
              our website, you represent and warrant that you have the legal capacity to enter into
              binding contracts.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 2. Use of Website */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-4 font-light text-xl tracking-wide">
            <Shield className="h-6 w-6 text-amber-500" />
            2. Use of Website
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">2.1 Permitted Use</h3>
            <p className="text-gray-700 text-sm mb-2">You may use our website to:</p>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Browse and purchase jewelry products</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Create and manage your account</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>View product information and images</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Contact customer support</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">2.2 Prohibited Activities</h3>
            <p className="text-gray-700 text-sm mb-2">You agree NOT to:</p>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Use the website for any illegal or unauthorized purpose</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Attempt to gain unauthorized access to our systems</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Interfere with or disrupt the website or servers</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Use automated systems (bots, scrapers) without permission</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Copy, reproduce, or distribute our content without authorization</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Impersonate any person or entity</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Engage in fraudulent activities or payment fraud</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">2.3 Account Security</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              You are responsible for maintaining the confidentiality of your account credentials.
              You agree to notify us immediately of any unauthorized use of your account. We are
              not liable for any loss or damage arising from your failure to protect your account.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 3. Products and Pricing */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-4 font-light text-xl tracking-wide">
            <ShoppingCart className="h-6 w-6 text-amber-500" />
            3. Products and Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">3.1 Product Information</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              We strive to provide accurate product descriptions, images, and specifications. However,
              we do not warrant that product descriptions, colors, or other content are accurate,
              complete, reliable, or error-free. Actual colors may vary due to screen settings.
            </p>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">3.2 Pricing</h3>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>All prices are in Indian Rupees (₹) and inclusive of applicable taxes unless stated otherwise</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Prices are subject to change without notice</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Gold and silver prices vary based on current market rates</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Price displayed at time of order confirmation is final</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>We reserve the right to correct pricing errors</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">3.3 Product Availability</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              All products are subject to availability. We reserve the right to limit quantities or
              discontinue products. If a product becomes unavailable after your order, we will notify
              you and offer a full refund or alternative product.
            </p>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">3.4 Jewelry Certification</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              All gold and silver jewelry is hallmarked as per BIS standards. Diamond jewelry above
              specified carat weight comes with certification from recognized gemological institutes
              (GIA, IGI, or SGL).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 4. Orders and Payments */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-4 font-light text-xl tracking-wide">
            <CreditCard className="h-6 w-6 text-amber-500" />
            4. Orders and Payments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">4.1 Order Placement</h3>
            <p className="text-gray-700 text-sm mb-2">
              When you place an order, you are making an offer to purchase products. We reserve the
              right to accept or reject your order for any reason. Order confirmation email constitutes
              acceptance of your order.
            </p>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">4.2 Payment Methods</h3>
            <p className="text-gray-700 text-sm mb-2">We accept the following payment methods:</p>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Credit/Debit Cards (Visa, Mastercard, RuPay, Amex)</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>UPI (Google Pay, PhonePe, Paytm, etc.)</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Net Banking</span>
              </li>
              <li className="flex items-start gap-3 font-light leading-relaxed">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Digital Wallets (Paytm, PhonePe)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">4.3 Payment Processing</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              All payments are processed securely through Razorpay, our payment gateway partner.
              We do not store your complete card details. By making a payment, you agree to
              Razorpay's terms and conditions.
            </p>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">4.4 Payment Security</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              All payment transactions are encrypted using SSL technology and processed through
              PCI DSS compliant systems. You are responsible for ensuring the accuracy of payment
              information provided.
            </p>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">4.5 Failed Payments</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              If your payment fails or is declined, your order will not be processed. We are not
              responsible for failed payments due to insufficient funds, incorrect details, or
              technical issues with your payment provider.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 5. Shipping and Delivery */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>5. Shipping and Delivery</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <p className="text-gray-700 text-sm">
            Shipping and delivery are subject to our Shipping & Delivery Policy. Please review
            the policy for detailed information about delivery timelines, shipping costs, and
            terms.
          </p>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">5.1 Risk of Loss</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              Risk of loss and title for products passes to you upon delivery to the carrier.
              All shipments are insured for the full value of the products.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 6. Returns, Refunds, and Cancellations */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>6. Returns, Refunds, and Cancellations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <p className="text-gray-700 text-sm">
            Returns, refunds, and cancellations are governed by our respective policies:
          </p>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Refund & Return Policy</strong> - Details about returning products and obtaining refunds</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Cancellation Policy</strong> - Terms for cancelling orders</span>
            </li>
          </ul>
          <p className="text-gray-700 text-sm">
            Please review these policies before making a purchase.
          </p>
        </CardContent>
      </Card>

      {/* 7. Intellectual Property */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>7. Intellectual Property Rights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">7.1 Our Rights</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              All content on this website, including but not limited to text, graphics, logos,
              images, photographs, product descriptions, and software, is the property of Jewelcart
              or its content suppliers and is protected by Indian and international copyright,
              trademark, and other intellectual property laws.
            </p>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">7.2 Limited License</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              We grant you a limited, non-exclusive, non-transferable license to access and use
              the website for personal, non-commercial purposes. You may not modify, copy,
              distribute, transmit, display, reproduce, or create derivative works from our content.
            </p>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">7.3 Trademarks</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              "Jewelcart" and our logo are trademarks of Jewelcart Private Limited. You may not
              use our trademarks without our prior written consent.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 8. Limitation of Liability */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-4 font-light text-xl tracking-wide">
            <Scale className="h-6 w-6 text-amber-500" />
            8. Limitation of Liability
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">8.1 Disclaimer of Warranties</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              Our website and services are provided "as is" and "as available" without warranties
              of any kind, either express or implied. We do not warrant that the website will be
              uninterrupted, error-free, or free from viruses or other harmful components.
            </p>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">8.2 Limitation of Liability</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              To the maximum extent permitted by law, Jewelcart shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, including but
              not limited to loss of profits, data, or use, arising out of or related to your
              use of the website or products.
            </p>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">8.3 Maximum Liability</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              Our total liability to you for any claim arising out of or related to these terms
              or your use of the website shall not exceed the amount you paid for the product(s)
              giving rise to the claim.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 9. Indemnification */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>9. Indemnification</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-gray-700 text-sm">
            You agree to indemnify, defend, and hold harmless Jewelcart, its officers, directors,
            employees, agents, and suppliers from any claim, demand, loss, or damage, including
            reasonable attorneys' fees, arising out of or related to your use of the website,
            violation of these terms, or violation of any rights of another person or entity.
          </p>
        </CardContent>
      </Card>

      {/* 10. Dispute Resolution */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>10. Dispute Resolution and Governing Law</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">10.1 Governing Law</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              These Terms and Conditions shall be governed by and construed in accordance with
              the laws of India, without regard to its conflict of law provisions.
            </p>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">10.2 Jurisdiction</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              Any disputes arising out of or related to these terms shall be subject to the
              exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.
            </p>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">10.3 Dispute Resolution</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              We encourage you to contact us first to resolve any disputes informally. If
              informal resolution is unsuccessful, disputes will be resolved through binding
              arbitration in accordance with the Arbitration and Conciliation Act, 1996.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 11. Modifications */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>11. Modifications to Terms</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-gray-700 text-sm mb-3">
            We reserve the right to modify these Terms and Conditions at any time. Changes will
            be effective immediately upon posting on this page.
          </p>
          <p className="text-gray-700 text-sm">
            Continued use of the website after changes constitutes acceptance of the modified
            terms. We recommend reviewing these terms periodically.
          </p>
        </CardContent>
      </Card>

      {/* 12. Miscellaneous */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>12. Miscellaneous</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">12.1 Entire Agreement</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              These terms, along with our Privacy Policy and other policies, constitute the entire
              agreement between you and Jewelcart regarding use of the website.
            </p>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">12.2 Severability</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              If any provision of these terms is found to be invalid or unenforceable, the
              remaining provisions shall remain in full force and effect.
            </p>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">12.3 Waiver</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              Our failure to enforce any right or provision of these terms shall not constitute
              a waiver of such right or provision.
            </p>
          </div>
          <div>
            <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">12.4 Assignment</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light">
              You may not assign or transfer these terms or your rights hereunder without our
              prior written consent. We may assign these terms without restriction.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-gradient-to-br from-white via-amber-50/30 to-amber-100/50 border border-amber-100/50 shadow-xl">
        <CardHeader className="border-b border-amber-200/50">
          <CardTitle className="font-light text-xl tracking-wide">Contact <span className="font-serif italic">Us</span></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <p className="text-gray-800 font-light leading-relaxed">
            If you have questions about these Terms and Conditions, please contact us:
          </p>
          <div className="space-y-2 text-gray-700 font-light">
            <p><span className="text-gray-900">Company Name:</span> Jewelcart Private Limited</p>
            <p><span className="text-gray-900">Email:</span> legal@jewelcart.com</p>
            <p><span className="text-gray-900">Phone:</span> +91 98765 43210</p>
            <p><span className="text-gray-900">Address:</span> 123 Jewelry Street, Zaveri Bazaar, Mumbai, Maharashtra 400002, India</p>
          </div>
          <p className="text-gray-700 text-sm mt-4 font-light">
            Business Hours: Monday to Saturday, 10:00 AM - 8:00 PM IST
          </p>
        </CardContent>
      </Card>

      {/* Acceptance */}
      <Card className="border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <p className="text-gray-700 leading-relaxed font-light">
            By using our website and services, you acknowledge that you have read, understood,
            and agree to be bound by these Terms and Conditions.
          </p>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
