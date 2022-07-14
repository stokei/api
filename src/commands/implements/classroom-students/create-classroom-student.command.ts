import { ICommand } from '@nestjs/cqrs';

import { CreateClassroomStudentDTO } from '@/dtos/classroom-students/create-classroom-student.dto';

export class CreateClassroomStudentCommand
  implements ICommand, CreateClassroomStudentDTO
{
  student: string;
  classroom: string;
  createdBy: string;

  constructor(data: CreateClassroomStudentDTO) {
    this.student = data.student;
    this.classroom = data.classroom;
    this.createdBy = data.createdBy;
  }
}
