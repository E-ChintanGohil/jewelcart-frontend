
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden -mt-16">
      {/* Full-screen background image */}
      <div className="absolute inset-0 top-0">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80"
          alt="Luxury Jewelry Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex items-center pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8 text-white">
              <div className="space-y-6">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Limited Time Offer
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
                  Diamonds
                  <br />
                  <span className="text-gray-200">that tell a story</span>
                </h1>
                <p className="text-xl text-gray-200 max-w-lg">
                  Discover our exquisite collection of handcrafted jewelry, where each piece tells a unique story of elegance and timeless beauty.
                </p>
              </div>

              {/* Promotional Offers */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-elegant border">
                  <div className="text-3xl font-bold text-black">20%</div>
                  <div className="text-sm text-gray-600">OFF RINGS</div>
                  <div className="text-xs text-gray-500">Code: RING20</div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-elegant border">
                  <div className="text-3xl font-bold text-black">20%</div>
                  <div className="text-sm text-gray-600">OFF NECKLACES</div>
                  <div className="text-xs text-gray-500">Code: NECK20</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white shadow-elegant">
                  Shop Collection
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                  View Catalog
                </Button>
              </div>
            </div>

            {/* Right side can be used for additional content or kept empty for better focus */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
