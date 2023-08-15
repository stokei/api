import { ICommand } from '@nestjs/cqrs';

import { CreatePaymentDTO } from '@/dtos/payments/create-payment.dto';

export class CreatePaymentCommand implements ICommand, CreatePaymentDTO {
  name: string;
  parent: string;
  description?: string;
  app: string;
  createdBy: string;

  constructor(data: CreatePaymentDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.description = data.description;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
