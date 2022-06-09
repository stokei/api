import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SiteRemovedEvent } from '@/events/implements/sites/site-removed.event';

@EventsHandler(SiteRemovedEvent)
export class SiteRemovedHandler implements IEventHandler<SiteRemovedEvent> {
  async handle(event: SiteRemovedEvent) {
    const { site } = event;
    Logger.log(`#${site.id} - removed!`, SiteRemovedHandler.name);
    return event;
  }
}
