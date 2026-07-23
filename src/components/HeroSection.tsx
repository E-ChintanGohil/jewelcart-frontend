
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Link } from "react-router-dom";

const HeroSection = () => {
	return (
		<>
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
										<h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">Affordable Luxury,<br/>Delivered with Trust</h1>
										<p className="font-light text-xl font-sans text-white max-w-lg">Gold. Silver. Diamonds. Crafted for every celebration. Shop authentic jewellery with trusted quality, transparent pricing, and fast delivery across India.</p>
									</div>
									<div className="flex flex-wrap gap-4">
										<Link to="/shop"><Button variant="default" size="default" className="bg-brandgold uppercase hover:bg-brandblue">Shop Now</Button></Link>
										<Link to="/shop"><Button variant="outline" size="default" className="hover:text-white hover:border-white uppercase">Our Collections</Button></Link>
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
										<h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">Affordable Luxury,<br/>Delivered with Trust</h1>
										<p className="font-light text-xl font-sans text-gray-200 max-w-lg">Gold. Silver. Diamonds. Crafted for every celebration. Wear your story and shine every day.</p>
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
										<h1 className="text-5xl lg:text-6xl font-bold leading-tight text-brandblue">Affordable Luxury,<br/>Delivered with Trust</h1>
										<p className="font-light text-xl font-sans text-brandblue max-w-lg">Gold. Silver. Diamonds. Crafted for every celebration. Shop authentic jewellery with trusted quality and honest pricing.</p>
									</div>
									<div className="flex flex-wrap gap-4">
										<Link to="/shop"><Button size="lg" className="bg-brandgold hover:bg-brandblue text-white uppercase">Shop Now</Button></Link>
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
