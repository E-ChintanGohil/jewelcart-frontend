
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Johnson",
    rating: 5,
    review: "Absolutely stunning jewelry! The craftsmanship is exceptional and the customer service was wonderful.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=80&q=80"
  },
  {
    name: "Michael Chen",
    rating: 5,
    review: "Bought an engagement ring here and couldn't be happier. The quality exceeded my expectations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80"
  },
  {
    name: "Emily Rodriguez",
    rating: 5,
    review: "Beautiful necklace that I wear every day. The attention to detail is remarkable.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80"
  },
  {
    name: "David Wilson",
    rating: 5,
    review: "Professional service and exquisite jewelry. Highly recommend for special occasions.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80"
  }
];

const CustomerReviews = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Customer Reviews</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our customers say about their jewelry experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-soft hover:shadow-elegant transition-shadow duration-300 border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-black">{review.name}</h4>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-black text-black" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                "{review.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
