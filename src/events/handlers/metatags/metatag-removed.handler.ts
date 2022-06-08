import { MetatagRemovedEvent } from '@/events/implements/metatags/metatag-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(MetatagRemovedEvent)
export class MetatagRemovedHandler
  implements IEventHandler<MetatagRemovedEvent>
{
  async handle(event: MetatagRemovedEvent) {
    const { metatag } = event;
    Logger.log(`#${metatag.id} - removed!`, MetatagRemovedHandler.name);
    return event;
  }
}
