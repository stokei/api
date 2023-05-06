import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SubscriptionContractCreatedByAdminEvent } from '@/events/implements/subscription-contracts/subscription-contract-created-by-admin.event';

@EventsHandler(SubscriptionContractCreatedByAdminEvent)
export class SubscriptionContractCreatedByAdminHandler
  implements IEventHandler<SubscriptionContractCreatedByAdminEvent>
{
  async handle(event: SubscriptionContractCreatedByAdminEvent) {
    const { subscriptionContract } = event;
    Logger.log(
      `#${subscriptionContract.id} - created by admin!`,
      SubscriptionContractCreatedByAdminHandler.name
    );
    return event;
  }
}
