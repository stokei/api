import { ICommand } from '@nestjs/cqrs';

import { CreateClassroomStudentDTO } from '@/dtos/classroom-students/create-classroom-student.dto';

export class CreateClassroomStudentCommand
  implements ICommand, CreateClassroomStudentDTO
{
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreateClassroomStudentDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
