import express from 'express';
import loginController from '../../controllers/auth/login';
import signupController from '../../controllers/auth/signup';
import verifyUserController from '../../controllers/auth/verifyUser';
import { isAuthenticated } from '../../middlewares/auth/isAuthenticated';

const authRouter = express.Router();

authRouter.route('/login').post(loginController);
authRouter.route('/signup').post(signupController);
authRouter.route('/verify-user').get(isAuthenticated,verifyUserController);

export {authRouter};

