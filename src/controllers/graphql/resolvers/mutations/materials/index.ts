import { CreateMaterialResolver } from './create-material';
import { RemoveMaterialResolver } from './remove-material';
import { UpdateMaterialResolver } from './update-material';

export const MaterialsMutations = [
  RemoveMaterialResolver,
  UpdateMaterialResolver,
  CreateMaterialResolver
];
