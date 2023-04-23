import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SubscriptionContractCanceledEvent } from '@/events/implements/subscription-contracts/subscription-contract-canceled.event';

@EventsHandler(SubscriptionContractCanceledEvent)
export class SubscriptionContractCanceledHandler
  implements IEventHandler<SubscriptionContractCanceledEvent>
{
  async handle(event: SubscriptionContractCanceledEvent) {
    const { subscriptionContract } = event;
    Logger.log(
      `#${subscriptionContract.id} - canceled!`,
      SubscriptionContractCanceledHandler.name
    );
    return event;
  }
}
