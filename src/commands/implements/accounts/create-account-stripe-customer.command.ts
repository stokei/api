import { ICommand } from '@nestjs/cqrs';

import { CreateAccountStripeCustomerDTO } from '@/dtos/accounts/create-account-stripe-customer.dto';

export class CreateAccountStripeCustomerCommand
  implements ICommand, CreateAccountStripeCustomerDTO
{
  app: string;
  account: string;
  createdBy: string;

  constructor(data: CreateAccountStripeCustomerDTO) {
    this.app = data.app;
    this.account = data.account;
    this.createdBy = data.createdBy;
  }
}
