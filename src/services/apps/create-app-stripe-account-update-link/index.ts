import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateAppStripeAccountUpdateLinkCommand } from '@/commands/implements/apps/create-app-stripe-account-update-link.command';
import { CreateAppStripeAccountUpdateLinkDTO } from '@/dtos/apps/create-app-stripe-account-update-link.dto';
import { LinkModel } from '@/models/link.model';

@Injectable()
export class CreateAppStripeAccountUpdateLinkService
  implements
    IBaseService<CreateAppStripeAccountUpdateLinkDTO, Promise<LinkModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateAppStripeAccountUpdateLinkDTO): Promise<LinkModel> {
    return await this.commandBus.execute(
      new CreateAppStripeAccountUpdateLinkCommand(data)
    );
  }
}
