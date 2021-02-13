import { Router } from 'express';
import userController from '../controllers/UserController';

const userRouter = Router();

userRouter.get('/', userController.getUser);
userRouter.post('/', userController.createUser);
userRouter.put('/addFavoritePlaylist', userController.addPlaylistToList);
userRouter.put(
  '/removeFavoritePlaylist',
  userController.removePlaylistFromList,
);
userRouter.get('/favorites', userController.getFavoritesPlaylists);
userRouter.get('/playlists', userController.getUserPlaylists);

export default userRouter;
