import { ICommand } from '@nestjs/cqrs';

import { CreateClassroomModuleDTO } from '@/dtos/classroom-modules/create-classroom-module.dto';

export class CreateClassroomModuleCommand
  implements ICommand, CreateClassroomModuleDTO
{
  name: string;
  classroom: string;
  createdBy: string;

  constructor(data: CreateClassroomModuleDTO) {
    this.name = data.name;
    this.classroom = data.classroom;
    this.createdBy = data.createdBy;
  }
}
