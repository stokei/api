import { CreateComponentService } from './create-component';
import { CreateMultipleComponentsService } from './create-multiple-components';
import { FindAllComponentsService } from './find-all-components';
import { FindAllComponentsByParentIdsService } from './find-all-components-by-parent-ids';
import { FindComponentByIdService } from './find-component-by-id';
import { RemoveComponentService } from './remove-component';
import { UpdateComponentService } from './update-component';

export const ComponentServices = [
  CreateComponentService,
  RemoveComponentService,
  UpdateComponentService,
  FindComponentByIdService,
  FindAllComponentsService,
  FindAllComponentsByParentIdsService,
  CreateMultipleComponentsService
];
