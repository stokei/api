import { CreateComponentResolver } from './create-component';
import { CreateOrUpdateComponentResolver } from './create-or-update-component';
import { RemoveComponentResolver } from './remove-component';
import { UpdateComponentResolver } from './update-component';
import { UpdateComponentsOrderResolver } from './update-components-order';

export const ComponentsMutations = [
  RemoveComponentResolver,
  UpdateComponentResolver,
  CreateComponentResolver,
  CreateOrUpdateComponentResolver,
  UpdateComponentsOrderResolver
];
