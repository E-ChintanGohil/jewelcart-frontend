
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import apiService from "@/lib/apiService";

const INSTAGRAM_URL = "https://www.instagram.com/jewelcart.shop";

const Footer = () => {
  const [phone, setPhone] = useState("+91-9023002331");
  const [email, setEmail] = useState("info@jewelcart.shop");
  const [address, setAddress] = useState("61 Thakorbaug Market, Nr. Sardar Patel Seva Samaj,\nNavrangpura, Ahmedabad 380009");
  const [instagram, setInstagram] = useState(INSTAGRAM_URL);

  useEffect(() => {
    apiService.getSettings().then((settings) => {
      if (settings?.contact_phone) setPhone(settings.contact_phone);
      if (settings?.contact_email) setEmail(settings.contact_email);
      if (settings?.contact_address) setAddress(settings.contact_address);
      if (settings?.contact_instagram) setInstagram(settings.contact_instagram);
    }).catch(() => {});
  }, []);

  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-brandblue">JewelCart</h3>
            <p className="text-black text-sm leading-relaxed">
              Affordable Luxury for Every Indian Home. Authentic Gold, Silver, and Diamond jewellery backed by trusted quality, transparent pricing, and dependable service.
            </p>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow JewelCart on Instagram"
              className="inline-flex items-center gap-2 text-brandblue hover:text-brandgold transition-colors text-sm"
            >
              <Instagram className="h-5 w-5" />
              <span>@{instagram.replace(/\/+$/, '').split('/').pop()}</span>
            </a>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-brandblue">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-brandblue hover:text-brandblue transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-brandblue hover:text-brandblue transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="text-brandblue hover:text-brandblue transition-colors">Shop</Link></li>
              <li><Link to="/contact" className="text-brandblue hover:text-brandblue transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-brandblue hover:text-brandblue transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Policies & Help */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-brandblue">Policies & Help</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shipping-policy" className="text-brandblue hover:text-brandblue transition-colors">Shipping Policy</Link></li>
              <li><Link to="/refund-policy" className="text-brandblue hover:text-brandblue transition-colors">Return & Refund</Link></li>
              <li><Link to="/cancellation-policy" className="text-brandblue hover:text-brandblue transition-colors">Cancellation</Link></li>
              <li><Link to="/size-guide" className="text-brandblue hover:text-brandblue transition-colors">Size Guide</Link></li>
              <li><Link to="/jewelry-care" className="text-brandblue hover:text-brandblue transition-colors">Jewelry Care</Link></li>
              <li><Link to="/certifications" className="text-brandblue hover:text-brandblue transition-colors">Certifications</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-brandblue">Get in Touch</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-brandblue" />
                <span className="text-brandblue">{phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-brandblue" />
                <span className="text-brandblue">{email}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-brandblue mt-0.5" />
                <span className="text-brandblue">{address.split('\n').map((line, i) => (
                  <span key={i}>{i > 0 && <br />}{line}</span>
                ))}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-brandblue text-sm">
              © 2026 JewelCart, operated by BVM Enterprise. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/privacy-policy" className="text-brandblue hover:text-brandblue transition-colors">Privacy Policy</Link>
              <Link to="/terms-conditions" className="text-brandblue hover:text-brandblue transition-colors">Terms & Conditions</Link>
              <Link to="/payment-security" className="text-brandblue hover:text-brandblue transition-colors">Payment Security</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
