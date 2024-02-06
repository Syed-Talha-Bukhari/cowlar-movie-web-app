import express from 'express';
import { loginController, signupController } from "../../controllers/auth";

const authRouter = express.Router();

authRouter.route('/login').post(loginController);
authRouter.route('/signup').post(signupController);

export {authRouter};

