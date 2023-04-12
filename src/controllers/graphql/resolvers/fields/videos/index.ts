import { VideoAppResolver } from './app';
import { VideoVideoAuthorsResolver } from './authors';
import { VideoCreatedByResolver } from './created-by';
import { VideoFileResolver } from './file';
import { VideoImageResolver } from './poster';
import { VideoReferenceResolver } from './reference';
import { VideoUpdatedByResolver } from './updated-by';

export const VideosFieldsResolvers = [
  VideoReferenceResolver,
  VideoAppResolver,
  VideoCreatedByResolver,
  VideoUpdatedByResolver,
  VideoFileResolver,
  VideoImageResolver,
  VideoVideoAuthorsResolver
];
