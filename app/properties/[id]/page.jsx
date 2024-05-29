'use client';

import PropertyDetails from '@/components/PropertyDetails';
import PropertyImages from '@/components/PropertyImages';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import Spinner from '@/components/Spinner';
import { fetchPropertiesById } from '@/utils/request';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import BookmarkButton from '@/components/BookmarkButton';
import ShareButtons from '@/components/ShareButtons';
import PropertyContactForm from '@/components/PropertyContactForm';

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

		if (property === null) {
			//to avoid infinite loop
			fetchProperty();
		}
	}, [id, property]);

	if (!property && !loading) {
		return <h1 className="text-center text-2xl font-bold">Property Not Found</h1>;
	}

	return (
		<>
		{loading && <Spinner loading={loading} />}
			{!loading && property && (
				<>
					<PropertyHeaderImage image={property.images[0]} />
					<section>
						<div className="container m-auto py-6 px-6">
							<Link
								href="/properties"
								className="text-blue-500 hover:text-blue-600 flex items-center"
							>
								<FaArrowLeft className="mr-2"/> Back to Properties
							</Link>
						</div>
					</section>

					<section className="bg-blue-50">
						<div className="container m-auto py-10 px-6">
							<div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
								<PropertyDetails property={property} />
								{/* <!-- Sidebar --> */}
								<aside className="space-y-4">
									<BookmarkButton property={property}/>
									<ShareButtons property={property}/>
									<PropertyContactForm property={property}/>

									
								</aside>
							</div>
						</div>
					</section>
					<PropertyImages images={property.images} />
				</>
			)}
		</>
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
