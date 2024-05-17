import connectDB from '@/config/database';
import Property from '@/models/Property';


//>> Method: GET by ID
//>> Path: /api/properties/:id
export const GET = async (request, {params: {id}}) => {
	try {
		await connectDB();
		const property = await Property.findById(id);

        if (!property) return new Response('Property not found', { status: 404 });

        

		return new Response(JSON.stringify(property, { status: 200 }));
	} catch (error) {
		console.log(error);
		return new Response('Something Went Wrong', { status: 500 }); //this the user is gonna see in his screen
	}
};
