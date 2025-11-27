
import { useState, useEffect } from "react";
import { Menu, X, Search, ShoppingBag, User, ChevronDown, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const collections = [
    { name: "Engagement Collection", href: "/collections/engagement" },
    { name: "Vintage Collection", href: "/collections/vintage" },
    { name: "Anniversary Collection", href: "/collections/anniversary" },
    { name: "Bridal Collection", href: "/collections/bridal" }
  ];

  const categories = [
    { name: "Rings", href: "/products/rings" },
    { name: "Necklaces", href: "/products/necklaces" },
    { name: "Earrings", href: "/products/earrings" },
    { name: "Bracelets", href: "/products/bracelets" }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
    }
  };

  // Determine text color based on scroll state and page type
  const getTextColor = () => {
    if (isScrolled) return 'text-gray-900';
    return isHomePage ? 'text-white' : 'text-gray-900';
  };

  const getHoverColor = () => {
    if (isScrolled) return 'hover:text-primary';
    return isHomePage ? 'hover:text-primary-light' : 'hover:text-primary';
  };

  const getBorderColor = () => {
    if (isScrolled) return 'border-gray-200/50';
    return isHomePage ? 'border-white/30' : 'border-gray-200/50';
  };

  const getButtonHoverBg = () => {
    if (isScrolled) return 'hover:bg-gray-100';
    return 'hover:bg-primary/80';
  };

  const textColorClass = getTextColor();
  const hoverColorClass = getHoverColor();
  const borderColorClass = getBorderColor();
  const buttonHoverBgClass = getButtonHoverBg();

  return (
    <header 
      className={`sticky top-3 z-50 transition-all duration-300 mx-4 rounded-2xl backdrop-blur-xl shadow-lg ${textColorClass} ${
        isScrolled 
          ? 'bg-white/10 shadow-black/20' 
          : 'bg-white/5'
      } border ${borderColorClass}`}
      style={{
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Jewelcart Logo"
                className="w-auto"
                style={{ height: '70px' }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
            <Link 
              to="/" 
              className={`${textColorClass} ${hoverColorClass} transition-colors font-medium px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
              aria-label="Go to home page"
            >
              Home
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`${textColorClass} ${hoverColorClass} bg-transparent hover:bg-primary/80 font-medium px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                    aria-label="Shop menu with collections and categories"
                  >
                    Shop
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-4 bg-white border border-border shadow-xl rounded-lg">
                      <div className="grid grid-cols-2 gap-6">
                        {/* Categories Section */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Categories</h3>
                          <ul className="space-y-1">
                            {categories.map((category) => (
                              <li key={category.name}>
                                <Link
                                  to={category.href}
                                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                                  aria-label={`Browse ${category.name}`}
                                >
                                  {category.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Collections Section */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Collections</h3>
                          <ul className="space-y-1">
                            {collections.map((collection) => (
                              <li key={collection.name}>
                                <Link
                                  to={collection.href}
                                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                                  aria-label={`View ${collection.name}`}
                                >
                                  {collection.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {/* Quick Link to All Products */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <Link
                          to="/shop"
                          className="block px-3 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                          aria-label="View all products"
                        >
                          View All Products →
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link 
              to="/about" 
              className={`${textColorClass} ${hoverColorClass} transition-colors font-medium px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
              aria-label="Learn about Jewelcart"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`${textColorClass} ${hoverColorClass} transition-colors font-medium px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
              aria-label="Contact us"
            >
              Contact
            </Link>
            <Link 
              to="/faq" 
              className={`${textColorClass} ${hoverColorClass} transition-colors font-medium px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
              aria-label="Frequently asked questions"
            >
              FAQ
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3" role="toolbar" aria-label="User actions">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center" role="search" aria-label="Search products">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 bg-white text-gray-900 focus:ring-2 focus:ring-primary"
                  autoFocus
                  aria-label="Search input"
                />
                <Button 
                  type="submit" 
                  variant="ghost" 
                  size="icon" 
                  className={`${textColorClass} ${buttonHoverBgClass} ml-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                  aria-label="Submit search"
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={`${textColorClass} ${buttonHoverBgClass} focus:outline-none focus:ring-2 focus:ring-primary`}
                  onClick={toggleSearch}
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </Button>
              </form>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className={`${textColorClass} ${buttonHoverBgClass} focus:outline-none focus:ring-2 focus:ring-primary`} 
                onClick={toggleSearch}
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            {isAuthenticated ? (
              <>
                <Link to="/cart" aria-label={`Shopping cart with ${getTotalItems()} items`}>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`${textColorClass} ${buttonHoverBgClass} relative focus:outline-none focus:ring-2 focus:ring-primary`}
                    aria-label={`Shopping cart${getTotalItems() > 0 ? ` with ${getTotalItems()} item${getTotalItems() > 1 ? 's' : ''}` : ''}`}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    {getTotalItems() > 0 && (
                      <span 
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
                        aria-label={`${getTotalItems()} items in cart`}
                      >
                        {getTotalItems()}
                      </span>
                    )}
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`${textColorClass} ${buttonHoverBgClass} focus:outline-none focus:ring-2 focus:ring-primary`}
                      aria-label="User account menu"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={logout} 
                      className="flex items-center text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      aria-label="Logout from account"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    className={`${textColorClass} ${buttonHoverBgClass} focus:outline-none focus:ring-2 focus:ring-primary`}
                    aria-label="Login to your account"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    variant="outline" 
                    className={`bg-transparent ${textColorClass} ${isHomePage && !isScrolled ? 'border-white' : 'border-gray-300'} ${isScrolled ? 'hover:bg-gray-100 hover:text-gray-900' : 'hover:bg-white hover:text-primary'} focus:outline-none focus:ring-2 focus:ring-primary`}
                    aria-label="Create a new account"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${textColorClass} ${buttonHoverBgClass} focus:outline-none focus:ring-2 focus:ring-primary`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            id="mobile-navigation"
            className={`md:hidden py-4 transition-all duration-300 rounded-b-2xl backdrop-blur-xl border-t ${borderColorClass} ${
              isScrolled 
                ? 'bg-white/10' 
                : 'bg-white/5'
            }`}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`${textColorClass} ${hoverColorClass} transition-colors px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                onClick={() => setIsMenuOpen(false)}
                aria-label="Go to home page"
              >
                Home
              </Link>
              
              <Link 
                to="/shop" 
                className={`${textColorClass} ${hoverColorClass} transition-colors px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-medium`}
                onClick={() => setIsMenuOpen(false)}
                aria-label="Browse all products"
              >
                Shop All
              </Link>

              {/* Categories Section */}
              <div className="space-y-2">
                <div className={`${textColorClass} font-semibold px-4 py-2 text-sm uppercase tracking-wide`}>Categories</div>
                <div className="pl-4 space-y-1">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className={`block ${isScrolled ? 'text-gray-700 hover:text-primary' : isHomePage ? 'text-primary-light hover:text-white' : 'text-gray-700 hover:text-primary'} transition-colors text-sm px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                      onClick={() => setIsMenuOpen(false)}
                      aria-label={`Browse ${category.name}`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Collections Section */}
              <div className="space-y-2">
                <div className={`${textColorClass} font-semibold px-4 py-2 text-sm uppercase tracking-wide`}>Collections</div>
                <div className="pl-4 space-y-1">
                  {collections.map((collection) => (
                    <Link
                      key={collection.name}
                      to={collection.href}
                      className={`block ${isScrolled ? 'text-gray-700 hover:text-primary' : isHomePage ? 'text-primary-light hover:text-white' : 'text-gray-700 hover:text-primary'} transition-colors text-sm px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                      onClick={() => setIsMenuOpen(false)}
                      aria-label={`View ${collection.name}`}
                    >
                      {collection.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link 
                to="/about" 
                className={`${textColorClass} ${hoverColorClass} transition-colors px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                onClick={() => setIsMenuOpen(false)}
                aria-label="Learn about Jewelcart"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`${textColorClass} ${hoverColorClass} transition-colors px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                onClick={() => setIsMenuOpen(false)}
                aria-label="Contact us"
              >
                Contact
              </Link>
              <Link 
                to="/faq" 
                className={`${textColorClass} ${hoverColorClass} transition-colors px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                onClick={() => setIsMenuOpen(false)}
                aria-label="Frequently asked questions"
              >
                FAQ
              </Link>

              {/* Mobile Search */}
              <div className={`border-t ${isScrolled ? 'border-gray-200' : isHomePage ? 'border-primary-light' : 'border-gray-200'} pt-4`}>
                <form onSubmit={handleSearch} className="px-4" role="search" aria-label="Search products">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full ${isScrolled ? 'bg-white text-gray-900' : 'bg-white/80 text-gray-900'} focus:ring-2 focus:ring-primary`}
                    aria-label="Search input"
                  />
                </form>
              </div>

              {/* Mobile Auth Section */}
              <div className={`border-t ${isScrolled ? 'border-gray-200' : isHomePage ? 'border-primary-light' : 'border-gray-200'} pt-4 space-y-2`}>
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/cart" 
                      className={`${textColorClass} ${hoverColorClass} transition-colors block px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                      onClick={() => setIsMenuOpen(false)}
                      aria-label={`Shopping cart with ${getTotalItems()} items`}
                    >
                      Cart {getTotalItems() > 0 && `(${getTotalItems()})`}
                    </Link>
                    <Link 
                      to="/profile" 
                      className={`${textColorClass} ${hoverColorClass} transition-colors block px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="View your profile"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className={`${isScrolled ? 'text-red-600 hover:text-red-700' : 'text-red-300 hover:text-red-100'} transition-colors text-left w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                      aria-label="Logout from account"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className={`${textColorClass} ${hoverColorClass} transition-colors block px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Login to your account"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      className={`${textColorClass} ${hoverColorClass} transition-colors block px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Create a new account"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
