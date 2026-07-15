
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { apiService } from "@/lib/apiService";
import { resolveImageUrl } from "@/lib/config";

const categoryFallbackImages: Record<string, string> = {
	rings: "/placeholder.svg",
	necklaces: "/placeholder.svg",
	earrings: "/placeholder.svg",
	bracelets: "/placeholder.svg",
	pendants: "/placeholder.svg",
	bangles: "/placeholder.svg",
	default: "/placeholder.svg",
};

function getCategoryImage(category: any): string {
	if (category.imageUrl || category.image_url) {
		const resolved = resolveImageUrl(category.imageUrl || category.image_url);
		if (resolved) return resolved;
	}
	const name = (category.name || '').toLowerCase();
	return categoryFallbackImages[name] || categoryFallbackImages.default;
}

const AUTO_ADVANCE_MS = 3500;   // advance one tile every 3.5s
const RESUME_AFTER_MS = 4000;   // resume auto-scroll 4s after the user stops interacting

const StaticHoverSlider = () => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [categories, setCategories] = useState<any[]>([]);
	const pausedRef = useRef(false);          // true while the user is interacting
	const resumeTimer = useRef<number>();

	useEffect(() => {
		apiService.getCategories().then((data) => {
			const cats = data.categories || data || [];
			const homepage = (Array.isArray(cats) ? cats : []).filter((c: any) => c.showOnHomepage !== false && c.show_on_homepage !== false);
			setCategories(homepage);
		}).catch(() => {});
	}, []);

	// Pause auto-scroll while the user interacts, then resume after a quiet period
	function pauseForUser() {
		pausedRef.current = true;
		if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
		resumeTimer.current = window.setTimeout(() => {
			pausedRef.current = false;
		}, RESUME_AFTER_MS);
	}

	function slideBy(dir: number) {
		const slider = sliderRef.current;
		if (!slider || !slider.children[0]) return;
		const slideWidth = (slider.children[0] as HTMLElement).getBoundingClientRect().width;
		const maxScroll = slider.scrollWidth - slider.clientWidth;
		// Loop back to the start once we reach the end (…-4-5-1-2-…)
		if (dir > 0 && slider.scrollLeft >= maxScroll - 5) {
			slider.scrollTo({ left: 0, behavior: "smooth" });
		} else if (dir < 0 && slider.scrollLeft <= 5) {
			slider.scrollTo({ left: maxScroll, behavior: "smooth" });
		} else {
			slider.scrollBy({ left: dir * slideWidth, behavior: "smooth" });
		}
	}

	function scrollSlider(dir: string) {
		pauseForUser();               // arrow click counts as user interaction
		slideBy(dir === "left" ? -1 : 1);
	}

	// Auto-scroll loop + user-interaction listeners
	useEffect(() => {
		if (categories.length === 0) return;
		const slider = sliderRef.current;
		if (!slider) return;

		const interval = window.setInterval(() => {
			if (!pausedRef.current) slideBy(1);
		}, AUTO_ADVANCE_MS);

		const onInteract = () => pauseForUser();
		slider.addEventListener("pointerdown", onInteract);
		slider.addEventListener("touchstart", onInteract, { passive: true });
		slider.addEventListener("wheel", onInteract, { passive: true });

		return () => {
			window.clearInterval(interval);
			if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
			slider.removeEventListener("pointerdown", onInteract);
			slider.removeEventListener("touchstart", onInteract);
			slider.removeEventListener("wheel", onInteract);
		};
	}, [categories.length]);

	return (
		<section className="max-lg:pt-20 lg:pt-40 pb-12 inline-block w-full">
			<div className="container max-md:px-5">
				<div className="flex max-lg:flex-col">
					<div className="inline-flex w-full lg:w-1/4 flex-col lg:pr-20 max-lg:text-center max-lg:mb-12">
						<h2 className="uppercase font-normal text-[34px] leading-[48px]">Our Collections</h2>
						<Button
							asChild
							variant="outline"
							className="border-brandblue text-brandblue hover:bg-brandblue hover:text-white lg:mt-12 max-lg:mt-6"
						>
							<Link to="/shop">Shop Now</Link>
						</Button>
					</div>

					<div className="relative w-full lg:w-4/5 inline-block">
						{/* Slider */}
						<div
							ref={sliderRef}
							className="flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
						>
							{categories.map((category, index) => (
								<Link
									key={category.id || index}
									to={`/products/${(category.name || '').toLowerCase()}`}
									className="group relative snap-start min-w-[85%] sm:min-w-[50%] px-2 lg:min-w-[25%] h-[350px]"
								>
									<div className="relative h-full rounded-2xl overflow-hidden">
										<img
											src={getCategoryImage(category)}
											alt={category.name}
											className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
										/>
										{/* Always-on gradient */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
										{/* Always-visible name + accent */}
										<div className="absolute inset-x-0 bottom-0 p-5 text-white">
											<div className="flex items-center justify-between mb-3">
												<span className="text-xs tracking-[0.25em] uppercase text-white/70">{String(index + 1).padStart(2, '0')}</span>
												<span className="h-px w-12 bg-brandgold transition-all duration-500 group-hover:w-24" />
											</div>
											<h3 className="text-xl md:text-2xl font-serif leading-tight">{category.name}</h3>
											{category.description && (
												<p className="mt-1 text-xs text-white/80 line-clamp-1">{category.description}</p>
											)}
										</div>
									</div>
								</Link>
							))}
						</div>

						{/* Navigation */}
						{categories.length > 4 && (
							<div className="absolute top-0 bottom-0 m-auto left-0 right-0">
								<button onClick={() => scrollSlider("left")} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hover:text-white">
									<svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 1024 1024" version="1.1" fill="currentcolor"><path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"/></svg>
								</button>
								<button onClick={() => scrollSlider("right")} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hover:text-white">
									<svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 1024 1024" version="1.1" fill="currentcolor"><path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"/></svg>
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
export default StaticHoverSlider;


const ShopByCollection = () => {
	const [categories, setCategories] = useState<any[]>([]);

	useEffect(() => {
		apiService.getCategories().then((data) => {
			const cats = data.categories || data || [];
			const homepage = (Array.isArray(cats) ? cats : []).filter((c: any) => c.showOnHomepage !== false && c.show_on_homepage !== false);
			setCategories(homepage.slice(0, 4));
		}).catch(() => {});
	}, []);

	return (
		<>
			<section className="py-24 bg-primary">
				<div className="container mx-auto px-4">
					<div className="text-center mb-20">
						<h2 className="text-4xl font-bold text-white mb-6">Shop by Collection</h2>
						<p className="text-lg text-primary-light max-w-2xl mx-auto">
							Explore our signature collections, each telling a unique story of craftsmanship and beauty.
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-10">
						{categories.map((category, idx) => (
							<Link key={category.id} to={`/products/${(category.name || '').toLowerCase()}`}>
								<div className="group cursor-pointer">
									<div className="relative overflow-hidden rounded-xl">
										<div className="aspect-[4/3] overflow-hidden">
											<img
												src={getCategoryImage(category)}
												alt={category.name}
												className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
										</div>
										<div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs tracking-[0.2em] font-medium">
											{String(idx + 1).padStart(2, '0')}
										</div>
										<div className="absolute bottom-0 left-0 right-0 p-8 text-white">
											<div className="mb-6">
												<h3 className="text-3xl font-serif mb-2">{category.name}</h3>
												{category.description && (
													<p className="text-base text-white/85">{category.description}</p>
												)}
											</div>
											<div className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-white">
												<span>Explore Collection</span>
												<span className="h-px w-10 bg-brandgold transition-all duration-500 group-hover:w-20" />
											</div>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export { ShopByCollection };
