import express from 'express';
import loginController from '../../controllers/auth/login';
import signupController from '../../controllers/auth/signup';

const authRouter = express.Router();

authRouter.route('/login').post(loginController);
authRouter.route('/signup').post(signupController);

export {authRouter};

