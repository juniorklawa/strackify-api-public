import { Router } from 'express';
import checkAuth from '../middlewares/checkAuth';
import dashboardRouter from './dashboard.routes';
import playlistsRouter from './playlists.routes';
import checkUsernameRouter from './checkUsername.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use('/playlists', playlistsRouter);
routes.use('/user', checkAuth, userRouter);
routes.use('/checkUsername', checkUsernameRouter);
routes.use('/dashboard', dashboardRouter);

export default routes;
