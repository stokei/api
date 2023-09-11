import { CreateComponentService } from './create-component';
import { FindAllComponentsService } from './find-all-components';
import { FindComponentByIdService } from './find-component-by-id';
import { RemoveComponentService } from './remove-component';
import { UpdateComponentService } from './update-component';

export const ComponentServices = [
  CreateComponentService,
  RemoveComponentService,
  UpdateComponentService,
  FindComponentByIdService,
  FindAllComponentsService
];
