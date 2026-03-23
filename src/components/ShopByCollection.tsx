
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { apiService } from "@/lib/apiService";
import { resolveImageUrl } from "@/lib/config";

const categoryFallbackImages: Record<string, string> = {
	rings: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
	necklaces: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
	earrings: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
	bracelets: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
	pendants: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80",
	bangles: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
	default: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
};

function getCategoryImage(category: any): string {
	if (category.imageUrl || category.image_url) {
		const resolved = resolveImageUrl(category.imageUrl || category.image_url);
		if (resolved) return resolved;
	}
	const name = (category.name || '').toLowerCase();
	return categoryFallbackImages[name] || categoryFallbackImages.default;
}

const StaticHoverSlider = () => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [categories, setCategories] = useState<any[]>([]);

	useEffect(() => {
		apiService.getCategories().then((data) => {
			const cats = data.categories || data || [];
			setCategories(Array.isArray(cats) ? cats : []);
		}).catch(() => {});
	}, []);

	function scrollSlider(dir: string) {
		let slider = sliderRef.current;
		if (!slider || !slider.children[0]) return;
		let slide = slider.children[0] as HTMLElement;

		let slideWidth = slide.getBoundingClientRect().width;

		slider.scrollBy({
			left: dir === "left" ? -slideWidth : slideWidth,
			behavior: "smooth",
		});
	}

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
						<div ref={sliderRef} className="flex w-full overflow-hidden scroll-smooth">
							{categories.map((category, index) => (
								<Link
									key={category.id || index}
									to={`/products/${(category.name || '').toLowerCase()}`}
									className="group relative sm:min-w-[50%] px-2 lg:min-w-[25%] h-[350px] rounded-2xl overflow-hidden"
								>
									<div className="relative h-full rounded-2xl overflow-hidden">
										<img
											src={getCategoryImage(category)}
											alt={category.name}
											className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
										/>
										<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
										<div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-all duration-500 text-white">
											<h3 className="text-2xl font-bold">{category.name}</h3>
											{category.description && (
												<p className="mt-2 text-sm">{category.description}</p>
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
			setCategories(Array.isArray(cats) ? cats.slice(0, 4) : []);
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
						{categories.map((category) => (
							<Link key={category.id} to={`/products/${(category.name || '').toLowerCase()}`}>
								<div className="group cursor-pointer">
									<div className="relative overflow-hidden rounded-xl bg-white shadow-soft border border-gray-200 hover:shadow-elegant transition-all duration-300">
										<div className="aspect-[4/3] overflow-hidden">
											<img
												src={getCategoryImage(category)}
												alt={category.name}
												className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
											/>
											<div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
										</div>
										<div className="absolute bottom-0 left-0 right-0 p-8 text-white">
											<div className="mb-6">
												<h3 className="text-2xl font-bold mb-2">{category.name}</h3>
												{category.description && (
													<p className="text-lg opacity-90">{category.description}</p>
												)}
											</div>
											<Button
												size="sm"
												className="bg-white hover:bg-gray-100 text-black border-0"
											>
												Explore Collection
											</Button>
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
