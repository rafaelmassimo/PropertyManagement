'use client';

import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const SavedPropertiesPage = () => {
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSavedProperties = async () => {
			try {
				const result = await fetch('/api/bookmarks');

				if (result.status === 200) {
					const data = await result.json();
					setProperties(data);
				} else {
					console.log(result.statusText);
					toast.error('Failed to fetch saved properties');
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchSavedProperties();
	}, []);

	return loading ? (
		<div>
			<Spinner loading={loading} />
		</div>
	) : (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto px-4 py-6">
				<h1 className="text-2xl mb-4">Saved Properties</h1>
				{properties.length === 0 ? (
					<p>No Saved Properties found</p>
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

	return <div></div>;
};

export default SavedPropertiesPage;
