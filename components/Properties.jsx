'use client';

import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import PropertyCard from './PropertyCard';
import Spinner from './Spinner';

const Properties = () => {
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(3); //Here you can change the number of properties to be showed per page (3, 6, 9, 12, etc.)
	const [totalItems, setTotalItems] = useState(0); //Here you can find the total number of properties in the DB from Properties.countDocuments();

	useEffect(() => {
		const fetchProperties = async () => {
			try {
				//This is going to say to the server how many properties we want to show per page being destructuring in the searchParams() method
				const res = await fetch(`/api/properties?page=${page}&pageSize=${pageSize}`);
				if (!res.ok) {
					throw new Error('Failed to fetch properties');
				}
				const data = await res.json();
				setProperties(data.properties);
				setTotalItems(data.total);
			} catch (error) {
				console.log('Network error', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProperties();
	}, [page, pageSize]);

	//>> Another way to show the spinner
	// if (loading) {
	// 	return <Spinner loading={loading} />;
	// }

	const handlePageChange = (newPage) => {
		setPage(newPage);
	};

	return loading ? (
		<Spinner loading={loading} />
	) : (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto px-4 py-6">
				{properties.length === 0 ? (
					<p>No Properties found</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{properties.map((property, index) => (
							<div key={index}>
								<PropertyCard key={property.id} property={property} />
							</div>
						))}
					</div>
				)}
				<Pagination
					page={page}
					pageSize={pageSize}
					totalItems={totalItems}
					onPageChange={handlePageChange}
				/>
			</div>
		</section>
	);
};

export default Properties;
