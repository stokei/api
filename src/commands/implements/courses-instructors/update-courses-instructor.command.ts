import { ICommand } from '@nestjs/cqrs';
import {
  UpdateCoursesInstructorDTO,
  UpdateCoursesInstructorDataDTO,
  UpdateCoursesInstructorWhereDTO
} from '@/dtos/courses-instructors/update-courses-instructor.dto';

export class UpdateCoursesInstructorCommand
  implements ICommand, UpdateCoursesInstructorDTO
{
  data: UpdateCoursesInstructorDataDTO;
  where: UpdateCoursesInstructorWhereDTO;
  constructor(data: UpdateCoursesInstructorDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
