import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SubscriptionContractItemCreatedEvent } from '@/events/implements/subscription-contract-items/subscription-contract-item-created.event';

@EventsHandler(SubscriptionContractItemCreatedEvent)
export class SubscriptionContractItemCreatedHandler
  implements IEventHandler<SubscriptionContractItemCreatedEvent>
{
  async handle(event: SubscriptionContractItemCreatedEvent) {
    const { subscriptionContractItem } = event;
    Logger.log(
      `#${subscriptionContractItem.id} - created!`,
      SubscriptionContractItemCreatedHandler.name
    );
    return event;
  }
}
