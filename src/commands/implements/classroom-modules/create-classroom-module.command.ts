import { ICommand } from '@nestjs/cqrs';

import { CreateClassroomModuleDTO } from '@/dtos/classroom-modules/create-classroom-module.dto';

export class CreateClassroomModuleCommand
  implements ICommand, CreateClassroomModuleDTO
{
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreateClassroomModuleDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
