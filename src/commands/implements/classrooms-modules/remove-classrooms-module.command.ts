import { ICommand } from '@nestjs/cqrs';

import {
  RemoveClassroomsModuleDTO,
  RemoveClassroomsModuleWhereDTO
} from '@/dtos/classrooms-modules/remove-classrooms-module.dto';

export class RemoveClassroomsModuleCommand
  implements ICommand, RemoveClassroomsModuleDTO
{
  where: RemoveClassroomsModuleWhereDTO;
  constructor(data: RemoveClassroomsModuleDTO) {
    this.where = data.where;
  }
}
