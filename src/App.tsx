import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

// Layout components
import CustomerLayout from "./components/layouts/CustomerLayout";
import PublicLayout from "./components/layouts/PublicLayout";
import AdminLayout from "./components/admin/AdminLayout";
import { RequireAuth, RequireAdmin } from "./components/auth/RequireAuth";

// Public pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/admin/AdminLogin";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Static/Policy pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import CancellationPolicy from "./pages/CancellationPolicy";
import PaymentSecurity from "./pages/PaymentSecurity";
import FAQ from "./pages/FAQ";
import JewelryCareGuide from "./pages/JewelryCareGuide";
import SizeGuide from "./pages/SizeGuide";
import Certifications from "./pages/Certifications";

// Customer pages
import Index from "./pages/Index";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import WomenCollection from "./pages/WomenCollection";
import Shop from "./pages/customer/Shop";
import Cart from "./pages/customer/Cart";
import Profile from "./pages/customer/Profile";
import Checkout from "./pages/customer/Checkout";
import OrderSuccess from "./pages/customer/OrderSuccess";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import Customers from "./pages/admin/Customers";
import Orders from "./pages/admin/Orders";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import Content from "./pages/admin/Content";

import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Routes (no auth required) */}
              <Route path="/login" element={<PublicLayout />}>
                <Route index element={<Login />} />
              </Route>
              <Route path="/register" element={<PublicLayout />}>
                <Route index element={<Register />} />
              </Route>
              <Route path="/console/login" element={<PublicLayout />}>
                <Route index element={<AdminLogin />} />
              </Route>

              {/* Customer Routes (public + authenticated customer features) */}
              <Route path="/" element={<CustomerLayout />}>
                <Route index element={<Index />} />
                <Route path="shop" element={<Shop />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />

                {/* Policy & Static Pages */}
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="terms-conditions" element={<TermsConditions />} />
                <Route path="refund-policy" element={<RefundPolicy />} />
                <Route path="shipping-policy" element={<ShippingPolicy />} />
                <Route path="cancellation-policy" element={<CancellationPolicy />} />
                <Route path="payment-security" element={<PaymentSecurity />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="jewelry-care" element={<JewelryCareGuide />} />
                <Route path="size-guide" element={<SizeGuide />} />
                <Route path="certifications" element={<Certifications />} />

                {/* Product & Shopping */}
                <Route path="products/:category" element={<ProductListing />} />
                <Route path="collections/:collection" element={<ProductListing />} />
                <Route path="collections/women" element={<WomenCollection />} />
                <Route path="collections/men" element={<ProductListing />} />
                <Route path="collections/kids" element={<ProductListing />} />
                <Route path="collections/unisex" element={<ProductListing />} />
                <Route path="products/new" element={<ProductListing />} />
                <Route path="products/all" element={<ProductListing />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="order-success" element={<OrderSuccess />} />
                <Route path="profile" element={<Profile />} />
                <Route path="stores" element={<ProductListing />} />
                <Route path="consultation" element={<ProductListing />} />
                <Route path="virtual-try-on" element={<ProductListing />} />
                <Route path="custom-design" element={<ProductListing />} />
              </Route>

              {/* Admin Console Routes (protected) */}
              <Route path="/console" element={
                <RequireAdmin>
                  <AdminLayout />
                </RequireAdmin>
              }>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="categories" element={<Categories />} />
                <Route path="customers" element={<Customers />} />
                <Route path="orders" element={<Orders />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
                <Route path="content" element={<Content />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
