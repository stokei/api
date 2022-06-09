import { VideosAuthorCreatedHandler } from './videos-author-created.handler';
import { VideosAuthorRemovedHandler } from './videos-author-removed.handler';
import { VideosAuthorUpdatedHandler } from './videos-author-updated.handler';

export const VideosAuthorEventsHandlers = [
  VideosAuthorCreatedHandler,
  VideosAuthorUpdatedHandler,
  VideosAuthorRemovedHandler
];
