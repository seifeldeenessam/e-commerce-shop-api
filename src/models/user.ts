import { Schema, model } from 'mongoose';

const schema = new Schema({
	name: { type: Schema.Types.String, required: true },
	username: { type: Schema.Types.String, required: true, unique: true },
	password: { type: Schema.Types.String, required: true, select: false },
	type: { type: Schema.Types.String, enum: ['ADMIN', 'SALES_MANAGER', 'SALES_PERSON'], required: true }
});

export const User = model('User', schema);
