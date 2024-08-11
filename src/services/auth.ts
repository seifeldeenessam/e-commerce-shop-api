import { User } from '@/models';
import { AuthLoginPayload, ResponseObject } from '@/types';
import { generateJWT } from '@/utilities';
import { handleValidationErrors } from '@/utilities/errors';
import { comparePasswords } from '@/utilities/passwords';
import type { Request, Response } from 'express';
import { matchedData } from 'express-validator';

export const authLogin = async (req: Request, res: Response) => {
	// Handling payload errors
	const validationErrors = handleValidationErrors(req);
	if (validationErrors.length > 0) throw new Error('Invalid credentials');

	// Assigning the type of a clean payload
	const payload = matchedData(req) as AuthLoginPayload;

	// Checking for user existence
	const user = await User.findOne({ username: payload.username }).select('password');
	if (!user) return res.status(403).send({ error: 'User not found', code: 'wrong_credentials', message: 'Wrong credentials' } as ResponseObject);

	// Comparing incoming password with user's stored password
	const isPasswordCorrect = await comparePasswords(payload.password, user.password);
	if (!isPasswordCorrect) return res.status(403).send({ error: 'Wrong password', code: 'wrong_credentials', message: 'Wrong credentials' } as ResponseObject);

	// Generating JWT
	const JWT = generateJWT(user._id.toString());

	// Setting access and refresh cookie
	res.cookie('refresh', JWT.refresh, {
		httpOnly: true,
		secure: process.env.MODE === 'PROD',
		sameSite: 'lax',
		path: '/',
		domain: process.env.MODE === 'PROD' ? process.env.DOMAIN : '',
		maxAge: 1000 * 60 * 60 * 24 * 365 * 10 // 10 years
	});

	res.status(200).send({ error: null, code: 'login_succeed', message: 'Login succeeded', data: { access: JWT.access } } as ResponseObject);
};

export const authLogout = async (req: Request, res: Response) => {
	// TODO: Handle logout
};
