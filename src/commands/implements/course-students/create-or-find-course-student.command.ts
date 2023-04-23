import { ICommand } from '@nestjs/cqrs';

import { CreateOrFindCourseStudentDTO } from '@/dtos/course-students/create-or-find-course-student.dto';

export class CreateOrFindCourseStudentCommand
  implements ICommand, CreateOrFindCourseStudentDTO
{
  student: string;
  course: string;
  app: string;
  createdBy: string;

  constructor(data: CreateOrFindCourseStudentDTO) {
    this.student = data.student;
    this.course = data.course;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
