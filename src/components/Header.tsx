import { useState, useEffect } from "react";
import { Menu, X, Search, User, LogOut, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

// ---------- Data ----------

interface MegaMenuCategory {
	slug: string;
	label: string;
	popularTypes: string[];
	commonTypes: string[];
	priceRanges: { label: string; min?: number; max?: number }[];
	metals: string[];
}

const megaCategories: MegaMenuCategory[] = [
	{
		slug: "rings",
		label: "Rings",
		popularTypes: ["Engagement", "Couple Bands", "Office Wear", "Stackable", "Slider"],
		commonTypes: ["Diamond", "Plain Gold", "Gemstone", "Solitaire", "Cocktail", "Pearl", "Platinum", "For Men", "For Gift"],
		priceRanges: [
			{ label: "Below \u20B910,000", max: 10000 },
			{ label: "\u20B910k - 20k", min: 10000, max: 20000 },
			{ label: "\u20B920k - 30k", min: 20000, max: 30000 },
			{ label: "\u20B930k - 40k", min: 30000, max: 40000 },
			{ label: "\u20B940k - 50k", min: 40000, max: 50000 },
			{ label: "\u20B950,000+", min: 50000 },
		],
		metals: ["Diamond", "Gold", "White Gold", "Rose Gold", "Platinum"],
	},
	{
		slug: "earrings",
		label: "Earrings",
		popularTypes: ["Studs", "Hoops", "Drops", "Jhumkas", "Chandeliers"],
		commonTypes: ["Diamond", "Plain Gold", "Gemstone", "Solitaire", "Cocktail", "Pearl", "Platinum", "For Men", "For Gift"],
		priceRanges: [
			{ label: "Below \u20B910,000", max: 10000 },
			{ label: "\u20B910k - 20k", min: 10000, max: 20000 },
			{ label: "\u20B920k - 30k", min: 20000, max: 30000 },
			{ label: "\u20B930k - 40k", min: 30000, max: 40000 },
			{ label: "\u20B940k - 50k", min: 40000, max: 50000 },
			{ label: "\u20B950,000+", min: 50000 },
		],
		metals: ["Diamond", "Gold", "White Gold", "Rose Gold", "Platinum"],
	},
	{
		slug: "pendants",
		label: "Pendants",
		popularTypes: ["Solitaire", "Heart", "Religious", "Initial", "Everyday"],
		commonTypes: ["Diamond", "Plain Gold", "Gemstone", "Solitaire", "Cocktail", "Pearl", "Platinum", "For Men", "For Gift"],
		priceRanges: [
			{ label: "Below \u20B910,000", max: 10000 },
			{ label: "\u20B910k - 20k", min: 10000, max: 20000 },
			{ label: "\u20B920k - 30k", min: 20000, max: 30000 },
			{ label: "\u20B930k - 40k", min: 30000, max: 40000 },
			{ label: "\u20B940k - 50k", min: 40000, max: 50000 },
			{ label: "\u20B950,000+", min: 50000 },
		],
		metals: ["Diamond", "Gold", "White Gold", "Rose Gold", "Platinum"],
	},
	{
		slug: "bracelets",
		label: "Bracelets",
		popularTypes: ["Chain", "Charm", "Cuff", "Tennis", "Bangles"],
		commonTypes: ["Diamond", "Plain Gold", "Gemstone", "Solitaire", "Cocktail", "Pearl", "Platinum", "For Men", "For Gift"],
		priceRanges: [
			{ label: "Below \u20B910,000", max: 10000 },
			{ label: "\u20B910k - 20k", min: 10000, max: 20000 },
			{ label: "\u20B920k - 30k", min: 20000, max: 30000 },
			{ label: "\u20B930k - 40k", min: 30000, max: 40000 },
			{ label: "\u20B940k - 50k", min: 40000, max: 50000 },
			{ label: "\u20B950,000+", min: 50000 },
		],
		metals: ["Diamond", "Gold", "White Gold", "Rose Gold", "Platinum"],
	},
	{
		slug: "necklaces",
		label: "Necklaces",
		popularTypes: ["Choker", "Chain", "Layered", "Statement", "Mangalsutra"],
		commonTypes: ["Diamond", "Plain Gold", "Gemstone", "Solitaire", "Cocktail", "Pearl", "Platinum", "For Men", "For Gift"],
		priceRanges: [
			{ label: "Below \u20B910,000", max: 10000 },
			{ label: "\u20B910k - 20k", min: 10000, max: 20000 },
			{ label: "\u20B920k - 30k", min: 20000, max: 30000 },
			{ label: "\u20B930k - 40k", min: 30000, max: 40000 },
			{ label: "\u20B940k - 50k", min: 40000, max: 50000 },
			{ label: "\u20B950,000+", min: 50000 },
		],
		metals: ["Diamond", "Gold", "White Gold", "Rose Gold", "Platinum"],
	},
	{
		slug: "bangles",
		label: "Bangles",
		popularTypes: ["Traditional", "Modern", "Stackable", "Kada", "Designer"],
		commonTypes: ["Diamond", "Plain Gold", "Gemstone", "Solitaire", "Cocktail", "Pearl", "Platinum", "For Men", "For Gift"],
		priceRanges: [
			{ label: "Below \u20B910,000", max: 10000 },
			{ label: "\u20B910k - 20k", min: 10000, max: 20000 },
			{ label: "\u20B920k - 30k", min: 20000, max: 30000 },
			{ label: "\u20B930k - 40k", min: 30000, max: 40000 },
			{ label: "\u20B940k - 50k", min: 40000, max: 50000 },
			{ label: "\u20B950,000+", min: 50000 },
		],
		metals: ["Diamond", "Gold", "White Gold", "Rose Gold", "Platinum"],
	},
];

const simpleNavLinks = [
	{ label: "Solitaires", href: "/solitaire" },
	{ label: "All Jewellery", href: "/shop" },
	{ label: "Gifts", href: "/shop?category=gifts" },
	{ label: "Offers", href: "/offers" },
];

// ---------- Helpers ----------

function typeHref(slug: string, type: string) {
	return `/products/${slug}?type=${encodeURIComponent(type)}`;
}

function priceHref(slug: string, range: { min?: number; max?: number }) {
	const params = new URLSearchParams();
	if (range.min != null) params.set("minPrice", String(range.min));
	if (range.max != null) params.set("maxPrice", String(range.max));
	return `/products/${slug}?${params.toString()}`;
}

function metalHref(slug: string, metal: string) {
	return `/products/${slug}?metal=${encodeURIComponent(metal)}`;
}

// ---------- Sub-components ----------

const linkClass =
	"block py-1.5 text-sm text-gray-600 hover:text-brandgold transition-colors";
const colHeadingClass =
	"text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3";

function MegaMenuPanel({ cat }: { cat: MegaMenuCategory }) {
	return (
		<div className="w-[820px] p-6 bg-white border border-gray-100 shadow-xl rounded-lg">
			<div className="grid grid-cols-4 gap-8">
				{/* Col 1: Category-specific popular types */}
				<div>
					<h4 className={colHeadingClass}>Popular {cat.label}</h4>
					<ul className="space-y-0.5">
						{cat.popularTypes.map((t) => (
							<li key={t}>
								<Link to={typeHref(cat.slug, t)} className={linkClass}>
									{t} {cat.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Col 2: Common types */}
				<div>
					<h4 className={colHeadingClass}>Shop By Type</h4>
					<ul className="space-y-0.5">
						{cat.commonTypes.map((t) => (
							<li key={t}>
								<Link to={typeHref(cat.slug, t)} className={linkClass}>
									{t} {cat.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Col 3: By Price Range */}
				<div>
					<h4 className={colHeadingClass}>By Price Range</h4>
					<ul className="space-y-0.5">
						{cat.priceRanges.map((r) => (
							<li key={r.label}>
								<Link to={priceHref(cat.slug, r)} className={linkClass}>
									{r.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Col 4: By Metals & Stones */}
				<div>
					<h4 className={colHeadingClass}>By Metals &amp; Stones</h4>
					<ul className="space-y-0.5">
						{cat.metals.map((m) => (
							<li key={m}>
								<Link to={metalHref(cat.slug, m)} className={linkClass}>
									{m} {cat.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="mt-5 pt-4 border-t border-gray-100">
				<Link
					to={`/products/${cat.slug}`}
					className="inline-block text-sm font-medium text-brandgold hover:underline"
				>
					View All {cat.label} &rarr;
				</Link>
			</div>
		</div>
	);
}

// ---------- Mobile mega-menu accordion item ----------

function MobileMegaItem({
	cat,
	value,
	onClose,
}: {
	cat: MegaMenuCategory;
	value: string;
	onClose: () => void;
}) {
	return (
		<AccordionItem value={value} className="px-4 py-3">
			<AccordionTrigger className="p-0 text-xs uppercase tracking-wider hover:no-underline">
				{cat.label}
			</AccordionTrigger>
			<AccordionContent className="pt-4 pb-0">
				<div className="grid sm:grid-cols-2 max-sm:grid-cols-1 gap-6">
					<div>
						<h4 className={colHeadingClass}>Popular {cat.label}</h4>
						{cat.popularTypes.map((t) => (
							<Link
								key={t}
								to={typeHref(cat.slug, t)}
								className="block px-3 py-1.5 text-sm text-gray-700 hover:text-brandgold"
								onClick={onClose}
							>
								{t} {cat.label}
							</Link>
						))}
					</div>
					<div>
						<h4 className={colHeadingClass}>Shop By Type</h4>
						{cat.commonTypes.map((t) => (
							<Link
								key={t}
								to={typeHref(cat.slug, t)}
								className="block px-3 py-1.5 text-sm text-gray-700 hover:text-brandgold"
								onClick={onClose}
							>
								{t} {cat.label}
							</Link>
						))}
					</div>
					<div>
						<h4 className={colHeadingClass}>By Price Range</h4>
						{cat.priceRanges.map((r) => (
							<Link
								key={r.label}
								to={priceHref(cat.slug, r)}
								className="block px-3 py-1.5 text-sm text-gray-700 hover:text-brandgold"
								onClick={onClose}
							>
								{r.label}
							</Link>
						))}
					</div>
					<div>
						<h4 className={colHeadingClass}>By Metals &amp; Stones</h4>
						{cat.metals.map((m) => (
							<Link
								key={m}
								to={metalHref(cat.slug, m)}
								className="block px-3 py-1.5 text-sm text-gray-700 hover:text-brandgold"
								onClick={onClose}
							>
								{m} {cat.label}
							</Link>
						))}
					</div>
				</div>
				<div className="mt-4 pb-2">
					<Link
						to={`/products/${cat.slug}`}
						className="text-sm font-medium text-brandgold hover:underline"
						onClick={onClose}
					>
						View All {cat.label} &rarr;
					</Link>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
}

// ---------- Header ----------

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [isScrolled, setIsScrolled] = useState(false);
	const { user, logout, isAuthenticated } = useAuth();
	const { getTotalItems } = useCart();
	const { items: wishlistItems } = useWishlist();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 100);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
			setSearchQuery("");
		}
	};

	return (
		<header
			className={`w-full flex flex-col bg-white ${
				isScrolled ? "sticky top-0 z-[48] shadow-light animate-slideDown" : ""
			}`}
		>
			{/* Top bar: Logo | Search | Icons */}
			<div className="mx-auto max-w-[1232px] w-full pb-0 max-lg:py-2 lg:pt-2 px-4">
				<div className="flex items-center justify-between w-full gap-4">
					{/* Logo */}
					<Link to="/" className="flex-shrink-0 md:h-20 max-md:h-16 flex">
						<img src="/logo.png" alt="Jewelcart Logo" />
					</Link>

					{/* Search bar - desktop */}
					<form
						onSubmit={handleSearch}
						className="hidden lg:flex flex-1 max-w-md mx-auto relative"
						role="search"
						aria-label="Search products"
					>
						<Input
							type="search"
							placeholder="Search for Jewellery..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-10 pr-4 h-10 border-gray-200 rounded-full bg-gray-50 focus-visible:ring-brandgold text-sm"
							aria-label="Search input"
						/>
						<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
					</form>

					{/* Icons */}
					<div className="flex items-center md:gap-4 max-md:gap-3 flex-shrink-0">
						<Link
							to="/profile?tab=wishlist"
							className="relative hover:text-brandgold"
							aria-label={`Wishlist with ${wishlistItems.length} items`}
						>
							<Heart
								className={`h-5 w-5 ${
									wishlistItems.length > 0
										? "fill-red-500 text-red-500"
										: ""
								}`}
							/>
							{wishlistItems.length > 0 && (
								<small className="absolute -right-[5px] -top-[5px] bg-red-500 w-4 h-4 text-white z-[3] flex items-center justify-center text-xs font-medium rounded-xl">
									{wishlistItems.length}
								</small>
							)}
						</Link>

						<Link
							to="/cart"
							className="relative hover:text-brandgold"
							aria-label={`Shopping cart with ${getTotalItems()} items`}
						>
							<ShoppingCart className="h-5 w-5" />
							{getTotalItems() > 0 && (
								<small className="absolute -right-[5px] -top-[5px] bg-brandgold w-4 h-4 text-white z-[3] flex items-center justify-center text-xs font-medium rounded-xl">
									{getTotalItems()}
								</small>
							)}
						</Link>

						{isAuthenticated ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										className="min-w-fit p-0 bg-transparent text-brandblue h-auto rounded-none relative hover:text-brandgold hover:bg-transparent"
										aria-label="User account menu"
									>
										<User className="h-5 w-5" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-44">
									<DropdownMenuItem asChild>
										<Link
											to="/profile"
											className="flex items-center text-brandblue hover:text-brandgold"
										>
											<User className="mr-2 h-4 w-4" />
											<span>Profile</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={logout}
										className="flex items-center text-red-600 hover:rounded-sm cursor-pointer hover:bg-red-100"
										aria-label="Logout from account"
									>
										<LogOut className="mr-2 h-4 w-4" />
										<span>Logout</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Link
								to="/login"
								className="relative hover:text-brandgold"
								aria-label="Login"
							>
								<User className="h-5 w-5" />
							</Link>
						)}

						{/* Mobile menu button */}
						<Button
							className="min-w-fit lg:hidden p-0 bg-transparent text-brandblue h-auto rounded-none hover:text-brandgold hover:bg-transparent"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							aria-label={isMenuOpen ? "Close menu" : "Open menu"}
							aria-expanded={isMenuOpen}
							aria-controls="mobile-navigation"
						>
							{isMenuOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</Button>
					</div>
				</div>
			</div>

			{/* Desktop Navigation Bar */}
			<nav className="max-lg:hidden border-t border-gray-100" aria-label="Main navigation">
				<div className="mx-auto max-w-[1232px] w-full px-4">
					<div className="flex items-center justify-center gap-x-1">
						<NavigationMenu className="static">
							<NavigationMenuList className="space-x-0">
								{megaCategories.map((cat) => (
									<NavigationMenuItem key={cat.slug}>
										<NavigationMenuTrigger
											className="bg-transparent font-normal px-3 text-brandblue hover:text-brandgold focus:text-brandgold"
											aria-label={cat.label}
										>
											{cat.label}
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<MegaMenuPanel cat={cat} />
										</NavigationMenuContent>
									</NavigationMenuItem>
								))}
							</NavigationMenuList>
						</NavigationMenu>

						{simpleNavLinks.map((link) => (
							<Link
								key={link.label}
								to={link.href}
								className="inline-flex items-center px-3 py-4 text-xs tracking-wider font-normal uppercase text-brandblue hover:text-brandgold transition-colors"
								aria-label={link.label}
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			</nav>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<nav
					id="mobile-navigation"
					className="lg:hidden animate-slideDown border-t border-solid border-neutral-200 bg-slate-100"
					role="navigation"
					aria-label="Mobile navigation"
				>
					{/* Mobile search */}
					<form
						onSubmit={(e) => {
							handleSearch(e);
							setIsMenuOpen(false);
						}}
						className="px-4 pt-4 pb-2"
						role="search"
					>
						<div className="relative">
							<Input
								type="search"
								placeholder="Search for Jewellery..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-10 pr-4 h-10 border-gray-200 rounded-full bg-white text-sm"
							/>
							<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
						</div>
					</form>

					<Accordion type="single" collapsible className="w-full">
						{megaCategories.map((cat, i) => (
							<MobileMegaItem
								key={cat.slug}
								cat={cat}
								value={`item-${i}`}
								onClose={() => setIsMenuOpen(false)}
							/>
						))}

						{simpleNavLinks.map((link, i) => (
							<AccordionItem
								key={link.label}
								value={`simple-${i}`}
								className="px-4 py-3"
							>
								<Link
									to={link.href}
									className="inline-flex text-brandblue text-xs uppercase font-medium tracking-wider hover:text-brandgold w-full"
									onClick={() => setIsMenuOpen(false)}
								>
									{link.label}
								</Link>
							</AccordionItem>
						))}
					</Accordion>
				</nav>
			)}
		</header>
	);
};

export default Header;
