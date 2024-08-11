import { sign, verify } from 'jsonwebtoken';

export const generateJWT = (id: string): { access: string; refresh: string } => {
	if (!process.env.REFRESH_TOKEN_SECRET || !process.env.ACCESS_TOKEN_SECRET) {
		throw new Error('[generateJWT] Runtime error, check ENVs.');
	}

	const refresh = sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30 days' });
	const access = sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10min' });
	return { access, refresh };
};

// TODO: This function is not working properly
export const verifyJWT = (token: string): boolean => {
	const secret = process.env.ACCESS_TOKEN_SECRET;
	if (!secret) throw new Error('[generateJWT] Runtime error, check ENVs.');

	let isValid: boolean;

	try {
		verify(token, secret);
		isValid = true;
	} catch (error) {
		isValid = false;
	}

	return isValid;
};
