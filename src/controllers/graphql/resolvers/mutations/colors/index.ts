import { CreateColorResolver } from './create-color';
import { RemoveColorResolver } from './remove-color';
import { UpdateColorResolver } from './update-color';

export const ColorsMutations = [
  CreateColorResolver,
  RemoveColorResolver,
  UpdateColorResolver
];
