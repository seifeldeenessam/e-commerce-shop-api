import { Router } from 'express';
import authRouter from './auth';
import usersRouter from './users';

const router = Router();

export default (): Router => {
	authRouter(router);
	usersRouter(router);

	return router;
};
