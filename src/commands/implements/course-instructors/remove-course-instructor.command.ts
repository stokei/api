import { ICommand } from '@nestjs/cqrs';

import {
  RemoveCourseInstructorDTO,
  RemoveCourseInstructorWhereDTO
} from '@/dtos/course-instructors/remove-course-instructor.dto';

export class RemoveCourseInstructorCommand
  implements ICommand, RemoveCourseInstructorDTO
{
  where: RemoveCourseInstructorWhereDTO;
  constructor(data: RemoveCourseInstructorDTO) {
    this.where = data.where;
  }
}
