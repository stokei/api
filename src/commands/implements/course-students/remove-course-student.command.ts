import { ICommand } from '@nestjs/cqrs';

import {
  RemoveCourseStudentDTO,
  RemoveCourseStudentWhereDTO
} from '@/dtos/course-students/remove-course-student.dto';

export class RemoveCourseStudentCommand
  implements ICommand, RemoveCourseStudentDTO
{
  where: RemoveCourseStudentWhereDTO;
  constructor(data: RemoveCourseStudentDTO) {
    this.where = data.where;
  }
}
