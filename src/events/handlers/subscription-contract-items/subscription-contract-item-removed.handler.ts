import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SubscriptionContractItemRemovedEvent } from '@/events/implements/subscription-contract-items/subscription-contract-item-removed.event';

@EventsHandler(SubscriptionContractItemRemovedEvent)
export class SubscriptionContractItemRemovedHandler
  implements IEventHandler<SubscriptionContractItemRemovedEvent>
{
  async handle(event: SubscriptionContractItemRemovedEvent) {
    const { subscriptionContractItem } = event;
    Logger.log(
      `#${subscriptionContractItem.id} - removed!`,
      SubscriptionContractItemRemovedHandler.name
    );
    return event;
  }
}
