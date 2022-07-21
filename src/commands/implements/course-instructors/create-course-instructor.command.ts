import { ICommand } from '@nestjs/cqrs';

import { CreateCourseInstructorDTO } from '@/dtos/course-instructors/create-course-instructor.dto';

export class CreateCourseInstructorCommand
  implements ICommand, CreateCourseInstructorDTO
{
  instructor: string;
  course: string;
  createdBy: string;

  constructor(data: CreateCourseInstructorDTO) {
    this.instructor = data.instructor;
    this.course = data.course;
    this.createdBy = data.createdBy;
  }
}
