import { ICommand } from '@nestjs/cqrs';

import {
  UpdateClassroomsModuleDataDTO,
  UpdateClassroomsModuleDTO,
  UpdateClassroomsModuleWhereDTO
} from '@/dtos/classrooms-modules/update-classrooms-module.dto';

export class UpdateClassroomsModuleCommand
  implements ICommand, UpdateClassroomsModuleDTO
{
  data: UpdateClassroomsModuleDataDTO;
  where: UpdateClassroomsModuleWhereDTO;
  constructor(data: UpdateClassroomsModuleDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
