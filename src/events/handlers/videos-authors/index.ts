import { VideosAuthorCreatedHandler } from './videos-author-created.handler';
import { VideosAuthorUpdatedHandler } from './videos-author-updated.handler';
import { VideosAuthorRemovedHandler } from './videos-author-removed.handler';

export const VideosAuthorEventsHandlers = [
  VideosAuthorCreatedHandler,
  VideosAuthorUpdatedHandler,
  VideosAuthorRemovedHandler
];
