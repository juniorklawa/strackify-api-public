import { Request, Response } from 'express';
import User from '../models/User';

export default {
  async usernameExists(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { username } = request.body;
    const user = await User.findOne({
      username,
    });

    if (user) {
      return response.json({ usernameExists: true });
    }

    return response.json({ usernameExists: false });
  },
};
