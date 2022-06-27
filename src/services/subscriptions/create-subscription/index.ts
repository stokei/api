import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateSubscriptionCommand } from '@/commands/implements/subscriptions/create-subscription.command';
import { CreateSubscriptionDTO } from '@/dtos/subscriptions/create-subscription.dto';
import { SubscriptionModel } from '@/models/subscription.model';

@Injectable()
export class CreateSubscriptionService
  implements IBaseService<CreateSubscriptionDTO, Promise<SubscriptionModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateSubscriptionDTO): Promise<SubscriptionModel> {
    return await this.commandBus.execute(new CreateSubscriptionCommand(data));
  }
}
