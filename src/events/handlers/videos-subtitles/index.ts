import { VideosSubtitleCreatedHandler } from './videos-subtitle-created.handler';
import { VideosSubtitleUpdatedHandler } from './videos-subtitle-updated.handler';
import { VideosSubtitleRemovedHandler } from './videos-subtitle-removed.handler';

export const VideosSubtitleEventsHandlers = [
  VideosSubtitleCreatedHandler,
  VideosSubtitleUpdatedHandler,
  VideosSubtitleRemovedHandler
];
