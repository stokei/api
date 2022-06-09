import { ICommand } from '@nestjs/cqrs';

import { CreateClassroomsMaterialDTO } from '@/dtos/classrooms-materials/create-classrooms-material.dto';

export class CreateClassroomsMaterialCommand
  implements ICommand, CreateClassroomsMaterialDTO
{
  name: string;
  parent: string;

  constructor(data: CreateClassroomsMaterialDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
