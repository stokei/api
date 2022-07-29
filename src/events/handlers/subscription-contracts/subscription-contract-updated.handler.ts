import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SubscriptionContractUpdatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-updated.event';

@EventsHandler(SubscriptionContractUpdatedEvent)
export class SubscriptionContractUpdatedHandler
  implements IEventHandler<SubscriptionContractUpdatedEvent>
{
  async handle(event: SubscriptionContractUpdatedEvent) {
    const { subscriptionContract } = event;
    Logger.log(
      `#${subscriptionContract.id} - updated!`,
      SubscriptionContractUpdatedHandler.name
    );
    return event;
  }
}
