'use client';

import { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import Spinner from './Spinner';

const Properties = () => {
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProperties = async () => {
			try {
				const res = await fetch('/api/properties');
				if (!res.ok) {
					throw new Error('Failed to fetch properties');
				}
				const data = await res.json();
				setProperties(data);
			} catch (error) {
				console.log('Network error', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProperties();
	}, []);

	//>> Another way to show the spinner
	// if (loading) {
	// 	return <Spinner loading={loading} />;
	// }

	return loading ? (
		<Spinner loading={loading} />
	) : (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto px-4 py-6">
				{properties.length === 0 ? (
					<p>No Properties found</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{properties.map((property) => (
							<PropertyCard key={property.id} property={property} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default Properties;
