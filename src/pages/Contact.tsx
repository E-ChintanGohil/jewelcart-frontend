import { useState } from 'react';
import SEO from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-amber-500" />,
      title: "Visit Our Showroom",
      content: [
        "123 Jewelry Street, Zaveri Bazaar",
        "Mumbai, Maharashtra 400002",
        "India"
      ]
    },
    {
      icon: <Phone className="h-6 w-6 text-amber-500" />,
      title: "Call Us",
      content: [
        "+91 98765 43210",
        "+91 22 1234 5678",
        "Toll Free: 1800 123 4567"
      ]
    },
    {
      icon: <Mail className="h-6 w-6 text-amber-500" />,
      title: "Email Us",
      content: [
        "info@jewelcart.com",
        "orders@jewelcart.com",
        "support@jewelcart.com"
      ]
    },
    {
      icon: <Clock className="h-6 w-6 text-amber-500" />,
      title: "Store Hours",
      content: [
        "Monday - Saturday: 10:00 AM - 8:00 PM",
        "Sunday: 11:00 AM - 7:00 PM",
        "Holidays: 12:00 PM - 6:00 PM"
      ]
    }
  ];

  const services = [
    "Custom Jewelry Design",
    "Jewelry Repair & Maintenance",
    "Appraisal Services",
    "Ring Resizing",
    "Stone Setting",
    "Engraving Services",
    "Wedding Planning Consultation",
    "Corporate Gifts"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEO
        title="Contact Jewelcart - Get in Touch | Jewelry Store Support & Inquiries"
        description="Have questions about our jewelry or need assistance? Contact Jewelcart today! Email: info@jewelcart.com | Phone: +91 98765 43210 | Address: 123 Jewelry Street, Zaveri Bazaar, Mumbai. We're here to help!"
        image="/og-image.jpg"
        keywords="contact jewelcart, jewelry store contact, jewelry customer service, jewelry inquiries, jewelry support, jewelry store phone number, jewelry store email"
      />
      <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <div className="inline-block mb-6">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-4"></div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-6">
            Contact <span className="font-serif italic">Us</span>
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
        </div>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
          Have questions about our jewelry or need assistance? We're here to help!
          Reach out to us and our expert team will be happy to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="flex items-center gap-3 font-light text-xl tracking-wide">
                <div className="p-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-amber-600" />
                </div>
                Send us a <span className="font-serif italic">Message</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What can we help you with?"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Contact Details */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-light text-gray-900 mb-3 tracking-wide text-lg">
                        {info.title}
                      </h3>
                      <div className="space-y-1">
                        {info.content.map((item, idx) => (
                          <p key={idx} className="text-gray-600 text-sm font-light leading-relaxed">
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Services */}
          <Card className="border border-gray-100 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-lg font-light tracking-wide">Our <span className="font-serif italic">Services</span></CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-gray-600 font-light">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></div>
                    <span className="leading-relaxed">{service}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <Card className="border border-gray-100 shadow-xl bg-white/50 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="font-light text-xl tracking-wide">Find Our <span className="font-serif italic">Showroom</span></CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl h-64 flex items-center justify-center border border-gray-200">
              <div className="text-center text-gray-500">
                <div className="mb-4 inline-block p-4 bg-white rounded-full shadow-lg">
                  <MapPin className="h-8 w-8 text-amber-600" />
                </div>
                <p className="text-lg font-light mb-2">Interactive Map</p>
                <p className="text-sm font-light mb-3">Map integration would be implemented here</p>
                <p className="text-xs font-light">123 Jewelry Street, Zaveri Bazaar, Mumbai 400002</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-wide">
            Frequently Asked <span className="font-serif italic">Questions</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="font-light text-gray-900 mb-3 text-lg tracking-wide">
                Do you offer custom jewelry design?
              </h3>
              <p className="text-gray-600 text-sm font-light leading-relaxed">
                Yes! We specialize in custom jewelry design. Our expert designers work with you
                to create unique pieces that match your vision and budget.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="font-light text-gray-900 mb-3 text-lg tracking-wide">
                What is your return policy?
              </h3>
              <p className="text-gray-600 text-sm font-light leading-relaxed">
                We offer a 30-day return policy for unworn items in original condition.
                Custom pieces and engraved items are non-returnable.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="font-light text-gray-900 mb-3 text-lg tracking-wide">
                Do you provide certificates for diamonds?
              </h3>
              <p className="text-gray-600 text-sm font-light leading-relaxed">
                Yes, all our diamonds come with certification from recognized gemological
                institutes like GIA, IGI, or SGL.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="font-light text-gray-900 mb-3 text-lg tracking-wide">
                How long does custom jewelry take?
              </h3>
              <p className="text-gray-600 text-sm font-light leading-relaxed">
                Custom jewelry typically takes 2-4 weeks depending on the complexity of the design.
                We'll provide a timeline during consultation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
}