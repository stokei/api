import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SubscriptionContractExpiredEvent } from '@/events/implements/subscription-contracts/subscription-contract-expired.event';

@EventsHandler(SubscriptionContractExpiredEvent)
export class SubscriptionContractExpiredHandler
  implements IEventHandler<SubscriptionContractExpiredEvent>
{
  async handle(event: SubscriptionContractExpiredEvent) {
    const { subscriptionContract } = event;
    Logger.log(
      `#${subscriptionContract.id} - expired!`,
      SubscriptionContractExpiredHandler.name
    );
    return event;
  }
}
