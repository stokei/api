import { ICommand } from '@nestjs/cqrs';

import { CreateCoursesInstructorDTO } from '@/dtos/courses-instructors/create-courses-instructor.dto';

export class CreateCoursesInstructorCommand
  implements ICommand, CreateCoursesInstructorDTO
{
  name: string;
  parent: string;

  constructor(data: CreateCoursesInstructorDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
