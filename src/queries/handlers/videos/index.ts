import { FindAllVideosQueryHandler } from './find-all-videos';
import { FindVideoByIdQueryHandler } from './find-video-by-id';

export const VideoQueriesHandlers = [
  FindVideoByIdQueryHandler,
  FindAllVideosQueryHandler
];
