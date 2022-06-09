import { VideosSubtitleCreatedHandler } from './videos-subtitle-created.handler';
import { VideosSubtitleRemovedHandler } from './videos-subtitle-removed.handler';
import { VideosSubtitleUpdatedHandler } from './videos-subtitle-updated.handler';

export const VideosSubtitleEventsHandlers = [
  VideosSubtitleCreatedHandler,
  VideosSubtitleUpdatedHandler,
  VideosSubtitleRemovedHandler
];
