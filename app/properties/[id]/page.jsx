'use client';

import { fetchPropertiesById } from '@/utils/request';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const PropertyPage = async () => {
	const { id } = useParams();
	const [property, setProperty] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProperty = async () => {
			if (!id) return;

			try {
				const property = await fetchPropertiesById(id);
				setProperty(property);
			} catch (error) {
				console.error('Error fetching property:', error);
			} finally {
				setLoading(false);
			}
		};

		if (property === null) { //to avoid infinite loop
			fetchProperty();
		}
	}, [id, property]);

	return (
		<div>
			<h1 className="text-3xl">Properties</h1>
			<button onClick={() => router.push('/')} className="bg-blue-500 p-2">
				Go Home {id}
			</button>
		</div>
	);
};

export default PropertyPage;

//---------------------------------------------------------------------
// Just another way to move between pages using useRouter()
//
// function PropertyPage() {
// 	const router = useRouter();
// 	const { id } = useParams();

// 	return (
// 		<div>
// 			<h1 className="text-3xl">Properties</h1>
// 			<button onClick={() => router.push('/')} className="bg-blue-500 p-2">
// 				Go Home {id}
// 			</button>
// 		</div>
// 	);
// }
