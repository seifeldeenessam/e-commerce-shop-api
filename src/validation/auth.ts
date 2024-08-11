import type { Schema } from 'express-validator';

export const authLoginSchema: Schema = {
	username: {
		isString: true,
		notEmpty: { errorMessage: 'Username is required' }
	},
	password: {
		isString: true,
		notEmpty: { errorMessage: 'Password is required' }
	}
};
