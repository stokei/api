import { ICommand } from '@nestjs/cqrs';

import { CreateAppInstructorDTO } from '@/dtos/app-instructors/create-app-instructor.dto';

export class CreateAppInstructorCommand
  implements ICommand, CreateAppInstructorDTO
{
  instructor: string;
  app: string;
  createdBy: string;

  constructor(data: CreateAppInstructorDTO) {
    this.instructor = data.instructor;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
