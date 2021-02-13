import { Request, Response } from 'express';
import featuredBooksBuilder from '../service/featuredBooksBuilder';
import Category from '../models/Category';

export default {
  async getDashboard(_: Request, response: Response): Promise<Response> {
    const categories = await Category.find();

    const featuredBooks = await featuredBooksBuilder();

    return response.json({ categories, featuredBooks });
  },
};
