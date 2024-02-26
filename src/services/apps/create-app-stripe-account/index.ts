import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateAppStripeAccountCommand } from '@/commands/implements/apps/create-app-stripe-account.command';
import { CreateAppStripeAccountDTO } from '@/dtos/apps/create-app-stripe-account.dto';
import { AppModel } from '@/models/app.model';

@Injectable()
export class CreateAppStripeAccountService
  implements IBaseService<CreateAppStripeAccountDTO, Promise<AppModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateAppStripeAccountDTO): Promise<AppModel> {
    return await this.commandBus.execute(
      new CreateAppStripeAccountCommand(data)
    );
  }
}
