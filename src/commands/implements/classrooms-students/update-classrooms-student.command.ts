import { ICommand } from '@nestjs/cqrs';

import {
  UpdateClassroomsStudentDataDTO,
  UpdateClassroomsStudentDTO,
  UpdateClassroomsStudentWhereDTO
} from '@/dtos/classrooms-students/update-classrooms-student.dto';

export class UpdateClassroomsStudentCommand
  implements ICommand, UpdateClassroomsStudentDTO
{
  data: UpdateClassroomsStudentDataDTO;
  where: UpdateClassroomsStudentWhereDTO;
  constructor(data: UpdateClassroomsStudentDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
