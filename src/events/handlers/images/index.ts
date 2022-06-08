import { ImageCreatedHandler } from './image-created.handler';
import { ImageUpdatedHandler } from './image-updated.handler';
import { ImageRemovedHandler } from './image-removed.handler';

export const ImageEventsHandlers = [
  ImageCreatedHandler,
  ImageUpdatedHandler,
  ImageRemovedHandler
];
