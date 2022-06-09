import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PageUpdatedEvent } from '@/events/implements/pages/page-updated.event';

@EventsHandler(PageUpdatedEvent)
export class PageUpdatedHandler implements IEventHandler<PageUpdatedEvent> {
  async handle(event: PageUpdatedEvent) {
    const { page } = event;
    Logger.log(`#${page.id} - updated!`, PageUpdatedHandler.name);
    return event;
  }
}
