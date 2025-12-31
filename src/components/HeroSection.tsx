
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

const HeroSection = () => {
	return (
		<>
		{/* <section className="relative">
			<div className="absolute inset-0 top-0">
				<img
					src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80"
					alt="Luxury Jewelry Collection"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/50"></div>
			</div>

			<div className="relative z-10 flex items-center h-full">
				<div className="container mx-auto px-4 py-20">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-8 text-white">
							<div className="space-y-6">
								<Badge variant="secondary" className="bg-white/20 text-white border-white/30">
									Limited Time Offer
								</Badge>
								<h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
									Diamonds
									<br />
									<span className="text-gray-200">that tell a story</span>
								</h1>
								<p className="text-xl text-gray-200 max-w-lg">
									Discover our exquisite collection of handcrafted jewelry, where each piece tells a unique story of elegance and timeless beauty.
								</p>
							</div>

							<div className="flex flex-wrap gap-4">
								<div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-elegant border">
									<div className="text-3xl font-bold text-black">20%</div>
									<div className="text-sm text-gray-600">OFF RINGS</div>
									<div className="text-xs text-gray-500">Code: RING20</div>
								</div>
								<div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-elegant border">
									<div className="text-3xl font-bold text-black">20%</div>
									<div className="text-sm text-gray-600">OFF NECKLACES</div>
									<div className="text-xs text-gray-500">Code: NECK20</div>
								</div>
							</div>

							<div className="flex flex-wrap gap-4">
								<Button size="lg" className="bg-black hover:bg-gray-800 text-white shadow-elegant">
									Shop Collection
								</Button>
								<Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
									View Catalog
								</Button>
							</div>
						</div>

						<div className="hidden lg:block"></div>
					</div>
				</div>
			</div>
		</section> */}

		<Carousel className="w-full inline-block">
			<CarouselContent>
				<CarouselItem className="py-24 relative flex items-center w-full">
					<div className="absolute inset-0 top-0 left-0 z-[5]">
						<img
							src="assets/images/spotlight4.jpg"
							alt="Luxury Jewelry Collection"
							className="w-full h-full object-cover"
						/>
						{/* <div className="absolute inset-0 bg-black/50" /> */}
					</div>
					<div className="w-full z-10 flex items-center h-full relative">
						<div className="container max-md:px-5">
							<div className="grid lg:grid-cols-2 items-center">
								<div className="space-y-12">
									<div className="space-y-5">
										<Badge variant="secondary" className="font-normal bg-white/20 text-white border-white/30 hover:bg-white/20">Limited Time Offer</Badge>
										<h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">Diamonds<br/>that tell a story</h1>
										<p className="font-light text-xl font-sans text-white max-w-lg">Discover our exquisite collection of handcrafted jewelry, where each piece tells a unique story of elegance and timeless beauty.</p>
									</div>
									<div className="flex flex-wrap gap-4">
										<div className="bg-white/90 rounded-lg p-4">
											<div className="text-3xl font-bold text-black">20%</div>
											<div className="text-sm text-gray-600">OFF RINGS</div>
											<div className="text-xs text-gray-500">Code: RING20</div>
										</div>
										<div className="bg-white/90 rounded-lg p-4">
											<div className="text-3xl font-bold text-black">20%</div>
											<div className="text-sm text-gray-600">OFF NECKLACES</div>
											<div className="text-xs text-gray-500">Code: NECK20</div>
										</div>
									</div>
									<div className="flex flex-wrap gap-4">
										<Button variant="default" size="default" className="bg-brandgold uppercase hover:bg-brandblue">Shop Now</Button>
										<Button variant="outline" size="default" className="hover:text-white hover:border-white uppercase">Our Collections</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</CarouselItem>
				<CarouselItem className="py-24 relative flex items-center w-full">
					<div className="absolute inset-0 top-0 left-0 z-[5]">
						<img
							src="assets/images/spotlight5.jpg"
							alt="Luxury Jewelry Collection"
							className="w-full h-full object-cover"
						/>
						{/* <div className="absolute inset-0 bg-black/50" /> */}
					</div>
					<div className="w-full z-10 flex items-center h-full relative">
						<div className="container max-md:px-5">
							<div className="grid lg:grid-cols-2 items-center">
								<div className="space-y-12">
									<div className="space-y-5">
										<Badge variant="secondary" className="font-normal bg-white/20 text-white border-white/30 hover:bg-white/20">Limited Time Offer</Badge>
										<h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">Diamonds<br/>that tell a story</h1>
										<p className="font-light text-xl font-sans text-gray-200 max-w-lg">Discover our exquisite collection of handcrafted jewelry, where each piece tells a unique story of elegance and timeless beauty.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</CarouselItem>
				<CarouselItem className="py-24 relative flex items-center w-full">
					<div className="absolute inset-0 top-0 left-0 z-[5]">
						<img
							src="assets/images/spotlight3.jpg"
							alt="Luxury Jewelry Collection"
							className="w-full h-full object-cover"
						/>
						{/* <div className="absolute inset-0 bg-black/50" /> */}
					</div>
					<div className="w-full z-10 flex items-center h-full relative">
						<div className="container max-md:px-5">
							<div className="grid lg:grid-cols-2 items-center">
								<div className="space-y-12">
									<div className="space-y-5">
										<Badge variant="secondary" className="font-normal bg-brandgold/20 text-brandblue border-brandblue/30">Limited Time Offer</Badge>
										<h1 className="text-5xl lg:text-6xl font-bold leading-tight text-brandblue">Diamonds<br/>that tell a story</h1>
										<p className="font-light text-xl font-sans text-brandblue max-w-lg">Discover our exquisite collection of handcrafted jewelry, where each piece tells a unique story of elegance and timeless beauty.</p>
									</div>
									<div className="flex flex-wrap gap-4">
										<div className="bg-white/90 rounded-lg p-4">
											<div className="text-3xl font-bold text-black">20%</div>
											<div className="text-sm text-gray-600">OFF RINGS</div>
											<div className="text-xs text-gray-500">Code: RING20</div>
										</div>
										<div className="bg-white/90 rounded-lg p-4">
											<div className="text-3xl font-bold text-black">20%</div>
											<div className="text-sm text-gray-600">OFF NECKLACES</div>
											<div className="text-xs text-gray-500">Code: NECK20</div>
										</div>
									</div>
									<div className="flex flex-wrap gap-4">
										<Button size="lg" className="bg-brandgold hover:bg-brandblue text-white uppercase">Shop Now</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</CarouselItem>
			</CarouselContent>
			<div className="absolute bottom-5 right-5 gap-2 w-full flex justify-end items-center">
				<CarouselPrevious />
				<CarouselNext />
			</div>
		</Carousel>
		</>
	);
};

export default HeroSection;
