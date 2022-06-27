import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SubscriptionCreatedEvent } from '@/events/implements/subscriptions/subscription-created.event';

@EventsHandler(SubscriptionCreatedEvent)
export class SubscriptionCreatedHandler
  implements IEventHandler<SubscriptionCreatedEvent>
{
  async handle(event: SubscriptionCreatedEvent) {
    const { subscription } = event;
    Logger.log(
      `#${subscription.id} - created!`,
      SubscriptionCreatedHandler.name
    );
    return event;
  }
}
