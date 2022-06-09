import { FindAllVideosSubtitlesQueryHandler } from './find-all-videos-subtitles';
import { FindVideosSubtitleByIdQueryHandler } from './find-videos-subtitle-by-id';

export const VideosSubtitleQueriesHandlers = [
  FindVideosSubtitleByIdQueryHandler,
  FindAllVideosSubtitlesQueryHandler
];
