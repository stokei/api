import { CreateMetatagResolver } from './create-metatag';
import { RemoveMetatagResolver } from './remove-metatag';
import { UpdateMetatagResolver } from './update-metatag';

export const MetatagsMutations = [
  CreateMetatagResolver,
  RemoveMetatagResolver,
  UpdateMetatagResolver
];
