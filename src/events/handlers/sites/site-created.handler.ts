import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SiteCreatedEvent } from '@/events/implements/sites/site-created.event';

@EventsHandler(SiteCreatedEvent)
export class SiteCreatedHandler implements IEventHandler<SiteCreatedEvent> {
  async handle(event: SiteCreatedEvent) {
    const { site } = event;
    Logger.log(`#${site.id} - created!`, SiteCreatedHandler.name);
    return event;
  }
}
