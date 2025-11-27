import { useState } from 'react';
import SEO from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Search, ShoppingCart, Package, CreditCard, RotateCcw, Award, MessageCircle } from 'lucide-react';

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 'ordering',
      icon: <ShoppingCart className="h-5 w-5" />,
      title: 'Ordering & Checkout',
      questions: [
        {
          question: 'How do I place an order?',
          answer: "Browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or log in, provide shipping address, and complete payment. You'll receive an order confirmation email once the order is placed."
        },
        {
          question: 'Can I modify my order after placing it?',
          answer: 'You can modify your order within 30 minutes of placement by contacting customer support at +91 98765 43210. Once the order enters processing, modifications are not possible, but you can cancel and place a new order.'
        },
        {
          question: 'Do you accept orders over phone?',
          answer: "Yes! Call us at +91 98765 43210 (10 AM - 8 PM, Mon-Sat) and our team will assist you with placing orders over the phone."
        },
        {
          question: 'Is there a minimum order value?',
          answer: 'No, there is no minimum order value. However, orders above ₹1,00,000 qualify for free shipping.'
        },
        {
          question: 'Can I order jewelry as a gift?',
          answer: "Absolutely! During checkout, you can add gift wrapping and include a personalized message. We'll also send you a separate invoice if needed."
        }
      ]
    },
    {
      id: 'payment',
      icon: <CreditCard className="h-5 w-5" />,
      title: 'Payment & Pricing',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), UPI (Google Pay, PhonePe, Paytm), Net Banking (all major banks), and Digital Wallets (Paytm, PhonePe, Mobikwik). All payments are processed securely through Razorpay.'
        },
        {
          question: 'Is it safe to use my credit card on your website?',
          answer: 'Yes, 100% safe! We use Razorpay, a PCI DSS Level 1 certified payment gateway with 256-bit SSL encryption. We never store your complete card details. All card payments are protected with 3D Secure OTP verification.'
        },
        {
          question: 'Why was my payment declined?',
          answer: "Payment may be declined due to insufficient funds, incorrect card details, daily transaction limits, or bank restrictions. Please check with your bank or try a different payment method. If the amount was deducted but order wasn't confirmed, it will be auto-reversed within 24-48 hours."
        },
        {
          question: 'Do you offer EMI options?',
          answer: 'Yes, we offer EMI options on Credit Cards for purchases above ₹10,000. EMI options will be displayed during checkout based on your card eligibility.'
        },
        {
          question: 'How is jewelry priced?',
          answer: 'Our jewelry is priced based on: Material cost (gold/silver at current market rates), Karat/purity, Weight, Making charges, Gemstone/diamond cost (if applicable), and GST. Prices are updated daily based on market rates.'
        },
        {
          question: 'Will I receive a tax invoice?',
          answer: 'Yes, a GST-compliant tax invoice will be emailed to you after order confirmation and will also be included in your shipment.'
        }
      ]
    },
    {
      id: 'shipping',
      icon: <Package className="h-5 w-5" />,
      title: 'Shipping & Delivery',
      questions: [
        {
          question: 'What are the shipping charges?',
          answer: 'Orders above ₹1,00,000: FREE shipping with insurance. Orders below ₹1,00,000: ₹2,000 (includes insurance and tracking).'
        },
        {
          question: 'How long does delivery take?',
          answer: 'Metro cities: 3-5 business days | Other cities: 5-7 business days | Remote areas: 7-10 business days. Processing time: 1-2 days for ready-to-ship items, 7-10 days for made-to-order items, 2-4 weeks for custom designs.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Currently, we only ship within India. International shipping will be available soon. For special requests, email international@jewelcart.com.'
        },
        {
          question: 'How can I track my order?',
          answer: "Once shipped, you'll receive a tracking number via email and SMS. Track your order on our website (My Orders section), via the tracking link in email, or directly on the courier partner's website."
        },
        {
          question: 'What if I am not available during delivery?',
          answer: "The courier will make up to 3 delivery attempts and leave a notification. You can reschedule delivery or collect the package from the local courier office with valid ID proof."
        },
        {
          question: 'Is delivery signature required?',
          answer: 'Yes, for security reasons, someone must be present to receive and sign for the delivery. Valid government-issued photo ID is required for verification.'
        }
      ]
    },
    {
      id: 'returns',
      icon: <RotateCcw className="h-5 w-5" />,
      title: 'Returns & Refunds',
      questions: [
        {
          question: 'What is your return policy?',
          answer: '30-day return policy from delivery date. Items must be unworn, undamaged, in original condition with all tags and certificates. Custom/engraved items are non-returnable.'
        },
        {
          question: 'How do I return an item?',
          answer: "Step 1: Contact us at returns@jewelcart.com within 30 days. Step 2: Get Return Authorization Number (RAN). Step 3: Pack securely with RAN and invoice. Step 4: Ship to our address using insured, trackable service. Step 5: We'll inspect and process refund within 3-5 days."
        },
        {
          question: 'How long does refund take?',
          answer: 'Inspection: 3-5 business days after receiving return | Refund initiation: 1-2 business days | Bank credit: 5-7 business days. Total: 10-14 business days from when we receive your return.'
        },
        {
          question: 'Can I exchange an item?',
          answer: "We don't offer direct exchanges currently. Please return the item for a refund and place a new order for the desired item. For ring sizing issues, contact us - we may offer complimentary resizing for recent purchases."
        },
        {
          question: 'What if I receive a damaged item?',
          answer: "Contact us immediately within 48 hours at returns@jewelcart.com with photos. We'll provide a prepaid return label and offer replacement or full refund including shipping. Processing is expedited (1-3 business days)."
        }
      ]
    },
    {
      id: 'products',
      icon: <Award className="h-5 w-5" />,
      title: 'Products & Quality',
      questions: [
        {
          question: 'Are your products hallmarked?',
          answer: 'Yes, all gold and silver jewelry is BIS hallmarked as per Indian standards. Hallmark certification is included with every order.'
        },
        {
          question: 'Do diamonds come with certificates?',
          answer: 'Yes, all diamond jewelry above specified carat weight comes with certification from recognized gemological institutes like GIA, IGI, or SGL.'
        },
        {
          question: 'What purity of gold do you sell?',
          answer: "We offer gold jewelry in 14K, 18K, and 22K purity. Each item's karat/purity is clearly mentioned in the product description."
        },
        {
          question: 'Can I customize jewelry?',
          answer: 'Yes! We offer custom jewelry design services. Contact us at custom@jewelcart.com or call +91 98765 43210 to discuss your requirements. Custom designs typically take 2-4 weeks.'
        },
        {
          question: 'How do I know the jewelry is authentic?',
          answer: 'All jewelry comes with: BIS hallmark for gold/silver, Authenticity certificate, Purchase invoice, Gemstone certificates (if applicable), Warranty card'
        },
        {
          question: 'Do you offer jewelry resizing?',
          answer: 'Yes, we offer ring resizing services. For jewelry purchased from us, contact support@jewelcart.com. For items within 30 days of purchase, resizing may be complimentary depending on the design.'
        }
      ]
    },
    {
      id: 'account',
      icon: <MessageCircle className="h-5 w-5" />,
      title: 'Account & Support',
      questions: [
        {
          question: 'Do I need an account to shop?',
          answer: 'Yes, you need to create an account to place orders. This helps us provide better service, order tracking, and faster checkout for future purchases.'
        },
        {
          question: 'How do I reset my password?',
          answer: "Click on \"Forgot Password\" on the login page. Enter your registered email address and we'll send you a password reset link. Follow the link to create a new password."
        },
        {
          question: 'Can I cancel my order?',
          answer: 'Yes, you can cancel orders before they are shipped through your account (My Orders → Cancel) or by calling us immediately. Once shipped, you cannot cancel but can return after delivery. Custom orders cannot be cancelled once production starts.'
        },
        {
          question: 'How do I contact customer support?',
          answer: 'Email: support@jewelcart.com | Phone: +91 98765 43210 | WhatsApp: +91 98765 43210 | Hours: Monday-Saturday, 10 AM - 8 PM IST. We respond within 24 hours.'
        },
        {
          question: 'Do you have a physical store?',
          answer: 'Yes! Visit our showroom at: 123 Jewelry Street, Zaveri Bazaar, Mumbai, Maharashtra 400002. Timing: Mon-Sat 10 AM - 8 PM, Sun 11 AM - 7 PM.'
        },
        {
          question: 'How can I track my refund status?',
          answer: "Log in to your account → My Orders → View Order → Refund Status. You'll also receive email/SMS updates when refund is initiated and processed."
        }
      ]
    }
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      searchQuery === '' ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEO
        title="FAQ - Frequently Asked Questions | Jewelcart Jewelry Store"
        description="Find answers to common questions about ordering, shipping, payments, returns, and more at Jewelcart. Can't find what you're looking for? Contact our support team!"
        image="/og-image.jpg"
        keywords="jewelry FAQ, jewelry store FAQ, jewelry questions, jewelry help, jewelry support, jewelry store information, jewelry buying guide"
      />
      <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Header */}
      <div className="text-center mb-20">
        <div className="inline-block mb-6">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-4"></div>
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full">
              <HelpCircle className="h-10 w-10 text-amber-600" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-6">
            Frequently Asked <span className="font-serif italic">Questions</span>
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
        </div>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
          Find answers to common questions about ordering, shipping, payments, returns, and more.
          Can't find what you're looking for? Contact our support team!
        </p>
      </div>

      {/* Search */}
      <Card className="mb-10 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-500" />
            <Input
              type="text"
              placeholder="Search for answers... (e.g., 'return policy', 'payment methods', 'shipping time')"
              className="pl-12 border-gray-200 focus:border-amber-400 focus:ring-amber-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-600 mt-3 font-light">
              {filteredCategories.reduce((sum, cat) => sum + cat.questions.length, 0)} results found
            </p>
          )}
        </CardContent>
      </Card>

      {/* Quick Links */}
      {!searchQuery && (
        <div className="mb-12">
          <h2 className="text-xl font-light text-gray-900 mb-6 tracking-wide">Browse by <span className="font-serif italic">Category</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="flex flex-col items-center justify-center p-5 border border-gray-200 rounded-xl hover:border-amber-400 hover:bg-gradient-to-br hover:from-amber-50 hover:to-white transition-all duration-300 shadow-sm hover:shadow-lg group"
              >
                <div className="text-amber-600 mb-3 transform transition-transform duration-300 group-hover:scale-110">{category.icon}</div>
                <span className="text-xs font-light text-gray-900 text-center mb-2 tracking-wide">{category.title}</span>
                <Badge variant="secondary" className="mt-1 text-xs bg-amber-50 text-amber-700 border border-amber-200 font-light">
                  {category.questions.length}
                </Badge>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Categories */}
      <div className="space-y-8">
        {filteredCategories.map((category) => (
          <Card key={category.id} id={category.id} className="border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="flex items-center gap-4 font-light text-xl tracking-wide">
                <div className="p-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg text-amber-600">{category.icon}</div>
                <span>{category.title}</span>
                <Badge variant="secondary" className="bg-amber-50 text-amber-700 border border-amber-200 font-light">{category.questions.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((item, index) => (
                  <AccordionItem key={index} value={`${category.id}-${index}`} className="border-b border-gray-100">
                    <AccordionTrigger className="text-left font-light text-gray-900 hover:text-amber-600 transition-colors py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-sm whitespace-pre-line leading-relaxed font-light pt-2 pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {searchQuery && filteredCategories.length === 0 && (
        <Card className="p-12 text-center">
          <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600 mb-6">
            We could not find any answers matching "{searchQuery}"
          </p>
          <p className="text-gray-700">
            Try different keywords or contact our support team at{' '}
            <a href="mailto:support@jewelcart.com" className="text-amber-600 hover:underline">
              support@jewelcart.com
            </a>
          </p>
        </Card>
      )}

      {/* Still Need Help */}
      <Card className="mt-16 bg-gradient-to-br from-white via-amber-50/30 to-amber-100/50 border border-amber-100/50 shadow-xl">
        <CardHeader className="border-b border-amber-200/50">
          <CardTitle className="flex items-center gap-3 font-light text-xl tracking-wide">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <MessageCircle className="h-6 w-6 text-amber-600" />
            </div>
            Still Need <span className="font-serif italic">Help?</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <p className="text-gray-700 font-light leading-relaxed">
            Cannot find the answer you are looking for? Our customer support team is here to help!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg">
              <h4 className="font-light text-gray-900 mb-4 text-lg tracking-wide">Contact <span className="font-serif italic">Support</span></h4>
              <div className="space-y-2 text-sm text-gray-700 font-light">
                <p><span className="text-gray-900">Email:</span> support@jewelcart.com</p>
                <p><span className="text-gray-900">Phone:</span> +91 98765 43210</p>
                <p><span className="text-gray-900">WhatsApp:</span> +91 98765 43210</p>
              </div>
            </div>
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg">
              <h4 className="font-light text-gray-900 mb-4 text-lg tracking-wide">Business <span className="font-serif italic">Hours</span></h4>
              <div className="space-y-2 text-sm text-gray-700 font-light">
                <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                <p>Sunday: 11:00 AM - 7:00 PM</p>
                <p>Response time: Within 24 hours</p>
              </div>
            </div>
          </div>
          <div className="p-5 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50">
            <p className="text-blue-900 text-sm font-light leading-relaxed">
              <span className="font-normal">💡 Tip:</span> For faster assistance, include your order number and
              registered email address when contacting us.
            </p>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
