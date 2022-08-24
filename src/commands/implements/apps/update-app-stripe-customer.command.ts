import { ICommand } from '@nestjs/cqrs';

import { UpdateAppStripeCustomerDTO } from '@/dtos/apps/update-app-stripe-customer.dto';

export class UpdateAppStripeCustomerCommand
  implements ICommand, UpdateAppStripeCustomerDTO
{
  app: string;

  constructor(data: UpdateAppStripeCustomerDTO) {
    this.app = data.app;
  }
}
