import { Request, Response } from 'express';
import jwt_decode from 'jwt-decode';
import Category from '../models/Category';
import Playlist from '../models/Playlist';
import { IUserDTO } from './UserController';

export default {
  async index(_: Request, response: Response): Promise<Response> {
    const playlists = await Playlist.find();
    return response.json(playlists);
  },

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return response.status(404).json({ message: 'playlist-not-found' });
    }

    return response.json(playlist);
  },

  async getDashboard(_: Request, response: Response): Promise<Response> {
    const categories = await Category.find();

    return response.json(categories);
  },

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const authToken = request.headers.authtoken as string;
    const decodedUser: IUserDTO = jwt_decode(authToken);

    const selectedPlaylist = await Playlist.findById(id);
    if (
      selectedPlaylist &&
      selectedPlaylist.creatorId === decodedUser.user_id
    ) {
      await Playlist.findByIdAndDelete(id);
      return response.status(200).json();
    }
    return response.status(404).json({ error: 'user-not-found' });
  },

  async create(request: Request, response: Response): Promise<Response> {
    const playlist = await Playlist.create(request.body);

    if (!playlist) {
      return response.status(404).json({ error: 'playlist-not-found' });
    }

    return response.json(playlist);
  },

  async showByCategory(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { category, pageNum } = request.params;

    const page_size = 20;
    const skips = page_size * (((pageNum as unknown) as number) - 1);
    const playlists = await Playlist.find({
      category,
    })
      .skip(skips)
      .limit(page_size)
      .sort({ favNumber: -1 })
      .collation({ locale: 'en_US', numericOrdering: true });
    return response.json(playlists);
  },

  async searchBookById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { idList, pageNum } = request.body;

    const page_size = 20;

    const skips = page_size * (((pageNum as unknown) as number) - 1);

    const playlists = await Playlist.find({
      'recommendedBooks.bookId': { $in: idList },
    })
      .skip(skips)
      .limit(page_size)
      .sort({ favNumber: -1 })
      .collation({ locale: 'en_US', numericOrdering: true });

    return response.json(playlists);
  },

  async createCategory(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const category = request.body;

    const createdCategory = await Category.create(category);
    return response.json(createdCategory);
  },
};
