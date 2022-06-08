import { ICommand } from '@nestjs/cqrs';
import { CreateClassroomsModuleDTO } from '@/dtos/classrooms-modules/create-classrooms-module.dto';

export class CreateClassroomsModuleCommand
  implements ICommand, CreateClassroomsModuleDTO
{
  name: string;
  parent: string;

  constructor(data: CreateClassroomsModuleDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
