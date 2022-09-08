import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateAppStripeAccountDashboardLinkCommand } from '@/commands/implements/apps/create-app-stripe-account-dashboard-link.command';
import { CreateAppStripeAccountDashboardLinkDTO } from '@/dtos/apps/create-app-stripe-account-dashboard-link.dto';
import { LinkModel } from '@/models/link.model';

@Injectable()
export class CreateAppStripeAccountDashboardLinkService
  implements
    IBaseService<CreateAppStripeAccountDashboardLinkDTO, Promise<LinkModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateAppStripeAccountDashboardLinkDTO
  ): Promise<LinkModel> {
    return await this.commandBus.execute(
      new CreateAppStripeAccountDashboardLinkCommand(data)
    );
  }
}
