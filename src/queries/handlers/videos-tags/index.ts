import { FindAllVideosTagsQueryHandler } from './find-all-videos-tags';
import { FindVideosTagByIdQueryHandler } from './find-videos-tag-by-id';

export const VideosTagQueriesHandlers = [
  FindVideosTagByIdQueryHandler,
  FindAllVideosTagsQueryHandler
];
