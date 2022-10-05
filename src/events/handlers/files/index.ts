import { FileCreatedHandler } from './file-created.handler';
import { FileEncodingStartedHandler } from './file-encoding-started.handler';
import { FileRemovedHandler } from './file-removed.handler';
import { FileUpdatedHandler } from './file-updated.handler';

export const FileEventsHandlers = [
  FileCreatedHandler,
  FileRemovedHandler,
  FileEncodingStartedHandler,
  FileUpdatedHandler
];
