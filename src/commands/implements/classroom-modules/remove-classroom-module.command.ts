import { ICommand } from '@nestjs/cqrs';

import {
  RemoveClassroomModuleDTO,
  RemoveClassroomModuleWhereDTO
} from '@/dtos/classroom-module s/remove-classroom-module .dto';

export class RemoveClassroomModuleCommand
  implements ICommand, RemoveClassroomModuleDTO
{
  where: RemoveClassroomModuleWhereDTO;
  constructor(data: RemoveClassroomModuleDTO) {
    this.where = data.where;
  }
}
