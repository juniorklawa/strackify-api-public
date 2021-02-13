import mongoose from 'mongoose';

// eslint-disable-next-line no-shadow
export enum CATEGORIES_TYPE {
  FANTASY = 'fantasy',
  ACTION_ADVENTURE = 'action_adventure',
  SCIENCE_FICTION = 'science_fiction',
  ROMANCE = 'romance',
  HISTORIC = 'historic',
  SPIRITUALITY = 'spirituality',
  DRAMA = 'drama',
  BIOGRAPHY = 'biography',
  TERROR_HORROR = 'terror_horror',
}

export interface ICategory extends mongoose.Document {
  title: string;
  category: string;
  description: string;
  imgSource: string;
}

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imgSource: { type: String, required: true },
});

export default mongoose.model<ICategory>('Category', CategorySchema);
