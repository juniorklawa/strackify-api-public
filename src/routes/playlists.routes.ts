import { Router } from 'express';
import validateObject from '../middlewares/validateObject';
import createPlaylistSchema from '../validators/createPlaylistSchema';

import PlaylistController from '../controllers/PlaylistController';

const playlistRouter = Router();

playlistRouter.get('/', PlaylistController.index);
playlistRouter.get('/:id', PlaylistController.show);
playlistRouter.delete('/:id', PlaylistController.delete);
playlistRouter.post(
  '/',
  validateObject(createPlaylistSchema),
  PlaylistController.create,
);
playlistRouter.get(
  '/category/:category/:pageNum',
  PlaylistController.showByCategory,
);
playlistRouter.post('/book/', PlaylistController.searchBookById);

export default playlistRouter;
