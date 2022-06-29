import { ICommand } from '@nestjs/cqrs';

import { CreatePaymentsMethodDTO } from '@/dtos/payments-methods/create-payments-method.dto';

export class CreatePaymentsMethodCommand
  implements ICommand, CreatePaymentsMethodDTO
{
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreatePaymentsMethodDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
