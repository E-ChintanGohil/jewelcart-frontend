
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef } from "react";

const StaticHoverSlider = () => {
	const sliderRef = useRef(null);

	function scrollSlider(dir) {
		let slider = sliderRef.current;
		let slide = slider.children[0];

		let slideWidth = slide.getBoundingClientRect().width;

		slider.scrollBy({
			left: dir === "left" ? -slideWidth : slideWidth,
			behavior: "smooth",
		});
	}

	return (
		<section className="pt-40 pb-12 inline-block w-full">
			<div className="container max-md:px-5">
				<div className="flex">
					<div className="inline-flex w-1/5 flex-col pr-12">
						<h2 className="uppercase font-normal text-4xl leading-[48px]">Our Collections</h2>
						<Button
							asChild
							variant="outline"
							className="border-brandblue text-brandblue hover:bg-brandblue hover:text-white mt-12"
						>
							<Link to="">Shop Now</Link>
						</Button>
					</div>
					
					<div className="relative w-4/5 inline-block">
						{/* Slider */}
						<div ref={sliderRef} className="flex w-full overflow-hidden scroll-smooth">
							<div className="group relative sm:min-w-[50%] px-2 lg:min-w-[25%] h-[350px] rounded-2xl overflow-hidden">
								<div className="relative h-full rounded-2xl overflow-hidden">
									<img
										src="https://picsum.photos/600/400?1"
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
									<div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-all duration-500 text-white">
										<h3 className="text-2xl font-bold">Web Design</h3>
										<p className="mt-2 text-sm">Modern UI/UX solutions</p>
									</div>
								</div>
							</div>
							<div className="group relative sm:min-w-[50%] px-2 lg:min-w-[25%] h-[350px] rounded-2xl overflow-hidden">
								<div className="relative h-full rounded-2xl overflow-hidden">
									<img
										src="https://picsum.photos/600/400?2"
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
									<div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-all duration-500 text-white">
										<h3 className="text-2xl font-bold">Development</h3>
										<p className="mt-2 text-sm">React & Tailwind</p>
									</div>
								</div>
							</div>
							<div className="group relative sm:min-w-[50%] px-2 lg:min-w-[25%] h-[350px] rounded-2xl overflow-hidden">
								<div className="relative h-full rounded-2xl overflow-hidden">
									<img
										src="https://picsum.photos/600/400?3"
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
									<div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-all duration-500 text-white">
										<h3 className="text-2xl font-bold">Branding</h3>
										<p className="mt-2 text-sm">Creative identity</p>
									</div>
								</div>
							</div>
							<div className="group relative sm:min-w-[50%] px-2 lg:min-w-[25%] h-[350px] rounded-2xl overflow-hidden">
								<div className="relative h-full rounded-2xl overflow-hidden">
									<img
										src="https://picsum.photos/600/400?4"
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
									<div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-all duration-500 text-white">
										<h3 className="text-2xl font-bold">Marketing</h3>
										<p className="mt-2 text-sm">Growth strategy</p>
									</div>
								</div>
							</div>
							<div className="group relative sm:min-w-[50%] px-2 lg:min-w-[25%] h-[350px] rounded-2xl overflow-hidden">
								<div className="relative h-full rounded-2xl overflow-hidden">
									<img
										src="https://picsum.photos/600/400?5"
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
									<div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-all duration-500 text-white">
										<h3 className="text-2xl font-bold">SEO</h3>
										<p className="mt-2 text-sm">Search optimization</p>
									</div>
								</div>
							</div>
							<div className="group relative sm:min-w-[50%] px-2 lg:min-w-[25%] h-[350px] rounded-2xl overflow-hidden">
								<div className="relative h-full rounded-2xl overflow-hidden">
									<img
										src="https://picsum.photos/600/400?6"
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
									<div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-all duration-500 text-white">
										<h3 className="text-2xl font-bold">Content</h3>
										<p className="mt-2 text-sm">Engaging storytelling</p>
									</div>
								</div>
							</div>
						</div>

						{/* Navigation */}
						<div className="absolute top-0 bottom-0 m-auto left-0 right-0">
							<button onClick={() => scrollSlider("left")} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hover:text-white">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 1024 1024" version="1.1" fill="currentcolor"><path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"/></svg>
							</button>
							<button onClick={() => scrollSlider("right")} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hover:text-white">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 1024 1024" version="1.1" fill="currentcolor"><path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"/></svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
export default StaticHoverSlider;

















const ShopByCollection = () => {
	const collections = [
		{
			id: 1,
			title: "Engagement Collection",
			subtitle: "Forever Begins Here",
			image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
			price: "From ₹45,000",
			slug: "engagement"
		},
		{
			id: 2,
			title: "Vintage Collection",
			subtitle: "Timeless Elegance",
			image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
			price: "From ₹32,000",
			slug: "vintage"
		},
		{
			id: 3,
			title: "Anniversary Collection",
			subtitle: "Celebrate Love",
			image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
			price: "From ₹28,000",
			slug: "anniversary"
		},
		{
			id: 4,
			title: "Bridal Collection",
			subtitle: "Your Special Day",
			image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
			price: "From ₹55,000",
			slug: "bridal"
		}
	];

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
						{collections.map((collection) => (
							<Link key={collection.id} to={`/collections/${collection.slug}`}>
								<div className="group cursor-pointer">
									<div className="relative overflow-hidden rounded-xl bg-white shadow-soft border border-gray-200 hover:shadow-elegant transition-all duration-300">
										<div className="aspect-[4/3] overflow-hidden">
											<img
												src={collection.image}
												alt={collection.title}
												className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
											/>
											<div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
										</div>
										<div className="absolute bottom-0 left-0 right-0 p-8 text-white">
											<div className="mb-6">
												<h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
												<p className="text-lg opacity-90">{collection.subtitle}</p>
												<p className="text-sm mt-2 opacity-80">{collection.price}</p>
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

			<section className="py-20 inline-block w-full">
				<div className="container max-md:px-5">
					<div className="grid">

					</div>
				</div>
			</section>
		</>
	);
};

// export default ShopByCollection;
