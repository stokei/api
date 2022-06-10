import { CountAccessesRepository } from './count-accesses';
import { CreateAccessRepository } from './create-access';
import { ExistsAccessesRepository } from './exists-accesses';
import { FindAccessByIdRepository } from './find-access-by-id';
import { FindAllAccessesRepository } from './find-all-accesses';
import { RemoveAccessRepository } from './remove-access';

export const AccessesRepositories = [
  CountAccessesRepository,
  CreateAccessRepository,
  ExistsAccessesRepository,
  FindAccessByIdRepository,
  FindAllAccessesRepository,
  RemoveAccessRepository
];
