import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/validate-requirement',UserController.validateRequirement)
userRouter.post('/get-minimal-price',UserController.getMinimalPrice)


export default userRouter;
