import { ICommand } from '@nestjs/cqrs';

import { CreateCourseStudentDTO } from '@/dtos/course-students/create-course-student.dto';

export class CreateCourseStudentCommand
  implements ICommand, CreateCourseStudentDTO
{
  student: string;
  course: string;
  createdBy: string;

  constructor(data: CreateCourseStudentDTO) {
    this.student = data.student;
    this.course = data.course;
    this.createdBy = data.createdBy;
  }
}
