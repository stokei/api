import { ICommand } from '@nestjs/cqrs';

import { CreateCourseStudentDTO } from '@/dtos/course-students/create-course-student.dto';

export class CreateCourseStudentCommand
  implements ICommand, CreateCourseStudentDTO
{
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreateCourseStudentDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
