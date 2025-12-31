
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-brandgold">Jewelcart</h3>
            <p className="text-black text-sm leading-relaxed">
              Crafting timeless jewelry pieces that tell your unique story. Experience luxury and elegance with our handcrafted collections.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-brandblue hover:text-brandgold cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-brandblue hover:text-brandgold cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-brandblue hover:text-brandgold cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-brandblue hover:text-brandgold cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-brandgold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-brandblue hover:text-brandgold transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-brandblue hover:text-brandgold transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="text-brandblue hover:text-brandgold transition-colors">Shop</Link></li>
              <li><Link to="/contact" className="text-brandblue hover:text-brandgold transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-brandblue hover:text-brandgold transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Policies & Help */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-brandgold">Policies & Help</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shipping-policy" className="text-brandblue hover:text-brandgold transition-colors">Shipping Policy</Link></li>
              <li><Link to="/refund-policy" className="text-brandblue hover:text-brandgold transition-colors">Return & Refund</Link></li>
              <li><Link to="/cancellation-policy" className="text-brandblue hover:text-brandgold transition-colors">Cancellation</Link></li>
              <li><Link to="/size-guide" className="text-brandblue hover:text-brandgold transition-colors">Size Guide</Link></li>
              <li><Link to="/jewelry-care" className="text-brandblue hover:text-brandgold transition-colors">Jewelry Care</Link></li>
              <li><Link to="/certifications" className="text-brandblue hover:text-brandgold transition-colors">Certifications</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-brandgold">Get in Touch</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-brandblue" />
                <span className="text-brandblue">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-brandblue" />
                <span className="text-brandblue">info@jewelcart.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-brandblue mt-0.5" />
                <span className="text-brandblue">123 Jewelry Street<br />Zaveri Bazaar, Mumbai 400002</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-brandblue text-sm">
              © 2024 Jewelcart. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/privacy-policy" className="text-brandblue hover:text-brandgold transition-colors">Privacy Policy</Link>
              <Link to="/terms-conditions" className="text-brandblue hover:text-brandgold transition-colors">Terms & Conditions</Link>
              <Link to="/payment-security" className="text-brandblue hover:text-brandgold transition-colors">Payment Security</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
