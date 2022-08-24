import { ICommand } from '@nestjs/cqrs';

import { CreateAppStripeCustomerDTO } from '@/dtos/apps/create-app-stripe-customer.dto';

export class CreateAppStripeCustomerCommand
  implements ICommand, CreateAppStripeCustomerDTO
{
  app: string;
  createdBy: string;

  constructor(data: CreateAppStripeCustomerDTO) {
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
