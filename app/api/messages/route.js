import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force dynamic';
//GET /api/messages
export const GET = async () => {
	try {
		await connectDB();
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			return new Response(
				JSON.stringify({ message: 'You must be logged in to sent the message' }),
				{ status: 401 },
			);
		};

		const {userId} = sessionUser;

		const messages = await Message.find({recipient: userId}).populate('sender', 'username').populate('property', 'name');

		return new Response(JSON.stringify(messages), {status: 200});

	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
}



//POST /api/messages
export const POST = async (request) => {
	try {
		await connectDB();
		const { name, email, phone, property, recipient, message } = await request.json();

		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			return new Response(
				JSON.stringify({ message: 'You must be logged in to sent the message' }),
				{ status: 401 },
			);
		}

		const { user } = sessionUser;

		//Cannot send message to self
		if (user.id === recipient) {
			return new Response(JSON.stringify({ message: 'Cannot send message to yourself' }), {
				status: 400,
			});
		}

		const NewMessage = new Message({
			sender: user.id,
			recipient,
			property,
			name,
			email,
			phone,
			body: message,
		});

		await NewMessage.save(); //Here you are saving the message to the database following the schema you created in the model

		return new Response(JSON.stringify({ message: 'Message sent successfully' }, { status: 200 }));
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};


