import mongoose from 'mongoose';

export interface IBook {
  bookId: string;
  averageRating: string;
  author: string;
  bookCoverUrl: string;
  title: string;
  favNumber: number;
}

export interface IPlaylist extends mongoose.Document {
  name: string;
  creator: string;
  creatorId: string;
  votes: number;
  owner: string;
  category: string;
  description: string;
  playlistUrl: string;
  favNumber: number;
  recommendedBooks: IBook[];
}

const PlaylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: String },
  creatorId: { type: String, required: true },
  votes: String,
  owner: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: false },
  playlistCoverSource: { type: String, required: true },
  playlistUrl: { type: String, required: true },
  favNumber: { type: Number, required: false },
  recommendedBooks: [
    {
      bookId: { type: String, required: true },
      averageRating: { type: String, required: false },
      author: { type: String, required: true },
      bookCoverUrl: { type: String, required: true },
      title: { type: String, required: true },
    },
  ],
});

export default mongoose.model<IPlaylist>('Playlist', PlaylistSchema);
