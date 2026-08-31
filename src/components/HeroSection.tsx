import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from "./ui/carousel";

/**
 * Home hero banners.
 * Artwork carries its own headline + CTA, so nothing is overlaid in code.
 * Each slide has a separate desktop (2.4:1) and mobile (4:5) image.
 */
const banners = [
	{
		desktop: "/assets/images/banners/navratri-desktop.jpg",
		mobile: "/assets/images/banners/navratri-mobile.jpg",
		alt: "Shringar for every celebration — shop the 925 silver festive collection",
		href: "/products",
	},
];

const AUTOPLAY_MS = 5000;
const isCarousel = banners.length > 1;

const HeroSection = () => {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (!api) return;
		setCurrent(api.selectedScrollSnap());
		const onSelect = () => setCurrent(api.selectedScrollSnap());
		api.on("select", onSelect);
		return () => {
			api.off("select", onSelect);
		};
	}, [api]);

	useEffect(() => {
		if (!api || !isCarousel) return;
		const timer = setInterval(() => api.scrollNext(), AUTOPLAY_MS);
		return () => clearInterval(timer);
	}, [api]);

	return (
		<Carousel className="w-full relative" opts={{ loop: isCarousel }} setApi={setApi}>
			<CarouselContent className="ml-0">
				{banners.map((banner, index) => (
					<CarouselItem key={banner.desktop} className="pl-0 basis-full">
						<Link to={banner.href} aria-label={banner.alt} className="block">
							<picture>
								<source media="(min-width: 768px)" srcSet={banner.desktop} />
								<img
									src={banner.mobile}
									alt={banner.alt}
									loading={index === 0 ? "eager" : "lazy"}
									decoding="async"
									className="block w-full h-auto aspect-[2250/2812] md:aspect-[5000/2083] object-cover"
								/>
							</picture>
						</Link>
					</CarouselItem>
				))}
			</CarouselContent>

			{isCarousel && (
				<>
					<div className="absolute inset-x-0 bottom-4 md:bottom-5 flex items-center justify-center gap-2">
						{banners.map((banner, index) => (
							<button
								key={banner.desktop}
								type="button"
								onClick={() => api?.scrollTo(index)}
								aria-label={`Go to banner ${index + 1}`}
								aria-current={current === index}
								className={`h-2 rounded-full transition-all ${
									current === index ? "w-6 bg-brandblue" : "w-2 bg-brandblue/40 hover:bg-brandblue/60"
								}`}
							/>
						))}
					</div>

					<CarouselPrevious className="hidden md:inline-flex absolute left-5 top-1/2 -translate-y-1/2 shadow-md hover:bg-white" />
					<CarouselNext className="hidden md:inline-flex absolute right-5 top-1/2 -translate-y-1/2 shadow-md hover:bg-white" />
				</>
			)}
		</Carousel>
	);
};

export default HeroSection;
