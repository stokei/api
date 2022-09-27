import { ICommand } from '@nestjs/cqrs';

import {
  ActivateClassroomDTO,
  ActivateClassroomWhereDTO
} from '@/dtos/classrooms/activate-classroom.dto';

export class ActivateClassroomCommand
  implements ICommand, ActivateClassroomDTO
{
  where: ActivateClassroomWhereDTO;
  constructor(data: ActivateClassroomDTO) {
    this.where = data.where;
  }
}
