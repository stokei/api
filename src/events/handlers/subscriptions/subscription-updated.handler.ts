import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SubscriptionUpdatedEvent } from '@/events/implements/subscriptions/subscription-updated.event';

@EventsHandler(SubscriptionUpdatedEvent)
export class SubscriptionUpdatedHandler
  implements IEventHandler<SubscriptionUpdatedEvent>
{
  async handle(event: SubscriptionUpdatedEvent) {
    const { subscription } = event;
    Logger.log(
      `#${subscription.id} - updated!`,
      SubscriptionUpdatedHandler.name
    );
    return event;
  }
}
