import { CreatePageResolver } from './create-page';
import { RemovePageResolver } from './remove-page';
import { UpdatePageResolver } from './update-page';

export const PagesMutations = [
  CreatePageResolver,
  RemovePageResolver,
  UpdatePageResolver
];
