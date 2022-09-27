import { ICommand } from '@nestjs/cqrs';

import {
  DeactivateClassroomDTO,
  DeactivateClassroomWhereDTO
} from '@/dtos/classrooms/deactivate-classroom.dto';

export class DeactivateClassroomCommand
  implements ICommand, DeactivateClassroomDTO
{
  where: DeactivateClassroomWhereDTO;
  constructor(data: DeactivateClassroomDTO) {
    this.where = data.where;
  }
}
