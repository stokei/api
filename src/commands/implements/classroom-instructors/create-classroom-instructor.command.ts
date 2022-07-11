import { ICommand } from '@nestjs/cqrs';

import { CreateClassroomInstructorDTO } from '@/dtos/classroom-instructors/create-classroom-instructor.dto';

export class CreateClassroomInstructorCommand
  implements ICommand, CreateClassroomInstructorDTO
{
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreateClassroomInstructorDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
