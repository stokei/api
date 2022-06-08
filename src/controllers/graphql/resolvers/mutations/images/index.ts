import { CreateImageResolver } from './create-image';
import { RemoveImageResolver } from './remove-image';
import { UpdateImageResolver } from './update-image';

export const ImagesMutations = [
  CreateImageResolver,
  RemoveImageResolver,
  UpdateImageResolver
];
