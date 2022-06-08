import { PageCreatedEvent } from '@/events/implements/pages/page-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(PageCreatedEvent)
export class PageCreatedHandler implements IEventHandler<PageCreatedEvent> {
  async handle(event: PageCreatedEvent) {
    const { page } = event;
    Logger.log(`#${page.id} - created!`, PageCreatedHandler.name);
    return event;
  }
}
