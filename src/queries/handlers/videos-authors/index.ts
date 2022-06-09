import { FindAllVideosAuthorsQueryHandler } from './find-all-videos-authors';
import { FindVideosAuthorByIdQueryHandler } from './find-videos-author-by-id';

export const VideosAuthorQueriesHandlers = [
  FindVideosAuthorByIdQueryHandler,
  FindAllVideosAuthorsQueryHandler
];
