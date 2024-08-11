import { User } from '@/models';
import type { ResponseObject, UserCreatePayload } from '@/types';
import { generateJWT, handleValidationErrors, hashPassword } from '@/utilities';
import type { Request, Response } from 'express';
import { matchedData } from 'express-validator';

export const userCreate = async (req: Request, res: Response) => {
	// Handling payload errors
	const validationErrors = handleValidationErrors(req);
	if (validationErrors.length > 0) return res.status(400).send(validationErrors);

	// Assigning the type of a clean payload
	const payload = matchedData(req) as UserCreatePayload;

	// Checking for user existence
	const user = await User.findOne({ username: payload.username });
	if (user) return res.status(403).send({ error: 'User already exists', code: 'wrong_credentials', message: 'Wrong credentials' } as ResponseObject);

	// Hashing incoming password
	const hashedPassword = await hashPassword(payload.password);

	// Saving the user in the database & setting session cookie
	try {
		const newUser = await User.create({ ...payload, password: hashedPassword });

		// Generating JWT
		const JWT = generateJWT(newUser._id.toString());

		// Setting access and refresh cookie
		res.cookie('refresh', JWT.refresh, {
			httpOnly: true,
			secure: process.env.MODE === 'PROD',
			sameSite: 'lax',
			path: '/',
			domain: process.env.MODE === 'PROD' ? process.env.DOMAIN : '',
			maxAge: 1000 * 60 * 60 * 24 * 365 * 10 // 10 years
		});

		res.status(200).send({ error: null, code: 'account_creation_succeed', message: 'Account creation succeeded', data: { access: JWT.access } } as ResponseObject);
	} catch (error: any) {
		res.status(500).send({ error: error.message, code: 'user_create_error', message: 'Error creating account' } as ResponseObject);
	}
};

export const usersRead = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		return res.status(200).json(users).end();
	} catch (error) {
		return res.sendStatus(404);
	}
};
