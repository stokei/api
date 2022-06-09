import { ICommand } from '@nestjs/cqrs';

import {
  RemoveAccessDTO,
  RemoveAccessWhereDTO
} from '@/dtos/accesses/remove-access.dto';

export class RemoveAccessCommand implements ICommand, RemoveAccessDTO {
  where: RemoveAccessWhereDTO;
  constructor(data: RemoveAccessDTO) {
    this.where = data.where;
  }
}
