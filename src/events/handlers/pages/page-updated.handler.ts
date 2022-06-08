import { PageUpdatedEvent } from '@/events/implements/pages/page-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(PageUpdatedEvent)
export class PageUpdatedHandler implements IEventHandler<PageUpdatedEvent> {
  async handle(event: PageUpdatedEvent) {
    const { page } = event;
    Logger.log(`#${page.id} - updated!`, PageUpdatedHandler.name);
    return event;
  }
}
