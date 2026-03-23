
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { apiService } from "@/lib/apiService";
import { getProductImageUrl } from "@/lib/config";
import { formatCurrency } from "@/lib/currency";

const TrendingNow = () => {
	const [products, setProducts] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		apiService.getProducts({ featured: true, limit: 4 })
			.then((data) => {
				const items = data.products || data || [];
				setProducts(Array.isArray(items) ? items.slice(0, 4) : []);
			})
			.catch(() => {})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<div className="flex items-center justify-center gap-2 mb-4">
						<TrendingUp className="h-6 w-6 text-brandgold" />
						<h2 className="text-3xl font-bold text-black">Trending Now</h2>
					</div>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Discover what's popular right now in our jewelry collection
					</p>
				</div>

				{isLoading ? (
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{[...Array(4)].map((_, i) => (
							<div key={i} className="animate-pulse">
								<div className="aspect-square bg-gray-200 rounded-lg mb-4" />
								<div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
								<div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
							</div>
						))}
					</div>
				) : (
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{products.map((product) => (
							<Link key={product.id} to={`/product/${product.id}`}>
								<div className="group cursor-pointer">
									<div className="relative overflow-hidden rounded-lg bg-white shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
										<div className="aspect-square overflow-hidden">
											<img
												src={getProductImageUrl(product)}
												alt={product.name}
												className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
											/>
											<div className="absolute top-3 left-3">
												<span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
													Trending
												</span>
											</div>
										</div>
										<div className="p-4">
											<h3 className="text-sm font-medium text-black text-center group-hover:text-brandgold transition-colors line-clamp-1">
												{product.name}
											</h3>
											<p className="text-sm font-bold text-center text-black mt-1">
												{formatCurrency(product.calculatedPrice || product.calculated_price || product.price || product.base_price || 0)}
											</p>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				)}

				<div className="text-center mt-8">
					<Button
						asChild
						variant="outline"
						className="border-brandblue text-brandblue hover:bg-brandblue hover:text-white"
					>
						<Link to="/shop">View All Trending</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default TrendingNow;
