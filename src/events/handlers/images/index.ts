import { ImageCreatedHandler } from './image-created.handler';
import { ImageRemovedHandler } from './image-removed.handler';
import { ImageUpdatedHandler } from './image-updated.handler';

export const ImageEventsHandlers = [
  ImageCreatedHandler,
  ImageUpdatedHandler,
  ImageRemovedHandler
];
