import * as yup from 'yup';

const createPlaylistSchema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  category: yup.string().required(),
  creatorId: yup.string().required(),
  creator: yup.string().required(),
  owner: yup.string(),
  playlistCoverSource: yup.string(),
  playlistUrl: yup.string().required(),
  recommendedBooks: yup
    .array()
    .required()
    .of(
      yup.object().shape({
        author: yup.string().required(),
        bookCoverUrl: yup.string(),
        bookId: yup.string().required(),
        title: yup.string().required(),
      }),
    )
    .min(1, 'reccomended books should have at least 1 book'),
});

export default createPlaylistSchema;
