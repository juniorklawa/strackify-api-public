import { Request, Response } from 'express';
import jwt_decode from 'jwt-decode';
import Playlist from '../models/Playlist';
import User from '../models/User';

export interface IUserDTO {
  user_id: string;
  email: string;
  name: string;
  picture: string;
}

export default {
  async getUser(request: Request, response: Response): Promise<Response> {
    const authToken = request.headers.authtoken as string;
    const decodedUser: IUserDTO = jwt_decode(authToken);
    const user = await User.findOne({ userId: decodedUser.user_id });
    if (!user) {
      return response.status(404).json({ error: 'user-not-found' });
    }
    return response.json(user);
  },

  async addPlaylistToList(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const authToken = request.headers.authtoken as string;

    const { playlistId } = request.body;

    const decodedUser: IUserDTO = jwt_decode(authToken);

    await Playlist.findOneAndUpdate(
      { _id: playlistId },
      { $inc: { favNumber: 1 } },
    );

    const user = await User.findOneAndUpdate(
      { userId: decodedUser.user_id },
      { $push: { favoritePlaylistsIds: playlistId } },
    );

    if (!user) {
      return response.status(404).json({ error: 'user-not-found' });
    }

    return response.json({ message: 'user-updated' });
  },

  async removePlaylistFromList(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const authToken = request.headers.authtoken as string;
    const { playlistId } = request.body;

    const decodedUser: IUserDTO = jwt_decode(authToken);

    await Playlist.findOneAndUpdate(
      { _id: playlistId },
      { $inc: { favNumber: -1 } },
    );

    const user = await User.findOneAndUpdate(
      { userId: decodedUser.user_id },
      { $pull: { favoritePlaylistsIds: playlistId } },
    );
    if (!user) {
      return response.status(404).json({ error: 'user-not-found' });
    }

    return response.json(user);
  },

  async createUser(request: Request, response: Response): Promise<Response> {
    const { username } = request.body;
    const authToken = request.headers.authtoken as string;

    const decodedUser: IUserDTO = jwt_decode(authToken);

    const formattedUser = {
      userId: decodedUser.user_id,
      email: decodedUser.email,
      username,
    };

    const user = await User.create(formattedUser);
    return response.json(user);
  },

  async getFavoritesPlaylists(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const authToken = request.headers.authtoken as string;

    const decodedUser: IUserDTO = jwt_decode(authToken);

    const user = await User.findOne({ userId: decodedUser.user_id });

    const playlists = await Playlist.find({
      _id: { $in: user?.favoritePlaylistsIds },
    });

    return response.json(playlists);
  },

  async getUserPlaylists(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const authToken = request.headers.authtoken as string;
    const decodedUser: IUserDTO = jwt_decode(authToken);

    const playlists = await Playlist.find({
      creatorId: decodedUser.user_id,
    });

    return response.json(playlists);
  },
};
