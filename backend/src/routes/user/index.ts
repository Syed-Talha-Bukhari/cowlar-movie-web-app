import express from 'express';
import { deleteUser } from '../../controllers/user';
import { isAuthenticated } from '../../middlewares/auth/isAuthenticated';

const userRouter = express.Router();

userRouter.route('/').delete(isAuthenticated, deleteUser);

export {userRouter};

