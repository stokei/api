import { ICommand } from '@nestjs/cqrs';
import { CreateClassroomsStudentDTO } from '@/dtos/classrooms-students/create-classrooms-student.dto';

export class CreateClassroomsStudentCommand
  implements ICommand, CreateClassroomsStudentDTO
{
  name: string;
  parent: string;

  constructor(data: CreateClassroomsStudentDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
