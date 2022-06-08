import { ICommand } from '@nestjs/cqrs';
import { CreateColorDTO } from '@/dtos/colors/create-color.dto';

export class CreateColorCommand implements ICommand, CreateColorDTO {
  name: string;
  parent: string;

  constructor(data: CreateColorDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
