import Playlist, { IPlaylist } from '../models/Playlist';

interface IFeaturedBook {
  title: string;
  bookCoverUrl: string;
  author: string;
  bestPlaylist: IPlaylist;
}

const featuredBooksBuilder = async (): Promise<IFeaturedBook[]> => {
  const playlists = await Playlist.find()
    .sort({ favNumber: -1 })
    .collation({ locale: 'en_US', numericOrdering: true })
    .limit(5);

  const featuredBooks: IFeaturedBook[] = playlists.map(playlist => {
    const firstBook = playlist.recommendedBooks[0];
    return {
      title: firstBook.title,
      bookCoverUrl: firstBook.bookCoverUrl,
      author: firstBook.author,
      bestPlaylist: {
        ...playlist,
      },
    };
  }) as IFeaturedBook[];

  return featuredBooks;
};

export default featuredBooksBuilder;
