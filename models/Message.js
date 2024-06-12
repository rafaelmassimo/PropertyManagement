import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema(
	{
		sender: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		recipient: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		property: {
			type: Schema.Types.ObjectId,
			ref: 'Property',
			required: true,
		},
		name: {
			type: String,
			required: [true, 'Please provide a name'],
		},
		email: {
			type: String,
			required: [true, 'Please provide an e-mail'],
		},
		phone: {
			type: Number,
			required: false,
		},
		body: {
			type: String,
		},
		read: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		updateAt: true,
	},
);

const Message = models.Message || model('Message', MessageSchema);

export default Message;
