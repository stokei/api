import { ICommand } from '@nestjs/cqrs';
import {
  RemoveCoursesInstructorDTO,
  RemoveCoursesInstructorWhereDTO
} from '@/dtos/courses-instructors/remove-courses-instructor.dto';

export class RemoveCoursesInstructorCommand
  implements ICommand, RemoveCoursesInstructorDTO
{
  where: RemoveCoursesInstructorWhereDTO;
  constructor(data: RemoveCoursesInstructorDTO) {
    this.where = data.where;
  }
}
