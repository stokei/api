import { PageRemovedEvent } from '@/events/implements/pages/page-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(PageRemovedEvent)
export class PageRemovedHandler implements IEventHandler<PageRemovedEvent> {
  async handle(event: PageRemovedEvent) {
    const { page } = event;
    Logger.log(`#${page.id} - removed!`, PageRemovedHandler.name);
    return event;
  }
}
