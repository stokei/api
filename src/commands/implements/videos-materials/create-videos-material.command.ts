import { ICommand } from '@nestjs/cqrs';
import { CreateVideosMaterialDTO } from '@/dtos/videos-materials/create-videos-material.dto';

export class CreateVideosMaterialCommand
  implements ICommand, CreateVideosMaterialDTO
{
  name: string;
  parent: string;

  constructor(data: CreateVideosMaterialDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
