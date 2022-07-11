import { ICommand } from '@nestjs/cqrs';

import {
  UpdateClassroomStudentDataDTO,
  UpdateClassroomStudentDTO,
  UpdateClassroomStudentWhereDTO
} from '@/dtos/classroom-students/update-classroom-student.dto';

export class UpdateClassroomStudentCommand
  implements ICommand, UpdateClassroomStudentDTO
{
  data: UpdateClassroomStudentDataDTO;
  where: UpdateClassroomStudentWhereDTO;
  constructor(data: UpdateClassroomStudentDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
