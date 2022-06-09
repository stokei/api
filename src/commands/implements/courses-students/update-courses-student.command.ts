import { ICommand } from '@nestjs/cqrs';

import {
  UpdateCoursesStudentDataDTO,
  UpdateCoursesStudentDTO,
  UpdateCoursesStudentWhereDTO
} from '@/dtos/courses-students/update-courses-student.dto';

export class UpdateCoursesStudentCommand
  implements ICommand, UpdateCoursesStudentDTO
{
  data: UpdateCoursesStudentDataDTO;
  where: UpdateCoursesStudentWhereDTO;
  constructor(data: UpdateCoursesStudentDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
