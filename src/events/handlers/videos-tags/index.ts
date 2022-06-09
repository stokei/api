import { VideosTagCreatedHandler } from './videos-tag-created.handler';
import { VideosTagRemovedHandler } from './videos-tag-removed.handler';
import { VideosTagUpdatedHandler } from './videos-tag-updated.handler';

export const VideosTagEventsHandlers = [
  VideosTagCreatedHandler,
  VideosTagUpdatedHandler,
  VideosTagRemovedHandler
];
