import { FileCreatedHandler } from './file-created.handler';
import { FileUpdatedHandler } from './file-updated.handler';
import { FileRemovedHandler } from './file-removed.handler';

export const FileEventsHandlers = [
  FileCreatedHandler,
  FileUpdatedHandler,
  FileRemovedHandler
];
