import { SiteCreatedEvent } from '@/events/implements/sites/site-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(SiteCreatedEvent)
export class SiteCreatedHandler implements IEventHandler<SiteCreatedEvent> {
  async handle(event: SiteCreatedEvent) {
    const { site } = event;
    Logger.log(`#${site.id} - created!`, SiteCreatedHandler.name);
    return event;
  }
}
