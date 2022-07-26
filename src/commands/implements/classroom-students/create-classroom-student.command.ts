import { ICommand } from '@nestjs/cqrs';

import { CreateClassroomStudentDTO } from '@/dtos/classroom-students/create-classroom-student.dto';

export class CreateClassroomStudentCommand
  implements ICommand, CreateClassroomStudentDTO
{
  student: string;
  classroom: string;
  app: string;
  createdBy: string;

  constructor(data: CreateClassroomStudentDTO) {
    this.student = data.student;
    this.classroom = data.classroom;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
