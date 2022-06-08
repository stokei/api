import { ICommand } from '@nestjs/cqrs';
import {
  RemoveCoursesStudentDTO,
  RemoveCoursesStudentWhereDTO
} from '@/dtos/courses-students/remove-courses-student.dto';

export class RemoveCoursesStudentCommand
  implements ICommand, RemoveCoursesStudentDTO
{
  where: RemoveCoursesStudentWhereDTO;
  constructor(data: RemoveCoursesStudentDTO) {
    this.where = data.where;
  }
}
