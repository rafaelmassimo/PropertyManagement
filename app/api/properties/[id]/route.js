import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';


//>> Method: GET by ID
//>> Path: /api/properties/:id
export const GET = async (request, { params: { id } }) => {
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

//>> Method: GET by ID
//>> Path: /api/properties/:id
export const DELETE = async (request, { params }) => {
	try {
		const propertyId = params.id;

		const sessionUser = await getSessionUser(request);

		// Check for session
		if (!sessionUser || sessionUser.id) {
			return new Response('User is required to delete property', { status: 401 });
		}

		const { userId } = sessionUser;

		await connectDB();
		const property = await Property.findById(propertyId);

		if (!property) return new Response('Property not found', { status: 404 });

		// Verify ownership
		if (property.owner.toString() !== userId) {
			return new Response('Unauthorized', { status: 401 });
		}

		await property.deleteOne();

		return new Response(JSON.stringify('Property Deleted', { status: 200 }));
	} catch (error) {
		console.log(error);
		return new Response('Something Went Wrong', { status: 500 }); //this the user is gonna see in his screen
	}
};

//? Method: PUT
//? Path: /api/properties/:id
export const PUT = async (request, { params: { id } }) => {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();

		// check if we have no user
		if (!sessionUser || !sessionUser.userId) {
			return new Response('User is required', { status: 401 });
		}

		const { userId } = sessionUser;

		const formData = await request.formData();
		//Access all value from amenities
		const amenities = formData.getAll('amenities');

		// Get property to update
		const existingProperty = await Property.findById(id);
		if (!existingProperty) {
			return new Response('Property not found', { status: 404 });
		}

		// Verify Ownership
		if (existingProperty.owner.toString() !== userId) {
			return new Response('Unauthorized', { status: 401 });
		}

		// Create propertyData object for database
		const propertyData = {
			type: formData.get('type'),
			name: formData.get('name'),
			description: formData.get('description'),
			location: {
				street: formData.get('location.street'),
				city: formData.get('location.city'),
				state: formData.get('location.state'),
				zipcode: formData.get('location.zipcode'),
			},
			beds: formData.get('beds'),
			baths: formData.get('baths'),
			square_feet: formData.get('square_feet'),
			amenities,
			rates: {
				weekly: formData.get('rates.weekly'),
				monthly: formData.get('rates.monthly'),
				nightly: formData.get('rates.nightly'),
			},
			seller_info: {
				name: formData.get('seller_info.name'),
				email: formData.get('seller_info.email'),
				phone: formData.get('seller_info.phone'),
			},
			owner: userId,
		};

		// Update property in DB
		const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

		return new Response(JSON.stringify(updatedProperty), { status: 200 });
	} catch (error) {
		return new Response('Failed to add property', { status: 500 });
	}
};
