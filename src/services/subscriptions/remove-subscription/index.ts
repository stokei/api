import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveSubscriptionCommand } from '@/commands/implements/subscriptions/remove-subscription.command';
import { RemoveSubscriptionDTO } from '@/dtos/subscriptions/remove-subscription.dto';
import { SubscriptionModel } from '@/models/subscription.model';

@Injectable()
export class RemoveSubscriptionService
  implements IBaseService<RemoveSubscriptionDTO, Promise<SubscriptionModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveSubscriptionDTO): Promise<SubscriptionModel> {
    return await this.commandBus.execute(new RemoveSubscriptionCommand(data));
  }
}
