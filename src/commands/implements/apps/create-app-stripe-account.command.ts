import { ICommand } from '@nestjs/cqrs';

import { CreateAppStripeAccountDTO } from '@/dtos/apps/create-app-stripe-account.dto';

export class CreateAppStripeAccountCommand
  implements ICommand, CreateAppStripeAccountDTO
{
  app: string;
  createdBy: string;
  constructor(data: CreateAppStripeAccountDTO) {
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
