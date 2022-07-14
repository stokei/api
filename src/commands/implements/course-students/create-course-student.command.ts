import { ICommand } from '@nestjs/cqrs';

import { CreateCourseStudentDTO } from '@/dtos/course-students/create-course-student.dto';

export class CreateCourseStudentCommand
  implements ICommand, CreateCourseStudentDTO
{
  name: string;
  course: string;
  createdBy: string;

  constructor(data: CreateCourseStudentDTO) {
    this.name = data.name;
    this.course = data.course;
    this.createdBy = data.createdBy;
  }
}
