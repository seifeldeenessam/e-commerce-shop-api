import { userCreate, usersRead } from '@/services/users';
import { isAuthenticated } from '@/utilities';
import { userCreateSchema } from '@/validation/users';
import type { Router } from 'express';
import { checkSchema } from 'express-validator';

export default (router: Router) => {
	router.post('/users', checkSchema(userCreateSchema), userCreate);
	router.get('/users', isAuthenticated, usersRead);
};
