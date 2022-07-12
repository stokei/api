import { ICommand } from '@nestjs/cqrs';

import { CreateCartDTO } from '@/dtos/carts/create-cart.dto';

export class CreateCartCommand implements ICommand, CreateCartDTO {
  createdBy: string;

  constructor(data: CreateCartDTO) {
    this.createdBy = data.createdBy;
  }
}
