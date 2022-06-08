import { CreateAccessResolver } from './create-access';
import { RemoveAccessResolver } from './remove-access';
import { UpdateAccessResolver } from './update-access';

export const AccessesMutations = [
  CreateAccessResolver,
  RemoveAccessResolver,
  UpdateAccessResolver
];
