import { ICommand } from '@nestjs/cqrs';

import {
  RemoveComponentDTO,
  RemoveComponentWhereDTO
} from '@/dtos/components/remove-component.dto';

export class RemoveComponentCommand implements ICommand, RemoveComponentDTO {
  where: RemoveComponentWhereDTO;
  constructor(data: RemoveComponentDTO) {
    this.where = data.where;
  }
}
