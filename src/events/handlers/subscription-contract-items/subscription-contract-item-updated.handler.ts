import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SubscriptionContractItemUpdatedEvent } from '@/events/implements/subscription-contract-items/subscription-contract-item-updated.event';

@EventsHandler(SubscriptionContractItemUpdatedEvent)
export class SubscriptionContractItemUpdatedHandler
  implements IEventHandler<SubscriptionContractItemUpdatedEvent>
{
  async handle(event: SubscriptionContractItemUpdatedEvent) {
    const { subscriptionContractItem } = event;
    Logger.log(
      `#${subscriptionContractItem.id} - updated!`,
      SubscriptionContractItemUpdatedHandler.name
    );
    return event;
  }
}
