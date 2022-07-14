import { VideoAuthorCreatedHandler } from './video-author-created.handler';
import { VideoAuthorRemovedHandler } from './video-author-removed.handler';

export const VideoAuthorEventsHandlers = [
  VideoAuthorCreatedHandler,
  VideoAuthorRemovedHandler
];
