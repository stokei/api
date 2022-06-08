import { CreateTagResolver } from './create-tag';
import { RemoveTagResolver } from './remove-tag';
import { UpdateTagResolver } from './update-tag';

export const TagsMutations = [
  CreateTagResolver,
  RemoveTagResolver,
  UpdateTagResolver
];
