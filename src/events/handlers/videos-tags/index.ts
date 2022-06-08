import { VideosTagCreatedHandler } from './videos-tag-created.handler';
import { VideosTagUpdatedHandler } from './videos-tag-updated.handler';
import { VideosTagRemovedHandler } from './videos-tag-removed.handler';

export const VideosTagEventsHandlers = [
  VideosTagCreatedHandler,
  VideosTagUpdatedHandler,
  VideosTagRemovedHandler
];
