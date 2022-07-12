import { ICommand } from '@nestjs/cqrs';

import {
  RemoveClassroomModuleDTO,
  RemoveClassroomModuleWhereDTO
} from '@/dtos/classroom-modules/remove-classroom-module.dto';

export class RemoveClassroomModuleCommand
  implements ICommand, RemoveClassroomModuleDTO
{
  where: RemoveClassroomModuleWhereDTO;
  constructor(data: RemoveClassroomModuleDTO) {
    this.where = data.where;
  }
}
