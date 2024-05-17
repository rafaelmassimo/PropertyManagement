import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
	{
		emai: {
			type: String,
			unique: [true, 'Email already Exist'],
			required: [true, 'Email is required'],
		},
		username: {
			type: String,
			required: [true, 'Username is required'],
		},
		image: {
			type: String,
		},

		bookmarks: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Property',
			},
		],
	},
	{
		timestamps: true,
	},
);

const User = models.user || model('User', UserSchema);

export default User;
