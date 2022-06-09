import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { MetatagRemovedEvent } from '@/events/implements/metatags/metatag-removed.event';

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
