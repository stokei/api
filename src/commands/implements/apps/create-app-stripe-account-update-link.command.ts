import { ICommand } from '@nestjs/cqrs';

import { CreateAppStripeAccountUpdateLinkDTO } from '@/dtos/apps/create-app-stripe-account-update-link.dto';

export class CreateAppStripeAccountUpdateLinkCommand
  implements ICommand, CreateAppStripeAccountUpdateLinkDTO
{
  app: string;
  constructor(data: CreateAppStripeAccountUpdateLinkDTO) {
    this.app = data.app;
  }
}
