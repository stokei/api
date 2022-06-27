import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateSubscriptionCommand } from '@/commands/implements/subscriptions/update-subscription.command';
import { UpdateSubscriptionDTO } from '@/dtos/subscriptions/update-subscription.dto';
import { SubscriptionModel } from '@/models/subscription.model';

@Injectable()
export class UpdateSubscriptionService
  implements IBaseService<UpdateSubscriptionDTO, Promise<SubscriptionModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateSubscriptionDTO): Promise<SubscriptionModel> {
    return await this.commandBus.execute(new UpdateSubscriptionCommand(data));
  }
}
