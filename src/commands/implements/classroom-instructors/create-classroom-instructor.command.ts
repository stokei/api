import { ICommand } from '@nestjs/cqrs';

import { CreateClassroomInstructorDTO } from '@/dtos/classroom-instructors/create-classroom-instructor.dto';

export class CreateClassroomInstructorCommand
  implements ICommand, CreateClassroomInstructorDTO
{
  instructor: string;
  classroom: string;
  app: string;
  createdBy: string;

  constructor(data: CreateClassroomInstructorDTO) {
    this.instructor = data.instructor;
    this.classroom = data.classroom;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
