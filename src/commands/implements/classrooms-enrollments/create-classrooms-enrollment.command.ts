import { ICommand } from '@nestjs/cqrs';

import { CreateClassroomsEnrollmentDTO } from '@/dtos/classrooms-enrollments/create-classrooms-enrollment.dto';

export class CreateClassroomsEnrollmentCommand
  implements ICommand, CreateClassroomsEnrollmentDTO
{
  name: string;
  parent: string;

  constructor(data: CreateClassroomsEnrollmentDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
