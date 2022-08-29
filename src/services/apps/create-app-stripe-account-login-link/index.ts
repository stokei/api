import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateAppStripeAccountLoginLinkCommand } from '@/commands/implements/apps/create-app-stripe-account-login-link.command';
import { CreateAppStripeAccountLoginLinkDTO } from '@/dtos/apps/create-app-stripe-account-login-link.dto';
import { LinkModel } from '@/models/link.model';

@Injectable()
export class CreateAppStripeAccountLoginLinkService
  implements
    IBaseService<CreateAppStripeAccountLoginLinkDTO, Promise<LinkModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateAppStripeAccountLoginLinkDTO): Promise<LinkModel> {
    return await this.commandBus.execute(
      new CreateAppStripeAccountLoginLinkCommand(data)
    );
  }
}
