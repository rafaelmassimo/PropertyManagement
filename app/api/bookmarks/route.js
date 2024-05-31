import connectDB from '@/config/database';
import Property from '@/models/Property';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

//GET /api/bookmarks

export const GET = async () => {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', { status: 401 });
		}
		const { userId } = sessionUser;

		const user = await User.findOne({ _id: userId });

        // Get Users bookmarks
		const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

		return new Response(JSON.stringify(bookmarks), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};

export const POST = async (request) => {
	try {
		await connectDB();
		const { propertyId } = await request.json();
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', { status: 401 });
		}

		const { userId } = sessionUser;

		// Find User in DB
		const user = await User.findOne({ _id: userId });
		if (!user) {
			return new Response('User not found', { status: 404 });
		}

		// Check if property is bookmarked
		let isBookmarked = user.bookmarks.includes(propertyId);
		let message;

		if (isBookmarked) {
			// If is already bookmarked, remove it
			user.bookmarks = user.bookmarks.pull(propertyId);
			message = 'Property removed from bookmarks';
			isBookmarked = false;
		} else {
			// If not bookmarked, do it
			user.bookmarks.push(propertyId);
			message = 'Property added successfully to bookmarks';
			isBookmarked = true;
		}
		await user.save();

		return new Response(JSON.stringify({ message, isBookmarked }), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};
