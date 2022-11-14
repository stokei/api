import { FileActivatedHandler } from './file-activated.handler';
import { FileCreatedHandler } from './file-created.handler';
import { FileRemovedHandler } from './file-removed.handler';
import { FileUpdatedHandler } from './file-updated.handler';
import { VideoUploadURLCreatedHandler } from './video-upload-url-created.handler';

export const FileEventsHandlers = [
  FileCreatedHandler,
  FileRemovedHandler,
  FileActivatedHandler,
  FileUpdatedHandler,
  VideoUploadURLCreatedHandler
];
