import { ICommand } from '@nestjs/cqrs';
import {
  RemoveModulesMaterialDTO,
  RemoveModulesMaterialWhereDTO
} from '@/dtos/modules-materials/remove-modules-material.dto';

export class RemoveModulesMaterialCommand
  implements ICommand, RemoveModulesMaterialDTO
{
  where: RemoveModulesMaterialWhereDTO;
  constructor(data: RemoveModulesMaterialDTO) {
    this.where = data.where;
  }
}
