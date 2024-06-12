import connectDB from '@/config/database';
import Property from '@/models/Property';

export const dynamic = 'force-dynamic';


//? Method: GET /api/properties/featured
export const GET = async (request) => {
	try {
		await connectDB();

		// Find properties that are featured
		const properties = await Property.find({
			is_featured: true,
		});

		return new Response(JSON.stringify(properties, { status: 200 }));
	} catch (error) {
		console.log(error);
		return new Response('Something Went Wrong', { status: 500 }); //this the user is gonna see in his screen
	}
};
