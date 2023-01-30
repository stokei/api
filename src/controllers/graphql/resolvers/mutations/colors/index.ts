import { CreateColorResolver } from './create-color';
import { CreateOrUpdateColorResolver } from './create-or-update-color';
import { RemoveColorResolver } from './remove-color';
import { UpdateColorResolver } from './update-color';

export const ColorsMutations = [
  CreateColorResolver,
  CreateOrUpdateColorResolver,
  RemoveColorResolver,
  UpdateColorResolver
];
