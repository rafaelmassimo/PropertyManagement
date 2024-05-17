import connectDB from '@/config/database';
import Property from '@/models/Property';

//? Method: GET
export const GET = async (request) => {
	try {
		await connectDB();
		const properties = await Property.find({});

		return new Response(JSON.stringify(properties, { status: 200 }));
	} catch (error) {
		console.log(error);
		return new Response('Something Went Wrong', { status: 500 }); //this the user is gonna see in his screen
	}
};
