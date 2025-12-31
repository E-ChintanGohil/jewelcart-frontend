
import { Shield, Truck, RotateCcw, Award, Clock, Heart } from "lucide-react";

const promises = [
  {
    icon: Shield,
    title: "Certified",
    description: "All our jewelry comes with authenticity certificates"
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Complimentary shipping on orders above ₹2000"
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy"
  },
  {
    icon: Award,
    title: "Quality",
    description: "Premium materials and expert craftsmanship"
  },
  {
    icon: Clock,
    title: "Lifetime Service",
    description: "Free cleaning and maintenance for life"
  },
  {
    icon: Heart,
    title: "Love Guarantee",
    description: "Fall in love with your purchase or exchange it"
  }
];

const OurPromise = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Our Promise</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with the finest jewelry experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promises.map((promise, index) => {
            const Icon = promise.icon;
            return (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6 group-hover:bg-brandgold group-hover:text-white transition-colors duration-300">
                  <Icon className="h-8 w-8 text-brandgold group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">
                  {promise.title}
                </h3>
                <p className="text-gray-600">
                  {promise.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurPromise;
