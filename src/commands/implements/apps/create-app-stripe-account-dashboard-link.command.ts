import { ICommand } from '@nestjs/cqrs';

import { CreateAppStripeAccountDashboardLinkDTO } from '@/dtos/apps/create-app-stripe-account-dashboard-link.dto';

export class CreateAppStripeAccountDashboardLinkCommand
  implements ICommand, CreateAppStripeAccountDashboardLinkDTO
{
  app: string;
  constructor(data: CreateAppStripeAccountDashboardLinkDTO) {
    this.app = data.app;
  }
}
