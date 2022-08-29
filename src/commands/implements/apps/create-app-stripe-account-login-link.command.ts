import { ICommand } from '@nestjs/cqrs';

import { CreateAppStripeAccountLoginLinkDTO } from '@/dtos/apps/create-app-stripe-account-login-link.dto';

export class CreateAppStripeAccountLoginLinkCommand
  implements ICommand, CreateAppStripeAccountLoginLinkDTO
{
  app: string;
  constructor(data: CreateAppStripeAccountLoginLinkDTO) {
    this.app = data.app;
  }
}
