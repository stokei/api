import { ICommand } from '@nestjs/cqrs';

import {
  UpdateClassroomModuleDataDTO,
  UpdateClassroomModuleDTO,
  UpdateClassroomModuleWhereDTO
} from '@/dtos/classroom-module s/update-classroom-module .dto';

export class UpdateClassroomModuleCommand
  implements ICommand, UpdateClassroomModuleDTO
{
  data: UpdateClassroomModuleDataDTO;
  where: UpdateClassroomModuleWhereDTO;
  constructor(data: UpdateClassroomModuleDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
