import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { RecurringCreatedEvent } from '@/events/implements/recurrings/recurring-created.event';

@EventsHandler(RecurringCreatedEvent)
export class RecurringCreatedHandler
  implements IEventHandler<RecurringCreatedEvent>
{
  async handle(event: RecurringCreatedEvent) {
    const { recurring } = event;
    Logger.log(`#${recurring.id} - created!`, RecurringCreatedHandler.name);
    return event;
  }
}
