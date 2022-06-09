import { CreateAccessService } from './create-access';
import { FindAccessByIdService } from './find-access-by-id';
import { FindAllAccessesService } from './find-all-accesses';
import { RemoveAccessService } from './remove-access';
import { UpdateAccessService } from './update-access';

export const AccessServices = [
  CreateAccessService,
  RemoveAccessService,
  UpdateAccessService,
  FindAccessByIdService,
  FindAllAccessesService
];
