import { CreateAccessService } from './create-access';
import { FindAccessByIdService } from './find-access-by-id';
import { FindAllAccessesService } from './find-all-accesses';
import { RefreshAccessService } from './refresh-access';
import { RemoveAccessService } from './remove-access';

export const AccessServices = [
  CreateAccessService,
  RemoveAccessService,
  RefreshAccessService,
  FindAccessByIdService,
  FindAllAccessesService
];
