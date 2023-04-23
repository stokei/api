import { ICommand } from '@nestjs/cqrs';

import { UpdateAccountStripeCustomerDTO } from '@/dtos/accounts/update-account-stripe-customer.dto';

export class UpdateAccountStripeCustomerCommand
  implements ICommand, UpdateAccountStripeCustomerDTO
{
  app: string;
  account: string;

  constructor(data: UpdateAccountStripeCustomerDTO) {
    this.app = data.app;
    this.account = data.account;
  }
}
