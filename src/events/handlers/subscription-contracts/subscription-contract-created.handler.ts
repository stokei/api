import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SubscriptionContractCreatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-created.event';

@EventsHandler(SubscriptionContractCreatedEvent)
export class SubscriptionContractCreatedHandler
  implements IEventHandler<SubscriptionContractCreatedEvent>
{
  async handle(event: SubscriptionContractCreatedEvent) {
    const { subscriptionContract } = event;
    Logger.log(
      `#${subscriptionContract.id} - created!`,
      SubscriptionContractCreatedHandler.name
    );
    return event;
  }
}
