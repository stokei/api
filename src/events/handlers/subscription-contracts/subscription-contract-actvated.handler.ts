import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SubscriptionContractActivatedEvent } from '@/events/implements/subscription-contracts/subscription-contract-activated.event';

@EventsHandler(SubscriptionContractActivatedEvent)
export class SubscriptionContractActivatedHandler
  implements IEventHandler<SubscriptionContractActivatedEvent>
{
  async handle(event: SubscriptionContractActivatedEvent) {
    const { subscriptionContract } = event;
    Logger.log(
      `#${subscriptionContract.id} - activated!`,
      SubscriptionContractActivatedHandler.name
    );
    return event;
  }
}
