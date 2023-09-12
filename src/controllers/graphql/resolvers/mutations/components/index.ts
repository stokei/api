import { CreateComponentResolver } from './create-component';
import { RemoveComponentResolver } from './remove-component';
import { UpdateComponentResolver } from './update-component';

export const ComponentsMutations = [
  RemoveComponentResolver,
  UpdateComponentResolver,
  CreateComponentResolver
];
