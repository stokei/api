import { ICommand } from '@nestjs/cqrs';
import { CreateCardDTO } from '@/dtos/cards/create-card.dto';

export class CreateCardCommand implements ICommand, CreateCardDTO {
  name: string;
  parent: string;

  constructor(data: CreateCardDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
