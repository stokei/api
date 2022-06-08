import { VideosMaterialCreatedHandler } from './videos-material-created.handler';
import { VideosMaterialUpdatedHandler } from './videos-material-updated.handler';
import { VideosMaterialRemovedHandler } from './videos-material-removed.handler';

export const VideosMaterialEventsHandlers = [
  VideosMaterialCreatedHandler,
  VideosMaterialUpdatedHandler,
  VideosMaterialRemovedHandler
];
