import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SiteUpdatedEvent } from '@/events/implements/sites/site-updated.event';

@EventsHandler(SiteUpdatedEvent)
export class SiteUpdatedHandler implements IEventHandler<SiteUpdatedEvent> {
  async handle(event: SiteUpdatedEvent) {
    const { site } = event;
    Logger.log(`#${site.id} - updated!`, SiteUpdatedHandler.name);
    return event;
  }
}
