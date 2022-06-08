import { MetatagUpdatedEvent } from '@/events/implements/metatags/metatag-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(MetatagUpdatedEvent)
export class MetatagUpdatedHandler
  implements IEventHandler<MetatagUpdatedEvent>
{
  async handle(event: MetatagUpdatedEvent) {
    const { metatag } = event;
    Logger.log(`#${metatag.id} - updated!`, MetatagUpdatedHandler.name);
    return event;
  }
}
