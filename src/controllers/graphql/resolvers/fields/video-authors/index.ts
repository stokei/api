import { VideoAuthorAppResolver } from './app';
import { VideoAuthorCreatedByResolver } from './created-by';
import { VideoAuthorReferenceResolver } from './reference';
import { VideoAuthorUpdatedByResolver } from './updated-by';

export const VideoAuthorsFieldsResolvers = [
  VideoAuthorReferenceResolver,
  VideoAuthorAppResolver,
  VideoAuthorCreatedByResolver,
  VideoAuthorUpdatedByResolver
];
