import { VideoCreatedHandler } from './video-created.handler';
import { VideoUpdatedHandler } from './video-updated.handler';
import { VideoRemovedHandler } from './video-removed.handler';

export const VideoEventsHandlers = [
  VideoCreatedHandler,
  VideoUpdatedHandler,
  VideoRemovedHandler
];
