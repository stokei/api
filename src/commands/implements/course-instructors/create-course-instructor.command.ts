import { ICommand } from '@nestjs/cqrs';

import { CreateCourseInstructorDTO } from '@/dtos/course-instructors/create-course-instructor.dto';

export class CreateCourseInstructorCommand
  implements ICommand, CreateCourseInstructorDTO
{
  name: string;
  course: string;
  createdBy: string;

  constructor(data: CreateCourseInstructorDTO) {
    this.name = data.name;
    this.course = data.course;
    this.createdBy = data.createdBy;
  }
}
