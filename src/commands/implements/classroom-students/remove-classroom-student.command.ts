import { ICommand } from '@nestjs/cqrs';

import {
  RemoveClassroomStudentDTO,
  RemoveClassroomStudentWhereDTO
} from '@/dtos/classroom-students/remove-classroom-student.dto';

export class RemoveClassroomStudentCommand
  implements ICommand, RemoveClassroomStudentDTO
{
  where: RemoveClassroomStudentWhereDTO;
  constructor(data: RemoveClassroomStudentDTO) {
    this.where = data.where;
  }
}
