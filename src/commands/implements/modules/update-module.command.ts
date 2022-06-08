import { ICommand } from '@nestjs/cqrs';
import {
  UpdateModuleDTO,
  UpdateModuleDataDTO,
  UpdateModuleWhereDTO
} from '@/dtos/modules/update-module.dto';

export class UpdateModuleCommand implements ICommand, UpdateModuleDTO {
  data: UpdateModuleDataDTO;
  where: UpdateModuleWhereDTO;
  constructor(data: UpdateModuleDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
