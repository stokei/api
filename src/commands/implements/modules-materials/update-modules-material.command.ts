import { ICommand } from '@nestjs/cqrs';
import {
  UpdateModulesMaterialDTO,
  UpdateModulesMaterialDataDTO,
  UpdateModulesMaterialWhereDTO
} from '@/dtos/modules-materials/update-modules-material.dto';

export class UpdateModulesMaterialCommand
  implements ICommand, UpdateModulesMaterialDTO
{
  data: UpdateModulesMaterialDataDTO;
  where: UpdateModulesMaterialWhereDTO;
  constructor(data: UpdateModulesMaterialDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
