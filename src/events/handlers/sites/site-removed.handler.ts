import { SiteRemovedEvent } from '@/events/implements/sites/site-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(SiteRemovedEvent)
export class SiteRemovedHandler implements IEventHandler<SiteRemovedEvent> {
  async handle(event: SiteRemovedEvent) {
    const { site } = event;
    Logger.log(`#${site.id} - removed!`, SiteRemovedHandler.name);
    return event;
  }
}
