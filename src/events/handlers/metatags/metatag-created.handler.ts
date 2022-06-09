import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { MetatagCreatedEvent } from '@/events/implements/metatags/metatag-created.event';

@EventsHandler(MetatagCreatedEvent)
export class MetatagCreatedHandler
  implements IEventHandler<MetatagCreatedEvent>
{
  async handle(event: MetatagCreatedEvent) {
    const { metatag } = event;
    Logger.log(`#${metatag.id} - created!`, MetatagCreatedHandler.name);
    return event;
  }
}
