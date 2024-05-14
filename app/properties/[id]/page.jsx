"use client"

import { useParams, useRouter } from 'next/navigation';

function page() {
	const router = useRouter();
	const { id } = useParams();

	return (
		<div>
			<h1 className="text-3xl">Properties</h1>
			<button onClick={() => router.push('/')} className="bg-blue-500 p-2">
				Go Home {id}
			</button>
		</div>
	);
}

export default page;
