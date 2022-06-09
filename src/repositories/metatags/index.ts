import { CountMetatagsRepository } from './count-metatags';
import { CreateMetatagRepository } from './create-metatag';
import { ExistsMetatagsRepository } from './exists-metatags';
import { FindAllMetatagsRepository } from './find-all-metatags';
import { FindMetatagByIdRepository } from './find-metatag-by-id';
import { RemoveMetatagRepository } from './remove-metatag';
import { UpdateMetatagRepository } from './update-metatag';

export const MetatagsRepositories = [
  CountMetatagsRepository,
  CreateMetatagRepository,
  ExistsMetatagsRepository,
  FindMetatagByIdRepository,
  FindAllMetatagsRepository,
  RemoveMetatagRepository,
  UpdateMetatagRepository
];
