import type { ResponseObject } from '@/types';
import { verifyJWT } from '@/utilities/tokens';
import type { NextFunction, Request, Response } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	if (process.env.MODE === 'DEV' && req.headers.authorization === 'pass') {
		next();
		return;
	}

	const bearer = req.headers.authorization;
	if (!bearer) return res.status(401).send({ error: 'Unauthorized', code: 'unauthorized', message: 'Action refused' } as ResponseObject);

	const token = bearer.split(' ')[1];

	const isTokenValid = verifyJWT(token);
	if (!isTokenValid) return res.status(401).send({ error: 'Invalid token', code: 'invalid_token', message: 'Action refused' } as ResponseObject);

	next();
};

// TODO: Handle this
export const isOwner = (req: Request, res: Response, next: NextFunction) => {
	next();
};
