import { VideoAuthorCreatedHandler } from './video-author-created.handler';
import { VideoAuthorRemovedHandler } from './video-author-removed.handler';
import { VideoAuthorUpdatedHandler } from './video-author-updated.handler';

export const VideoAuthorEventsHandlers = [
  VideoAuthorCreatedHandler,
  VideoAuthorUpdatedHandler,
  VideoAuthorRemovedHandler
];
