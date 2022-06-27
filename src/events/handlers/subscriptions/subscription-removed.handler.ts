import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SubscriptionRemovedEvent } from '@/events/implements/subscriptions/subscription-removed.event';

@EventsHandler(SubscriptionRemovedEvent)
export class SubscriptionRemovedHandler
  implements IEventHandler<SubscriptionRemovedEvent>
{
  async handle(event: SubscriptionRemovedEvent) {
    const { subscription } = event;
    Logger.log(
      `#${subscription.id} - removed!`,
      SubscriptionRemovedHandler.name
    );
    return event;
  }
}
