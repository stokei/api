import { ICommand } from '@nestjs/cqrs';

import {
  UpdateCourseInstructorDataDTO,
  UpdateCourseInstructorDTO,
  UpdateCourseInstructorWhereDTO
} from '@/dtos/course-instructors/update-course-instructor.dto';

export class UpdateCourseInstructorCommand
  implements ICommand, UpdateCourseInstructorDTO
{
  data: UpdateCourseInstructorDataDTO;
  where: UpdateCourseInstructorWhereDTO;
  constructor(data: UpdateCourseInstructorDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
