import { ICommand } from '@nestjs/cqrs';

import {
  CreateComponentsTreeComponentDTO,
  CreateComponentsTreeDTO
} from '@/dtos/components/create-components-tree.dto';

export class CreateComponentsTreeCommand
  implements ICommand, CreateComponentsTreeDTO
{
  tree: CreateComponentsTreeComponentDTO[];
  app: string;
  createdBy: string;

  constructor(data: CreateComponentsTreeDTO) {
    this.tree = data.tree;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
