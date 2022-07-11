import { ICommand } from '@nestjs/cqrs';

import { CreateCourseInstructorDTO } from '@/dtos/course-instructors/create-course-instructor.dto';

export class CreateCourseInstructorCommand
  implements ICommand, CreateCourseInstructorDTO
{
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreateCourseInstructorDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
