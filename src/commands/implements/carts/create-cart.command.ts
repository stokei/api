import { ICommand } from '@nestjs/cqrs';

import { CreateCartDTO } from '@/dtos/carts/create-cart.dto';

export class CreateCartCommand implements ICommand, CreateCartDTO {
  app: string;
  createdBy: string;

  constructor(data: CreateCartDTO) {
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
