import { VideoAuthorReferenceResolver } from './reference';

import { VideoAuthorAppResolver } from './app';
import { VideoAuthorReferenceResolver } from './reference';

export const VideoAuthorsFieldsResolvers = [
  VideoAuthorReferenceResolver,
  VideoAuthorAppResolver
];
