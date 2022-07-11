import { ICommand } from '@nestjs/cqrs';

import {
  UpdateCourseStudentDataDTO,
  UpdateCourseStudentDTO,
  UpdateCourseStudentWhereDTO
} from '@/dtos/course-students/update-course-student.dto';

export class UpdateCourseStudentCommand
  implements ICommand, UpdateCourseStudentDTO
{
  data: UpdateCourseStudentDataDTO;
  where: UpdateCourseStudentWhereDTO;
  constructor(data: UpdateCourseStudentDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
