import { SiteUpdatedEvent } from '@/events/implements/sites/site-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(SiteUpdatedEvent)
export class SiteUpdatedHandler implements IEventHandler<SiteUpdatedEvent> {
  async handle(event: SiteUpdatedEvent) {
    const { site } = event;
    Logger.log(`#${site.id} - updated!`, SiteUpdatedHandler.name);
    return event;
  }
}
