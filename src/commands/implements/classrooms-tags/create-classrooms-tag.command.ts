import { ICommand } from '@nestjs/cqrs';
import { CreateClassroomsTagDTO } from '@/dtos/classrooms-tags/create-classrooms-tag.dto';

export class CreateClassroomsTagCommand
  implements ICommand, CreateClassroomsTagDTO
{
  name: string;
  parent: string;

  constructor(data: CreateClassroomsTagDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
