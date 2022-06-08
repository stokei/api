import { ICommand } from '@nestjs/cqrs';
import { CreateCartDTO } from '@/dtos/carts/create-cart.dto';

export class CreateCartCommand implements ICommand, CreateCartDTO {
  name: string;
  parent: string;

  constructor(data: CreateCartDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
