import { VideosMaterialCreatedHandler } from './videos-material-created.handler';
import { VideosMaterialRemovedHandler } from './videos-material-removed.handler';
import { VideosMaterialUpdatedHandler } from './videos-material-updated.handler';

export const VideosMaterialEventsHandlers = [
  VideosMaterialCreatedHandler,
  VideosMaterialUpdatedHandler,
  VideosMaterialRemovedHandler
];
