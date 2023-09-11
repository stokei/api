import { ICommand } from '@nestjs/cqrs';

import { CreateComponentDTO } from '@/dtos/components/create-component.dto';
import { ComponentType } from '@/enums/component-type.enum';

export class CreateComponentCommand implements ICommand, CreateComponentDTO {
  parent: string;
  type: ComponentType;
  data?: any;
  app: string;
  createdBy: string;

  constructor(data: CreateComponentDTO) {
    this.parent = data.parent;
    this.type = data.type;
    this.data = data.data;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
