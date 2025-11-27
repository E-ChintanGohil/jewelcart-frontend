import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Award, Users, Shield } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Star className="h-8 w-8 text-amber-500" />,
      title: "Premium Quality",
      description: "We use only the finest materials including certified gold, silver, and precious gemstones in all our jewelry pieces."
    },
    {
      icon: <Award className="h-8 w-8 text-amber-500" />,
      title: "Expert Craftsmanship",
      description: "Our skilled artisans have years of experience creating exquisite jewelry with attention to every detail."
    },
    {
      icon: <Users className="h-8 w-8 text-amber-500" />,
      title: "Customer First",
      description: "We prioritize customer satisfaction and offer personalized service to help you find the perfect piece."
    },
    {
      icon: <Shield className="h-8 w-8 text-amber-500" />,
      title: "Lifetime Guarantee",
      description: "All our jewelry comes with lifetime service guarantee for repairs and maintenance."
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Master Jeweler",
      experience: "25+ years",
      specialization: "Traditional Indian designs"
    },
    {
      name: "Priya Sharma",
      role: "Design Director",
      experience: "15+ years",
      specialization: "Contemporary & bridal jewelry"
    },
    {
      name: "Anil Patel",
      role: "Quality Control",
      experience: "20+ years",
      specialization: "Precious stone certification"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEO
        title="About Jewelcart - Our Story, Values & Master Craftsmen | Since 1995"
        description="Learn about Jewelcart's rich heritage since 1995. Discover our story, values, master craftsmen, and commitment to creating exquisite handcrafted jewelry. 50,000+ happy customers, 15,000+ jewelry pieces crafted."
        image="/og-image.jpg"
        keywords="about jewelcart, jewelry company history, jewelry craftsmen, jewelry store about us, jewelry company values, jewelry making, jewelry craftsmanship"
      />
      <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <div className="inline-block mb-6">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-4"></div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-6">
            About <span className="font-serif italic">Jewelcart</span>
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
        </div>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
          Since 1995, we have been crafting exquisite jewelry pieces that celebrate life's precious moments.
          From engagement rings to everyday elegance, we bring you timeless designs with modern craftsmanship.
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
                Jewelcart began as a small family business in Mumbai with a simple vision: to create beautiful,
                high-quality jewelry that people could treasure for generations. What started as a single store
                has now grown into one of India's most trusted jewelry brands.
              </p>
              <p>
                Our founder, Mukesh Agarwal, learned the art of jewelry making from his grandfather and
                combined traditional techniques with modern design sensibilities. Today, we continue this
                legacy with the same passion and dedication to quality.
              </p>
              <p>
                Every piece in our collection is carefully crafted by skilled artisans who take pride in
                their work. We believe that jewelry is not just an accessory, but an expression of love,
                celebration, and personal style.
              </p>
            </div>
          </div>
          <div className="relative order-1 lg:order-2 group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent rounded-2xl"></div>
            <img
              src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=600&fit=crop&q=80"
              alt="Jewelry crafting process"
              className="rounded-2xl shadow-2xl w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <Badge className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-amber-700 border border-amber-200 shadow-lg px-4 py-2 font-light">
              29 Years of Excellence
            </Badge>
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Team Section */}
      <div className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-wide">
            Meet Our <span className="font-serif italic">Master Craftsmen</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white/50 backdrop-blur-sm group">
              <CardContent className="p-8">
                <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50 rounded-full flex items-center justify-center shadow-inner transform transition-transform duration-300 group-hover:scale-105">
                  <span className="text-2xl font-light text-amber-700 tracking-wider">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-3 tracking-wide">
                  {member.name}
                </h3>
                <Badge variant="secondary" className="mb-4 bg-amber-50 text-amber-700 border border-amber-200 font-light">
                  {member.role}
                </Badge>
                <div className="space-y-2 text-gray-600 text-sm">
                  <p>
                    <span className="font-light">Experience:</span> <span className="text-gray-900">{member.experience}</span>
                  </p>
                  <p>
                    <span className="font-light">Specialization:</span> <span className="text-gray-900">{member.specialization}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-amber-50/30 to-amber-100/50 rounded-3xl p-12 md:p-16 border border-amber-100/50 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent)]"></div>
        <div className="relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-wide">
              Our <span className="font-serif italic">Achievements</span>
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-light text-amber-700 mb-3 tracking-tight">50,000+</div>
              <div className="text-gray-600 text-sm font-light">Happy Customers</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-light text-amber-700 mb-3 tracking-tight">15,000+</div>
              <div className="text-gray-600 text-sm font-light">Jewelry Pieces Crafted</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-light text-amber-700 mb-3 tracking-tight">25+</div>
              <div className="text-gray-600 text-sm font-light">Cities Served</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-light text-amber-700 mb-3 tracking-tight">99%</div>
              <div className="text-gray-600 text-sm font-light">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}