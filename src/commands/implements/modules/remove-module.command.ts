import { ICommand } from '@nestjs/cqrs';

import {
  RemoveModuleDTO,
  RemoveModuleWhereDTO
} from '@/dtos/modules/remove-module.dto';

export class RemoveModuleCommand implements ICommand, RemoveModuleDTO {
  where: RemoveModuleWhereDTO;
  constructor(data: RemoveModuleDTO) {
    this.where = data.where;
  }
}
