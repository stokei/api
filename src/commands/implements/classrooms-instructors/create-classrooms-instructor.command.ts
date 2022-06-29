import { ICommand } from '@nestjs/cqrs';

import { CreateClassroomsInstructorDTO } from '@/dtos/classrooms-instructors/create-classrooms-instructor.dto';

export class CreateClassroomsInstructorCommand
  implements ICommand, CreateClassroomsInstructorDTO
{
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreateClassroomsInstructorDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
