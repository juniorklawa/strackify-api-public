import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  userId: string;
  username: string;
  favoritePlaylistsIds?: string[];
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  userId: { type: String, required: true },
  favoritePlaylistsIds: { type: [String], required: false },
});

export default mongoose.model<IUser>('User', UserSchema);
