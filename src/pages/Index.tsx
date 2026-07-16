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
        title="JewelCart - Affordable Gold, Silver & Diamond Jewellery Online | Trusted Quality"
        description="Buy affordable Gold, Silver, and Diamond jewellery online from JewelCart. Explore elegant collections with trusted quality, secure shopping, transparent pricing, and fast delivery across India."
        image="/og-image.jpg"
        keywords="jewellery, diamonds, gold jewellery, silver jewellery, rings, necklaces, earrings, bracelets, affordable jewellery, wedding jewellery, online jewellery store india, jewelcart"
      />
      <HeroSection />
      <ShopByCollection />
      {/* <TrendingNow /> */}
      <ShopByCategory />
      {/* <NewArrivals /> */}
      {/* <CuratedForYou /> */}
      {/* <ShopByGender /> */}
      <JewelCartExperience />
      <OurPromise />
      <CustomerReviews />
      {/* <VisitOurStores /> */}
      {/* <FAQSection /> */}
    </div>
  );
};

export default Index;
