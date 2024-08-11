import { PASSWORD_REGEX, USER_TYPE } from '@/constants';
import type { Schema } from 'express-validator';

export const userCreateSchema: Schema = {
	name: {
		isString: true,
		notEmpty: { errorMessage: 'Name is required' }
	},
	username: {
		isString: true,
		notEmpty: { errorMessage: 'Username is required' }
	},
	password: {
		notEmpty: { errorMessage: 'Password is required' },
		matches: { options: PASSWORD_REGEX, errorMessage: 'Week password' }
	},
	type: {
		isString: true,
		notEmpty: { errorMessage: 'Type is required' },
		matches: { options: USER_TYPE, errorMessage: 'Invalid type' }
	}
};
