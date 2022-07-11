import { FindAllVideoAuthorsQueryHandler } from './find-all-video-authors';
import { FindVideoAuthorByIdQueryHandler } from './find-video-author-by-id';

export const VideoAuthorQueriesHandlers = [
  FindVideoAuthorByIdQueryHandler,
  FindAllVideoAuthorsQueryHandler
];
