import { ICommand } from '@nestjs/cqrs';

import { UpdateComponentsOrderDTO } from '@/dtos/components/update-components-order.dto';

export class UpdateComponentsOrderCommand
  implements ICommand, UpdateComponentsOrderDTO
{
  components: string[];
  app: string;
  updatedBy: string;

  constructor(data: UpdateComponentsOrderDTO) {
    this.components = data.components;
    this.app = data.app;
    this.updatedBy = data.updatedBy;
  }
}
