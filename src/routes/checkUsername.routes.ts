import { Router } from 'express';
import checkUsernameController from '../controllers/checkUsernameController';

const checkUsernameRouter = Router();

checkUsernameRouter.post('/', checkUsernameController.usernameExists);

export default checkUsernameRouter;
