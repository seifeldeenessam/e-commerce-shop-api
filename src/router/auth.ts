import { authLogin, authLogout } from '@/services/auth';
import { isAuthenticated } from '@/utilities';
import { authLoginSchema } from '@/validation/auth';
import type { Router } from 'express';
import { checkSchema } from 'express-validator';

export default (router: Router) => {
	router.post('/auth/login', checkSchema(authLoginSchema), authLogin);
	router.post('/auth/logout', isAuthenticated, authLogout);
};
