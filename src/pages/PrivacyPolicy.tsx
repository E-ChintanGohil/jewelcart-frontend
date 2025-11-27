import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, Database, Mail, UserCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <Database className="h-6 w-6 text-amber-500" />,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Name, email address, phone number",
            "Billing and shipping addresses",
            "Payment information (processed securely through Razorpay)",
            "Account credentials (encrypted password)"
          ]
        },
        {
          subtitle: "Order Information",
          items: [
            "Products purchased, order history",
            "Shipping and delivery information",
            "Communication preferences"
          ]
        },
        {
          subtitle: "Automatically Collected Information",
          items: [
            "Browser type, IP address, device information",
            "Pages visited, time spent on site",
            "Cookies and similar tracking technologies"
          ]
        }
      ]
    },
    {
      icon: <Eye className="h-6 w-6 text-amber-500" />,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Primary Uses",
          items: [
            "Process and fulfill your orders",
            "Send order confirmations and shipping updates",
            "Process payments securely through Razorpay",
            "Provide customer support and respond to inquiries",
            "Send important account and service updates"
          ]
        },
        {
          subtitle: "Secondary Uses",
          items: [
            "Improve our website and shopping experience",
            "Send promotional emails (with your consent)",
            "Prevent fraud and ensure security",
            "Comply with legal obligations",
            "Analyze website usage and performance"
          ]
        }
      ]
    },
    {
      icon: <Lock className="h-6 w-6 text-amber-500" />,
      title: "Data Security",
      content: [
        {
          subtitle: "Security Measures",
          items: [
            "SSL/TLS encryption for all data transmission",
            "Secure payment processing via Razorpay (PCI DSS compliant)",
            "Encrypted storage of sensitive information",
            "Regular security audits and updates",
            "Restricted access to personal information",
            "Secure servers with firewall protection"
          ]
        },
        {
          subtitle: "Payment Security",
          items: [
            "We never store complete credit/debit card information",
            "All payment data is handled by Razorpay's secure servers",
            "Payment information is tokenized and encrypted",
            "PCI DSS Level 1 compliance through Razorpay"
          ]
        }
      ]
    },
    {
      icon: <UserCheck className="h-6 w-6 text-amber-500" />,
      title: "Information Sharing",
      content: [
        {
          subtitle: "We Share Information With",
          items: [
            "Payment processors (Razorpay) - to process transactions",
            "Shipping partners - to deliver your orders",
            "Service providers - for email, analytics, customer support",
            "Legal authorities - when required by law"
          ]
        },
        {
          subtitle: "We Do NOT",
          items: [
            "Sell your personal information to third parties",
            "Share your data for marketing by other companies",
            "Use your information for purposes other than stated here"
          ]
        }
      ]
    }
  ];

  const rights = [
    {
      title: "Access Your Data",
      description: "Request a copy of all personal information we hold about you"
    },
    {
      title: "Update Information",
      description: "Correct or update your personal information anytime"
    },
    {
      title: "Delete Account",
      description: "Request deletion of your account and associated data"
    },
    {
      title: "Opt-Out",
      description: "Unsubscribe from marketing emails (account emails still sent)"
    },
    {
      title: "Data Portability",
      description: "Request your data in a portable format"
    },
    {
      title: "Withdraw Consent",
      description: "Withdraw consent for data processing where applicable"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Header */}
      <div className="text-center mb-20">
        <div className="inline-block mb-6">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-4"></div>
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full">
              <Shield className="h-10 w-10 text-amber-600" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-6">
            Privacy <span className="font-serif italic">Policy</span>
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
        </div>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
          At Jewelcart, we are committed to protecting your privacy and ensuring the security
          of your personal information. This policy explains how we collect, use, and safeguard your data.
        </p>
      </div>

      {/* Introduction */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardContent className="p-8">
          <p className="text-gray-700 mb-6 leading-relaxed font-light">
            Jewelcart ("we", "us", or "our") operates www.jewelcart.com. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you
            visit our website and make purchases.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed font-light">
            By using our website, you consent to the data practices described in this policy.
            If you do not agree with this policy, please do not use our website.
          </p>
          <p className="text-gray-700 leading-relaxed font-light">
            This policy complies with the Information Technology Act, 2000, and the Information
            Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data
            or Information) Rules, 2011.
          </p>
        </CardContent>
      </Card>

      {/* Main Sections */}
      <div className="space-y-8 mb-12">
        {sections.map((section, index) => (
          <Card key={index} className="border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="flex items-center gap-4 font-light text-xl tracking-wide">
                <div className="p-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                  {section.icon}
                </div>
                <span>{section.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {section.content.map((item, idx) => (
                <div key={idx}>
                  <h3 className="font-light text-gray-900 mb-4 text-lg tracking-wide">{item.subtitle}</h3>
                  <ul className="space-y-3">
                    {item.items.map((point, pointIdx) => (
                      <li key={pointIdx} className="flex items-start gap-3 text-gray-700 font-light leading-relaxed">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cookies Section */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-4 font-light text-xl tracking-wide">
            <div className="p-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
              <Database className="h-6 w-6 text-amber-600" />
            </div>
            Cookies and Tracking <span className="font-serif italic">Technologies</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <p className="text-gray-700 leading-relaxed font-light">
            We use cookies and similar tracking technologies to enhance your browsing experience,
            analyze site traffic, and personalize content.
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-amber-50/50 to-white rounded-xl border border-amber-100/50">
              <h4 className="font-light text-gray-900 mb-2 tracking-wide">Essential <span className="font-serif italic">Cookies</span></h4>
              <p className="text-gray-700 text-sm font-light leading-relaxed">
                Required for website functionality, shopping cart, and checkout process
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-amber-50/50 to-white rounded-xl border border-amber-100/50">
              <h4 className="font-light text-gray-900 mb-2 tracking-wide">Analytics <span className="font-serif italic">Cookies</span></h4>
              <p className="text-gray-700 text-sm font-light leading-relaxed">
                Help us understand how visitors use our website
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-amber-50/50 to-white rounded-xl border border-amber-100/50">
              <h4 className="font-light text-gray-900 mb-2 tracking-wide">Marketing <span className="font-serif italic">Cookies</span></h4>
              <p className="text-gray-700 text-sm font-light leading-relaxed">
                Used to show relevant advertisements (with your consent)
              </p>
            </div>
          </div>
          <p className="text-gray-700 text-sm mt-4 font-light leading-relaxed">
            You can control cookies through your browser settings. Note that disabling essential
            cookies may affect website functionality.
          </p>
        </CardContent>
      </Card>

      {/* Your Rights */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-4 font-light text-xl tracking-wide">
            <div className="p-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
              <UserCheck className="h-6 w-6 text-amber-600" />
            </div>
            Your Rights and <span className="font-serif italic">Choices</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rights.map((right, index) => (
              <div key={index} className="border border-gray-100 rounded-xl p-6 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <h4 className="font-light text-gray-900 mb-3 tracking-wide text-lg">{right.title}</h4>
                <p className="text-gray-700 text-sm font-light leading-relaxed">{right.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-gradient-to-br from-amber-50/50 to-amber-100/50 rounded-xl border border-amber-200/50">
            <p className="text-gray-800 font-light leading-relaxed">
              <span className="font-normal">To exercise your rights:</span> Contact us at privacy@jewelcart.com or
              call +91 98765 43210. We will respond within 30 days.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Third-Party Services */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="font-light text-xl tracking-wide">Third-Party <span className="font-serif italic">Services</span></CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="p-5 bg-gradient-to-br from-amber-50/50 to-white rounded-xl border border-amber-100/50">
            <h4 className="font-light text-gray-900 mb-3 tracking-wide text-lg">Payment Processing - <span className="font-serif italic">Razorpay</span></h4>
            <p className="text-gray-700 text-sm mb-3 font-light leading-relaxed">
              We use Razorpay for secure payment processing. When you make a payment, your
              payment information is transmitted directly to Razorpay's secure servers.
            </p>
            <p className="text-gray-700 text-sm font-light">
              Razorpay's privacy policy: <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline font-normal">https://razorpay.com/privacy/</a>
            </p>
          </div>
          <div className="p-5 bg-gradient-to-br from-amber-50/50 to-white rounded-xl border border-amber-100/50">
            <h4 className="font-light text-gray-900 mb-3 tracking-wide text-lg">Shipping <span className="font-serif italic">Partners</span></h4>
            <p className="text-gray-700 text-sm font-light leading-relaxed">
              We share delivery information with courier services to fulfill your orders.
              This includes name, address, and phone number.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Children's Privacy */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="font-light text-xl tracking-wide">Children's <span className="font-serif italic">Privacy</span></CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-gray-700 leading-relaxed font-light">
            Our website is not intended for children under 18 years of age. We do not knowingly
            collect personal information from children. If you believe we have collected information
            from a child, please contact us immediately.
          </p>
        </CardContent>
      </Card>

      {/* Data Retention */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="font-light text-xl tracking-wide">Data <span className="font-serif italic">Retention</span></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <p className="text-gray-700 leading-relaxed font-light">
            We retain your personal information for as long as necessary to fulfill the purposes
            outlined in this policy, unless a longer retention period is required by law.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-gray-700 font-light leading-relaxed">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Account information: Until account deletion or 3 years of inactivity</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 font-light leading-relaxed">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Order information: 7 years (for tax and legal compliance)</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 font-light leading-relaxed">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Marketing data: Until you unsubscribe or 2 years of inactivity</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* International Transfers */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="font-light text-xl tracking-wide">International Data <span className="font-serif italic">Transfers</span></CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-gray-700 leading-relaxed font-light">
            Your information is primarily stored on servers located in India. If we transfer data
            internationally, we ensure appropriate safeguards are in place to protect your information
            in accordance with this privacy policy and applicable laws.
          </p>
        </CardContent>
      </Card>

      {/* Changes to Policy */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="font-light text-xl tracking-wide">Changes to This Privacy <span className="font-serif italic">Policy</span></CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-gray-700 mb-4 leading-relaxed font-light">
            We may update this Privacy Policy from time to time. Changes will be posted on this page.
            Significant changes will be communicated via email to registered users.
          </p>
          <p className="text-gray-700 leading-relaxed font-light">
            Continued use of our website after changes constitutes acceptance of the updated policy.
          </p>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="mb-12 bg-gradient-to-br from-white via-amber-50/30 to-amber-100/50 border border-amber-100/50 shadow-xl">
        <CardHeader className="border-b border-amber-200/50">
          <CardTitle className="flex items-center gap-3 font-light text-xl tracking-wide">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Mail className="h-6 w-6 text-amber-600" />
            </div>
            Contact <span className="font-serif italic">Us</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <p className="text-gray-800 font-light leading-relaxed">
            If you have questions or concerns about this Privacy Policy or your personal information:
          </p>
          <div className="space-y-2 text-gray-700 font-light">
            <p><span className="text-gray-900">Email:</span> privacy@jewelcart.com</p>
            <p><span className="text-gray-900">Phone:</span> +91 98765 43210</p>
            <p><span className="text-gray-900">Address:</span> Jewelcart Pvt Ltd, 123 Jewelry Street, Zaveri Bazaar, Mumbai, Maharashtra 400002, India</p>
            <p><span className="text-gray-900">Data Protection Officer:</span> dpo@jewelcart.com</p>
          </div>
          <p className="text-gray-700 text-sm mt-4 font-light">
            We aim to respond to all inquiries within 30 days.
          </p>
        </CardContent>
      </Card>

      {/* Grievance Officer */}
      <Card className="mb-12 border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="font-light text-xl tracking-wide">Grievance Officer <span className="font-serif italic">(India)</span></CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-gray-700 mb-6 leading-relaxed font-light">
            In accordance with Information Technology Act 2000 and rules made thereunder, the name
            and contact details of the Grievance Officer are provided below:
          </p>
          <div className="space-y-3 text-gray-700 font-light">
            <p><span className="text-gray-900">Name:</span> Mr. Anil Kumar</p>
            <p><span className="text-gray-900">Designation:</span> Grievance Officer</p>
            <p><span className="text-gray-900">Email:</span> grievance@jewelcart.com</p>
            <p><span className="text-gray-900">Phone:</span> +91 22 1234 5678</p>
            <p><span className="text-gray-900">Time:</span> Monday to Friday (10:00 AM to 6:00 PM IST)</p>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
