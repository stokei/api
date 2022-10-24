import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { RecurringRemovedEvent } from '@/events/implements/recurrings/recurring-removed.event';

@EventsHandler(RecurringRemovedEvent)
export class RecurringRemovedHandler
  implements IEventHandler<RecurringRemovedEvent>
{
  async handle(event: RecurringRemovedEvent) {
    const { recurring } = event;
    Logger.log(`#${recurring.id} - removed!`, RecurringRemovedHandler.name);
    return event;
  }
}
