import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const POST = async (request) => {
	try {
		await connectDB();
        const { property, recipient} = await request.json();

		const sessionUser = await getSessionUser();
		const { user } = sessionUser;


		const messages = [
			{
				sender: user.id,
				recipient: recipient,
				property: property,
				name: 'John Doe',
				email: 'john@example.com',
				phone: 1234567890,
				body: 'Message message 1',
				read: false,
			},
			{
				sender: user.id,
				recipient: recipient,
				property: property,
				name: 'Jane Smith',
				email: 'jane@example.com',
				phone: 1234567891,
				body: 'Message message 2',
				read: false,
			},
			{
				sender: user.id,
				recipient: recipient,
				property: property,
				name: 'Alice Johnson',
				email: 'alice@example.com',
				phone: 1234567892,
				body: 'Message message 3',
				read: false,
			},
			{
				sender: user.id,
				recipient: recipient,
				property: property,
				name: 'Bob Brown',
				email: 'bob@example.com',
				phone: 1234567893,
				body: 'Message message 4',
				read: false,
			},
			{
				sender: user.id,
				recipient: recipient,
				property: property,
				name: 'Charlie Davis',
				email: 'charlie@example.com',
				phone: 1234567894,
				body: 'Message message 5',
				read: false,
			},
		];

		const createdMessages = await Message.insertMany(messages);

		return new Response(JSON.stringify(createdMessages), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};
