import { VideoCreatedHandler } from './video-created.handler';
import { VideoRemovedHandler } from './video-removed.handler';
import { VideoUpdatedHandler } from './video-updated.handler';

export const VideoEventsHandlers = [
  VideoCreatedHandler,
  VideoUpdatedHandler,
  VideoRemovedHandler
];
