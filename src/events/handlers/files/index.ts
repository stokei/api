import { FileCreatedHandler } from './file-created.handler';
import { FileRemovedHandler } from './file-removed.handler';
import { FileUpdatedHandler } from './file-updated.handler';

export const FileEventsHandlers = [
  FileCreatedHandler,
  FileUpdatedHandler,
  FileRemovedHandler
];
