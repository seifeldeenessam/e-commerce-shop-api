import { Schema, model } from 'mongoose';

const schema = new Schema({
	name: { type: Schema.Types.String, required: true },
	username: { type: Schema.Types.String, required: true, unique: true },
	password: { type: Schema.Types.String, required: true, select: false }
});

export const User = model('User', schema);
