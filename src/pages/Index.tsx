import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import ShopByCategory from "@/components/ShopByCategory";
import TrendingNow from "@/components/TrendingNow";
import NewArrivals from "@/components/NewArrivals";
import CuratedForYou from "@/components/CuratedForYou";
import ShopByGender from "@/components/ShopByGender";
import JewelCartExperience from "@/components/JewelCartExperience";
import OurPromise from "@/components/OurPromise";
import CustomerReviews from "@/components/CustomerReviews";
import ShopByCollection from "@/components/ShopByCollection";
import VisitOurStores from "@/components/VisitOurStores";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  return (
    <div className="relative">
      <SEO
        title="Jewelcart - Exquisite Handcrafted Jewelry Collection | Rings, Necklaces, Earrings & More"
        description="Discover our exquisite collection of handcrafted jewelry, where each piece tells a unique story of elegance and timeless beauty. Shop premium gold, silver, and diamond jewelry online. Free shipping on orders above ₹1,00,000."
        image="/og-image.jpg"
        keywords="jewelry, diamonds, gold jewelry, silver jewelry, rings, necklaces, earrings, bracelets, engagement rings, wedding jewelry, luxury jewelry, handmade jewelry, online jewelry store, jewelry shopping"
      />
      <HeroSection />
      <TrendingNow />
      <ShopByCategory />
      <NewArrivals />
      <CuratedForYou />
      <ShopByGender />
      <JewelCartExperience />
      <OurPromise />
      <CustomerReviews />
      <ShopByCollection />
      <VisitOurStores />
      <FAQSection />
    </div>
  );
};

export default Index;
