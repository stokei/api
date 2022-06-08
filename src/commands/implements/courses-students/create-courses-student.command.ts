import { ICommand } from '@nestjs/cqrs';
import { CreateCoursesStudentDTO } from '@/dtos/courses-students/create-courses-student.dto';

export class CreateCoursesStudentCommand
  implements ICommand, CreateCoursesStudentDTO
{
  name: string;
  parent: string;

  constructor(data: CreateCoursesStudentDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
