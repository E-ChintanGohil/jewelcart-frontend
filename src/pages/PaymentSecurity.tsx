import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, CreditCard, CheckCircle, AlertCircle, Award } from 'lucide-react';

export default function PaymentSecurity() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-12 w-12 text-amber-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Security</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Your payment security is our top priority. We use industry-leading security measures
          to protect your financial information during every transaction.
        </p>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <Lock className="h-10 w-10 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-green-900 text-sm mb-1">256-bit SSL</h3>
            <p className="text-green-800 text-xs">Bank-grade encryption</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6 text-center">
            <Award className="h-10 w-10 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-blue-900 text-sm mb-1">PCI DSS</h3>
            <p className="text-blue-800 text-xs">Level 1 Compliant</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6 text-center">
            <Shield className="h-10 w-10 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-purple-900 text-sm mb-1">Razorpay</h3>
            <p className="text-purple-800 text-xs">Trusted payment gateway</p>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-10 w-10 text-amber-600 mx-auto mb-3" />
            <h3 className="font-semibold text-amber-900 text-sm mb-1">Verified</h3>
            <p className="text-amber-800 text-xs">100% secure payments</p>
          </CardContent>
        </Card>
      </div>

      {/* 1. Payment Gateway */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <CreditCard className="h-6 w-6 text-amber-500" />
            1. Secure Payment Gateway - Razorpay
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Why Razorpay?</h3>
            <p className="text-gray-700 text-sm mb-3">
              We partner with Razorpay, India's leading payment gateway trusted by millions of
              businesses, to process all payments securely. Razorpay is certified compliant with
              the highest security standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                PCI DSS Level 1 Certified
              </h4>
              <p className="text-gray-700 text-sm">
                Highest level of payment security certification, meeting strict standards for
                processing, storing, and transmitting payment information.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                RBI Approved
              </h4>
              <p className="text-gray-700 text-sm">
                Regulated and approved by the Reserve Bank of India (RBI), ensuring compliance
                with all Indian banking regulations.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                256-bit Encryption
              </h4>
              <p className="text-gray-700 text-sm">
                All payment data is encrypted using 256-bit SSL/TLS encryption - the same
                technology used by banks worldwide.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Tokenization
              </h4>
              <p className="text-gray-700 text-sm">
                Your card details are converted into secure tokens, ensuring no sensitive
                information is stored or transmitted.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Accepted Payment Methods */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <CreditCard className="h-6 w-6 text-amber-500" />
            2. Accepted Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 text-sm mb-4">
            We accept a wide range of secure payment methods to suit your convenience:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Credit/Debit Cards */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-amber-500" />
                Credit & Debit Cards
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Visa</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Mastercard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>RuPay</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>American Express</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Maestro</span>
                </li>
              </ul>
              <div className="mt-3 p-3 bg-blue-50 rounded text-xs text-blue-800">
                <strong>3D Secure:</strong> All card payments are protected with OTP verification
                for added security.
              </div>
            </div>

            {/* UPI */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">UPI (Unified Payments Interface)</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Google Pay</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>PhonePe</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Paytm</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>BHIM</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Any UPI app</span>
                </li>
              </ul>
              <div className="mt-3 p-3 bg-blue-50 rounded text-xs text-blue-800">
                <strong>Instant:</strong> UPI payments are instant and secured by your UPI PIN.
              </div>
            </div>

            {/* Net Banking */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Net Banking</h4>
              <p className="text-gray-700 text-sm mb-2">
                All major Indian banks supported:
              </p>
              <ul className="space-y-1 text-gray-700 text-xs">
                <li>• SBI, HDFC, ICICI, Axis</li>
                <li>• Kotak, IndusInd, Yes Bank</li>
                <li>• Punjab National Bank, Bank of Baroda</li>
                <li>• And 50+ other banks</li>
              </ul>
              <div className="mt-3 p-3 bg-blue-50 rounded text-xs text-blue-800">
                <strong>Direct:</strong> Securely login to your bank account and authorize payment.
              </div>
            </div>

            {/* Wallets */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Digital Wallets</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Paytm Wallet</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>PhonePe Wallet</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Mobikwik</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Freecharge</span>
                </li>
              </ul>
              <div className="mt-3 p-3 bg-blue-50 rounded text-xs text-blue-800">
                <strong>Quick:</strong> Use your wallet balance for instant checkout.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. How We Protect You */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-amber-500" />
            3. How We Protect Your Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">We NEVER Store Your Card Details</h3>
            <p className="text-gray-700 text-sm mb-3">
              Your complete card number, CVV, and expiry date are NEVER stored on our servers.
              All sensitive payment information is handled directly by Razorpay's PCI DSS compliant
              systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <h4 className="font-semibold text-green-900 mb-2">✓ What We Store</h4>
              <ul className="space-y-1 text-green-800 text-sm">
                <li>• Order details</li>
                <li>• Transaction ID</li>
                <li>• Payment status</li>
                <li>• Last 4 digits of card (for reference)</li>
              </ul>
            </div>

            <div className="p-4 border-l-4 border-red-500 bg-red-50">
              <h4 className="font-semibold text-red-900 mb-2">✗ What We DON'T Store</h4>
              <ul className="space-y-1 text-red-800 text-sm">
                <li>• Complete card number</li>
                <li>• CVV/CVC code</li>
                <li>• Card PIN</li>
                <li>• Net banking passwords</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3 mt-6">Security Layers</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-blue-700 text-sm">1</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">SSL/TLS Encryption</h4>
                  <p className="text-gray-700 text-xs">
                    All data transmitted between your browser and our servers is encrypted using
                    256-bit SSL/TLS technology. Look for the padlock icon in your browser.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-blue-700 text-sm">2</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">3D Secure Authentication</h4>
                  <p className="text-gray-700 text-xs">
                    Card payments require OTP verification sent to your registered mobile number,
                    adding an extra layer of protection against unauthorized transactions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-blue-700 text-sm">3</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Tokenization</h4>
                  <p className="text-gray-700 text-xs">
                    Your card details are converted into secure tokens. Even if intercepted, tokens
                    cannot be used for fraudulent transactions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-blue-700 text-sm">4</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Fraud Detection</h4>
                  <p className="text-gray-700 text-xs">
                    Razorpay's AI-powered fraud detection system monitors transactions in real-time
                    to identify and prevent suspicious activities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-blue-700 text-sm">5</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Secure Servers</h4>
                  <p className="text-gray-700 text-xs">
                    All payment processing happens on Razorpay's secure, PCI-compliant servers
                    with 24/7 monitoring and protection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Safety Tips */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-amber-500" />
            4. Tips for Safe Online Shopping
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 text-sm mb-3">
            While we ensure maximum security on our end, here are some tips to keep your
            transactions safe:
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-green-50 border-l-4 border-green-500">
              <h4 className="font-semibold text-green-900 mb-2">✓ DO</h4>
              <ul className="space-y-1 text-green-800 text-sm">
                <li>• Check for HTTPS and padlock icon in your browser</li>
                <li>• Use strong, unique passwords for your account</li>
                <li>• Enable 2-factor authentication if available</li>
                <li>• Keep your devices and antivirus software updated</li>
                <li>• Use secure, private Wi-Fi networks</li>
                <li>• Save our official website: www.jewelcart.com</li>
                <li>• Verify transaction SMS/emails are from official sources</li>
              </ul>
            </div>

            <div className="p-4 bg-red-50 border-l-4 border-red-500">
              <h4 className="font-semibold text-red-900 mb-2">✗ DON'T</h4>
              <ul className="space-y-1 text-red-800 text-sm">
                <li>• Never share your CVV, PIN, or OTP with anyone (even our staff)</li>
                <li>• Don't save card details on shared devices</li>
                <li>• Avoid using public/unsecured Wi-Fi for payments</li>
                <li>• Never click suspicious links in emails/SMS</li>
                <li>• Don't share banking credentials via email or phone</li>
                <li>• Never respond to requests asking for payment information</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. Payment Issues */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>5. Payment Failed or Declined?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 text-sm mb-3">
            If your payment fails or is declined, it could be due to:
          </p>

          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Insufficient funds</strong> in your account/card</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Incorrect card details</strong> (number, expiry, CVV)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Card expired</strong> or blocked by bank</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Transaction limit</strong> exceeded (daily/monthly)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>International payments</strong> not enabled</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Network issues</strong> or timeout</span>
            </li>
          </ul>

          <div className="p-4 bg-blue-50 rounded-lg mt-4">
            <h4 className="font-semibold text-blue-900 mb-2">What to Do?</h4>
            <ol className="space-y-1 text-blue-800 text-sm list-decimal list-inside">
              <li>Check your bank SMS/app to see if amount was deducted</li>
              <li>If deducted but order not confirmed, wait 30 minutes for auto-reversal</li>
              <li>Try a different payment method</li>
              <li>Contact your bank if issue persists</li>
              <li>Contact us at payment@jewelcart.com for assistance</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* 6. Refunds */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>6. Refund Security</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-sm mb-3">
            All refunds are processed securely back to your original payment method:
          </p>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Refunds initiated within 24-48 hours of approval</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Amount credited to same card/account used for payment</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Processed through secure Razorpay refund system</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Email and SMS notification sent upon refund processing</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="bg-gradient-to-r from-amber-50 to-amber-100">
        <CardHeader>
          <CardTitle>Payment Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-800 font-medium">
            Questions or concerns about payment security?
          </p>
          <div className="space-y-2 text-gray-700">
            <p><strong>Payment Support:</strong> payment@jewelcart.com</p>
            <p><strong>Customer Care:</strong> +91 98765 43210</p>
            <p><strong>Hours:</strong> 24/7 for payment issues</p>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-900 text-sm">
              <strong>🔒 Remember:</strong> We will NEVER ask for your complete card details,
              CVV, PIN, or OTP via email, phone, or SMS. If someone claims to be from Jewelcart
              and asks for this information, do not share and report to us immediately.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
