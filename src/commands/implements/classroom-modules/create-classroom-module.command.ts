import { ICommand } from '@nestjs/cqrs';

import { CreateClassroomModuleDTO } from '@/dtos/classroom-modules/create-classroom-module.dto';

export class CreateClassroomModuleCommand
  implements ICommand, CreateClassroomModuleDTO
{
  classroom: string;
  module: string;
  app: string;
  createdBy: string;

  constructor(data: CreateClassroomModuleDTO) {
    this.module = data.module;
    this.classroom = data.classroom;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
