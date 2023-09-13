import { ICommand } from '@nestjs/cqrs';

import { CreateComponentDTO } from '@/dtos/components/create-component.dto';
import { CreateMultipleComponentsDTO } from '@/dtos/components/create-multiple-components.dto';

export class CreateMultipleComponentsCommand implements ICommand {
  components: CreateComponentDTO[];

  constructor(data: CreateMultipleComponentsDTO) {
    this.components = data.components;
  }
}
