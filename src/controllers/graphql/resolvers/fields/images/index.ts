import { ImageAppResolver } from './app';
import { ImageCreatedByResolver } from './created-by';
import { ImageReferenceResolver } from './reference';
import { ImageUpdatedByResolver } from './updated-by';

export const ImagesFieldsResolvers = [
  ImageReferenceResolver,
  ImageAppResolver,
  ImageCreatedByResolver,
  ImageUpdatedByResolver
];
