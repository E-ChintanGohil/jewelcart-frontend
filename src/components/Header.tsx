import { useState, useEffect } from "react";
import { Menu, X, Search, User, LogOut, ShoppingCart, Heart, Mail, ContactIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogOverlay } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

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
			setIsScrolled(window.scrollY > 100);
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

	// const toggleSearch = () => {
	// 	setIsSearchOpen(!isSearchOpen);
	// 	if (!isSearchOpen) {
	// 		setSearchQuery("");
	// 	}
	// };

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
		<header className={`w-full flex flex-col bg-white ${isScrolled ? 'sticky top-0 z-[48] shadow-light animate-slideDown' : ''}`}>
			<div className="mx-auto max-w-[1232px] w-full py-2 lg:pt-4 px-4">
				<div className="flex items-center flex-row justify-between w-full">
					{/* Contact Us */}
					<div className="hidden lg:flex items-center flex-row gap-4">
						<Link
							to="/contact"
							className={`flex flex-row gap-1 hover:text-brandgold`}
							aria-label="Contact Us"
						>
							<ContactIcon className="h-5 w-5" />
							<span className="text-sm font-normal">Contact Us</span>
						</Link>
						<Link
							to="/"
							className={`flex flex-row gap-1 hover:text-brandgold`}
							aria-label="Email"
						>
							<Mail className="h-5 w-5" />
							<span className="text-sm font-normal">Email</span>
						</Link>
					</div>
					{/* Logo */}
					<Link to="/" className="flex md:h-[54px] max-md:h-16">
						<img src="/logo.png" alt="Jewelcart Logo" />
					</Link>
					<div className="items-center flex flex-row md:gap-4 max-md:gap-3">
						{/* Search */}
						<Dialog>
							<DialogTrigger asChild>
								<Search className="cursor-pointer h-5 w-5 text-brandblue hover:text-brandgold" />
							</DialogTrigger>
							<DialogOverlay className="bg-transparent" />
							<DialogContent className="max-w-full h-full border-0 shadow-none sm:rounded-none overflow-x-auto py-10">
								<div className="inline-block max-w-[90%] mx-auto w-full">
									<form onSubmit={handleSearch} className="flex relative" role="search" aria-label="Search products">
										<Input
											type="search"
											placeholder="Search JewelCart Products..."
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
											className="md:text-2xl/loose h-16 border-0 rounded-none font-light text-brandblue p-0 pr-20 border-b-4 border-solid border-brandblue focus-visible:border-brandgold"
											autoFocus
											aria-label="Search input"
										/>
										<Button
											type="submit"
											className={`p-0 absolute right-0 w-16 h-16 bg-transparent rounded-br-none text-brandblue hover:bg-brandgold hover:text-white`}
											aria-label="Submit search"
										>
											<Search className="h-8 w-8" />
										</Button>
									</form>
									<div className="mt-12 w-full inline-block">
										<DialogTitle>Popular</DialogTitle>
										<div className="inline-flex w-full gap-3 mt-3">
											<Link to="/" className="flex rounded-md bg-neutral-200 py-2 px-3 text-base font-normal text-brandblue capitalize hover:bg-brandgold hover:text-white">ring</Link>
											<Link to="/" className="flex rounded-md bg-neutral-200 py-2 px-3 text-base font-normal text-brandblue capitalize hover:bg-brandgold hover:text-white">bracelets</Link>
											<Link to="/" className="flex rounded-md bg-neutral-200 py-2 px-3 text-base font-normal text-brandblue capitalize hover:bg-brandgold hover:text-white">heart necklaces</Link>
											<Link to="/" className="flex rounded-md bg-neutral-200 py-2 px-3 text-base font-normal text-brandblue capitalize hover:bg-brandgold hover:text-white">gift</Link>
											<Link to="/" className="flex rounded-md bg-neutral-200 py-2 px-3 text-base font-normal text-brandblue capitalize hover:bg-brandgold hover:text-white">mangalsutra</Link>
											<Link to="/" className="flex rounded-md bg-neutral-200 py-2 px-3 text-base font-normal text-brandblue capitalize hover:bg-brandgold hover:text-white">more...</Link>
										</div>
									</div>
									<div className="mt-12 w-full inline-block">
										<DialogTitle>Spotlight</DialogTitle>
										<div className="grid grid-cols-4 w-full gap-3 mt-3">
											<Link to="/" className="flex flex-col items-center">
												<img src="/assets/images/spotlight1.jpg" alt="Find a store" />
												<span className="mt-3 inline-block">Find a store</span>
											</Link>
											<Link to="/" className="flex flex-col items-center">
												<img src="/assets/images/spotlight2.jpg" alt="The Holiday Gifts" />
												<span className="mt-3 inline-block">The Holiday Gifts</span>
											</Link>
											<Link to="/" className="flex flex-col items-center">
												<img src="/assets/images/spotlight3.jpg" alt="Diamond Bangles" />
												<span className="mt-3 inline-block">Diamond Bangles</span>
											</Link>
											<Link to="/" className="flex flex-col items-center">
												<img src="/assets/images/spotlight5.jpg" alt="Most Expensive Necklace" />
												<span className="mt-3 inline-block">Most Expensive Necklace</span>
											</Link>
										</div>
									</div>
								</div>
							</DialogContent>
						</Dialog>
						<Link
							to="/"
							className="hover:text-brandgold"
							aria-label="Wishlist"
						>
							<Heart className="h-5 w-5" />
						</Link>
						<Link
							to="/cart"
							className={`relative hover:text-brandgold`}
							aria-label={`Shopping cart with ${getTotalItems()} items`}
						>
							<ShoppingCart className="h-5 w-5" />
							{getTotalItems() > 0 && (
								<small
									className="absolute -right-[5px] -top-[5px] bg-brandgold w-4 h-4 text-white z-[3] flex items-center justify-center text-xs font-medium rounded-xl"
									aria-label={`${getTotalItems()} items in cart`}
								>
									{getTotalItems()}
								</small>
							)}
						</Link>
						{isAuthenticated ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										className="p-0 bg-transparent text-brandblue h-auto rounded-none relative hover:text-brandgold hover:bg-transparent"
										aria-label="User account menu"
									>
										<User className="h-5 w-5" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-44">
									<DropdownMenuItem asChild>
										<Link to="/profile" className="flex items-center text-brandblue hover:text-brandgold">
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
								className={`relative hover:text-brandgold`}
								aria-label="Login"
							>
								<User className="h-5 w-5" />
							</Link>
						)}

						{/* Mobile Menu Button */}
						<Button
							className="lg:hidden p-0 bg-transparent text-brandblue h-auto rounded-none hover:text-brandgold hover:bg-transparent"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							aria-label={isMenuOpen ? "Close menu" : "Open menu"}
							aria-expanded={isMenuOpen}
							aria-controls="mobile-navigation"
						>
							{isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</Button>
					</div>
				</div>
			</div>
			{/* Web Navigation */}
			<div className="max-lg:hidden">
				<div className="mx-auto max-w-[1232px] w-full px-4">
					<div className="flex flex-row items-center justify-between gap-x-2 relative">
						<NavigationMenu className="static">
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuTrigger
										className={`bg-transparent font-normal px-0 text-brandblue hover:text-brandgold focus:text-brandgold`}
										aria-label="Shop menu with collections and categories"
									>
										By JewelCart
									</NavigationMenuTrigger>
									<NavigationMenuContent className="ruhsil">
										<div className="lg:w-[960px] p-4 bg-white border border-border shadow-xl rounded-lg">
											<div className="grid grid-cols-3 gap-6">
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
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuTrigger
										className={`bg-transparent font-normal px-0 text-brandblue hover:text-brandgold focus:text-brandgold`}
										aria-label="Rings"
									>
										Rings
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="lg:w-[280px] p-4 bg-white border border-border shadow-xl rounded-lg">
											<div className="grid grid-cols-2 gap-6">
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
											</div>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuTrigger
										className={`bg-transparent font-normal px-0 text-brandblue hover:text-brandgold focus:text-brandgold`}
										aria-label="Earrings"
									>
										Earrings
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="lg:w-[320px] p-4 bg-white border border-border shadow-xl rounded-lg">
											<div className="grid grid-cols-2 gap-6">
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
											</div>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuTrigger
										className={`bg-transparent font-normal px-0 text-brandblue hover:text-brandgold focus:text-brandgold`}
										aria-label="Pendants"
									>
										Pendants
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="lg:w-[320px] p-4 bg-white border border-border shadow-xl rounded-lg">
											<div className="grid grid-cols-2 gap-6">
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
											</div>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuTrigger
										className={`bg-transparent font-normal px-0 text-brandblue hover:text-brandgold focus:text-brandgold`}
										aria-label="Bracelets"
									>
										Bracelets
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="lg:w-[320px] p-4 bg-white border border-border shadow-xl rounded-lg">
											<div className="grid grid-cols-2 gap-6">
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
											</div>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
						<Link
							to="/solitaire"
							className={`inline-flex text-brandblue text-xs tracking-wider font-normal uppercase hover:text-brandgold focus:text-brandgold`}
							aria-label="Solitaire"
						>
							Solitaire
						</Link>
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuTrigger
										className={`bg-transparent font-normal px-0 text-brandblue hover:text-brandgold focus:text-brandgold`}
										aria-label="Gifts"
									>
										Gifts
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="lg:w-[180px] p-4 bg-white border border-border shadow-xl rounded-lg">
											<div className="grid grid-cols-2 gap-6">
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
											</div>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
						<Link
							to="/offers"
							className={`inline-flex text-brandblue text-xs tracking-wider uppercase font-normal hover:text-brandgold focus:text-brandgold`}
							aria-label="Offers"
						>
							Offers
						</Link>
					</div>
				</div>
			</div>
			{/* Mobile Navigation */}
			{isMenuOpen && (
				<nav
					id="mobile-navigation"
					className="lg:hidden animate-slideDown border-t border-solid border-neutral-200 bg-slate-100"
					role="navigation"
					aria-label="Mobile navigation"
				>
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-1" className="px-4 py-3">
							<AccordionTrigger className="p-0 text-xs uppercase tracking-wider hover:no-underline">By JewelCart</AccordionTrigger>
							<AccordionContent className="pt-4 pb-0">
								<div className="grid md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 gap-6">
									<div>
										<h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Categories</h3>
										{categories.map((category) => (
											<Link
												key={category.name}
												to={category.href}
												className={`text-brandblue flex text-sm px-4 py-2 w-full hover:text-brandgold focus:outline-none`}
												onClick={() => setIsMenuOpen(false)}
												aria-label={`Browse ${category.name}`}
											>
												{category.name}
											</Link>
										))}
									</div>
									<div>
										<h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Collections</h3>
										{collections.map((collection) => (
											<Link
												key={collection.name}
												to={collection.href}
												className={`text-brandblue flex text-sm px-4 py-2 w-full hover:text-brandgold focus:outline-none`}
												onClick={() => setIsMenuOpen(false)}
												aria-label={`View ${collection.name}`}
											>
												{collection.name}
											</Link>
										))}
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2" className="px-4 py-3">
							<AccordionTrigger className="p-0 text-xs uppercase tracking-wider hover:no-underline">Rings</AccordionTrigger>
							<AccordionContent className="pt-4 pb-0">
								<div className="grid sm:grid-cols-2 max-sm:grid-cols-1 gap-6">
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
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3" className="px-4 py-3">
							<AccordionTrigger className="p-0 text-xs uppercase tracking-wider hover:no-underline">Earrings</AccordionTrigger>
							<AccordionContent className="pt-4 pb-0">
								<div className="grid sm:grid-cols-2 max-sm:grid-cols-1 gap-6">
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
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-4" className="px-4 py-3">
							<AccordionTrigger className="p-0 text-xs uppercase tracking-wider hover:no-underline">Pendants</AccordionTrigger>
							<AccordionContent className="pt-4 pb-0">
								<div className="grid sm:grid-cols-2 max-sm:grid-cols-1 gap-6">
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
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-5" className="px-4 py-3">
							<AccordionTrigger className="p-0 text-xs uppercase tracking-wider hover:no-underline">Bracelets</AccordionTrigger>
							<AccordionContent className="pt-4 pb-0">
								<div className="grid sm:grid-cols-2 max-sm:grid-cols-1 gap-6">
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
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-6" className="px-4 py-3">
							<Link
								to="/solitaire"
								className={`inline-flex text-brandblue uppercase text-xs font-medium tracking-wider hover:text-brandgold focus:text-brandgold w-full`}
								aria-label="Solitaire"
							>
								Solitaire
							</Link>
						</AccordionItem>
						<AccordionItem value="item-7" className="px-4 py-3">
							<AccordionTrigger className="p-0 text-xs uppercase tracking-wider hover:no-underline">Gifts</AccordionTrigger>
							<AccordionContent className="pt-4 pb-0">
								<div className="grid sm:grid-cols-2 max-sm:grid-cols-1 gap-6">
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
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-8" className="px-4 py-3">
							<Link
								to="/offers"
								className={`inline-flex text-brandblue text-xs uppercase font-medium tracking-wider hover:text-brandgold focus:text-brandgold w-full`}
								aria-label="Solitaire"
							>
								Offers
							</Link>
						</AccordionItem>
					</Accordion>
				</nav>
			)}
		</header>
	);
};

export default Header;