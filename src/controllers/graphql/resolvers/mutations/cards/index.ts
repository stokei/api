import { CreateCardResolver } from './create-card';
import { RemoveCardResolver } from './remove-card';
import { UpdateCardResolver } from './update-card';

export const CardsMutations = [
  CreateCardResolver,
  RemoveCardResolver,
  UpdateCardResolver
];
