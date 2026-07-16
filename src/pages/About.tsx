import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  Award,
  Smile,
  Lightbulb,
  IndianRupee,
  CheckCircle,
  Target,
  Eye,
  Gem,
} from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Shield className="h-8 w-8 text-amber-500" />,
      title: "Trust",
      description: "Every relationship begins with honesty. We build lasting confidence through transparent, dependable service."
    },
    {
      icon: <Award className="h-8 w-8 text-amber-500" />,
      title: "Quality",
      description: "We never compromise on craftsmanship. Every piece is selected with attention to detail and lasting value."
    },
    {
      icon: <IndianRupee className="h-8 w-8 text-amber-500" />,
      title: "Affordability",
      description: "Luxury should be within everyone's reach. We offer authentic jewellery at honest, transparent prices."
    },
    {
      icon: <Smile className="h-8 w-8 text-amber-500" />,
      title: "Customer Happiness",
      description: "Every customer deserves a delightful shopping experience, from browsing to doorstep delivery."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-amber-500" />,
      title: "Innovation",
      description: "Making jewellery shopping easier, secure, and more enjoyable through modern technology."
    }
  ];

  const whyChoose = [
    "Authentic Gold, Silver & Diamond Jewellery",
    "Elegant Designs for Every Occasion",
    "Affordable Pricing",
    "Secure Online Shopping",
    "Trusted Indian Seller",
    "Fast & Safe Delivery",
    "Customer-First Service",
    "Transparent Pricing",
    "Modern & Traditional Collections",
    "Perfect for Gifting"
  ];

  const offerings = [
    {
      icon: <Gem className="h-8 w-8 text-amber-500" />,
      title: "Gold Jewellery",
      description: "Elegant designs for weddings, festivals, gifting, and everyday wear."
    },
    {
      icon: <Gem className="h-8 w-8 text-amber-500" />,
      title: "Silver Jewellery",
      description: "Stylish, affordable, and perfect for daily fashion."
    },
    {
      icon: <Gem className="h-8 w-8 text-amber-500" />,
      title: "Diamond Jewellery",
      description: "Beautifully crafted pieces for life's most precious moments."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEO
        title="About JewelCart - Affordable Luxury, Trusted Quality | Gold, Silver & Diamond Jewellery"
        description="JewelCart, operated by BVM Enterprise, is an affordable online marketplace for authentic Gold, Silver, and Diamond jewellery. Founded by Bhushan M Soni, we bring trusted quality, transparent pricing, and timeless elegance to every Indian home."
        image="/og-image.jpg"
        keywords="about jewelcart, bvm enterprise, affordable jewellery, gold silver diamond jewellery, trusted indian jeweller, online jewellery store india"
      />
      <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <div className="inline-block mb-6">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-4"></div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-6">
            About <span className="font-serif italic">JewelCart</span>
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
        </div>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
          Jewellery has always been more than an ornament in India. It is a symbol of love,
          celebration, tradition, achievement, and memories that last for generations.
          JewelCart was created with a simple vision — to make beautiful, authentic jewellery
          accessible to every Indian family.
        </p>
      </div>

      {/* Story Section */}
      <div className="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 tracking-wide">
              Our <span className="font-serif italic">Story</span>
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Operated by <span className="text-gray-900 font-medium">BVM Enterprise</span>, a proprietorship firm,
                JewelCart is an online destination for thoughtfully curated Gold, Silver, and Diamond jewellery.
                We combine traditional craftsmanship with modern designs, offering collections that suit everyday
                wear, festive occasions, weddings, gifting, and life's unforgettable milestones.
              </p>
              <p>
                Our journey began with one question:
                <span className="text-gray-900 font-medium"> why should premium-looking jewellery always come with a premium price tag?</span>
                That question inspired us to build a platform where customers can shop confidently, knowing they
                are receiving quality products, transparent pricing, and dependable service.
              </p>
              <p>
                As an online-first brand, we focus on making jewellery shopping simple, secure, and enjoyable.
                From browsing our collections to doorstep delivery, every step is designed with our customers in mind.
                At JewelCart, trust is not just a promise — it is the foundation of everything we do.
              </p>
              <p className="text-gray-900 font-medium">
                JewelCart — Affordable Luxury. Trusted Quality. Timeless Elegance.
              </p>
            </div>
          </div>
          <div className="relative order-1 lg:order-2 group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent rounded-2xl"></div>
            <img
              src="/placeholder.svg"
              alt="JewelCart jewellery collection"
              className="rounded-2xl shadow-2xl w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <Badge className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-amber-700 border border-amber-200 shadow-lg px-4 py-2 font-light">
              Founded by Bhushan M Soni
            </Badge>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-gray-100 shadow-lg bg-white/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="mb-6 inline-flex p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full">
              <Target className="h-8 w-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-wide">
              Our <span className="font-serif italic">Mission</span>
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To make authentic Gold, Silver, and Diamond jewellery affordable and accessible across India through
              technology, transparency, and exceptional customer service.
            </p>
          </CardContent>
        </Card>
        <Card className="border border-gray-100 shadow-lg bg-white/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="mb-6 inline-flex p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full">
              <Eye className="h-8 w-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-wide">
              Our <span className="font-serif italic">Vision</span>
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To become one of India's most trusted online jewellery destinations by delivering quality products,
              honest pricing, and memorable shopping experiences.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Why Choose Section */}
      <div className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-wide">
            Why Choose <span className="font-serif italic">JewelCart</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {whyChoose.map((reason, index) => (
            <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-white/50 border border-gray-100 shadow-sm">
              <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
              <span className="text-gray-700 text-sm font-light leading-relaxed">{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-wide">
            Our <span className="font-serif italic">Values</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="text-center p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white/50 backdrop-blur-sm group">
              <CardContent className="p-0">
                <div className="mb-6 flex justify-center transform transition-transform duration-300 group-hover:scale-110">
                  <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-lg font-light text-gray-900 mb-4 tracking-wide">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-wide">
            What We <span className="font-serif italic">Offer</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerings.map((item, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white/50 backdrop-blur-sm group">
              <CardContent className="p-8">
                <div className="mb-6 flex justify-center transform transition-transform duration-300 group-hover:scale-110">
                  <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-3 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Promise / Founder Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-amber-50/30 to-amber-100/50 rounded-3xl p-12 md:p-16 border border-amber-100/50 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent)]"></div>
        <div className="relative text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-wide">
            Our <span className="font-serif italic">Promise</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 leading-relaxed font-light mb-4">
            Every order is packed with care and delivered with responsibility — premium quality products,
            secure payment options, reliable customer support, safe packaging, timely delivery, and
            transparent communication.
          </p>
          <p className="text-xl text-gray-900 font-light">
            Quality You Can Trust. Prices You'll Love.
          </p>
          <p className="mt-8 text-sm text-gray-600 font-light">
            Operated by <span className="text-gray-900 font-medium">BVM Enterprise</span>, a proprietorship firm founded by Bhushan M Soni.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
