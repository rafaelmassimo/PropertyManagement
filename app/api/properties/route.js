import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';

export const dynamic = 'force-dynamic';


//? Method: GET
export const GET = async (request) => {
	try {
		await connectDB();
		// Here we are going to get the page and pageSize from the URL fired from the properties.jsx file
		const page = request.nextUrl.searchParams.get('page') || 1; // if you add the + operator you can convert the string to a number ex: page = +request...
		const pageSize = request.nextUrl.searchParams.get('pageSize') || 3;

		const skip = (page - 1) * pageSize;

		const total = await Property.countDocuments();
		const properties = await Property.find({}).skip(skip).limit(pageSize);


		const result = {
			total, // total number of properties
			properties, // properties for the current page
		}

		return new Response(JSON.stringify(result, { status: 200 }));
	} catch (error) {
		console.log(error);
		return new Response('Something Went Wrong', { status: 500 }); //this the user is gonna see in his screen
	}
};

//? Method: POST
export const POST = async (request) => {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();

		// check if we have no user
		if (!sessionUser || !sessionUser.userId) {
			return new Response('User is required', { status: 401 });
		}

		const { userId } = sessionUser;

		const formData = await request.formData();
		//Access all value from amenities and images
		const amenities = formData.getAll('amenities');
		const images = formData.getAll('images').filter((image) => image.name !== '');

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

		// Upload images to cloudinary
		const imagesUploadPromises = [];

		for (const image of images) {
			const imageBuffer = await image.arrayBuffer();
			const imageArray = Array.from(new Uint8Array(imageBuffer));
			const imageData = Buffer.from(imageArray);

			//Convert the image data to base64
			const imageBase64 = imageData.toString('base64');

			// Make request to upload to Cloudinary
			const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
				folder: 'propertypulse',
			});
			imagesUploadPromises.push(result.secure_url);

			// Wait for all images to upload
			const uploadedImages = await Promise.all(imagesUploadPromises);
			// Add uploaded images to the propertyData object
			propertyData.images = uploadedImages;
		}
		const newProperty = new Property(propertyData);
		await newProperty.save();

		return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);

		// return new Response(JSON.stringify({ message: 'Success' }), { status: 200 });
	} catch (error) {
		return new Response('Failed to add property', { status: 500 });
	}
};
