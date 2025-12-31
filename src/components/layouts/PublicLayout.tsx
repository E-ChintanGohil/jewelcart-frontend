import React from 'react';
import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
			<div className="container mx-auto px-4 py-8">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-amber-800 mb-2">JewelCart</h1>
					<p className="text-amber-600">Exquisite Jewelry Collection</p>
				</div>
				<Outlet />
			</div>
		</div>
	);
}