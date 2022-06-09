import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { TagCreatedEvent } from '@/events/implements/tags/tag-created.event';

@EventsHandler(TagCreatedEvent)
export class TagCreatedHandler implements IEventHandler<TagCreatedEvent> {
  async handle(event: TagCreatedEvent) {
    const { tag } = event;
    Logger.log(`#${tag.id} - created!`, TagCreatedHandler.name);
    return event;
  }
}
