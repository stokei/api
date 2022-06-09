import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { TagUpdatedEvent } from '@/events/implements/tags/tag-updated.event';

@EventsHandler(TagUpdatedEvent)
export class TagUpdatedHandler implements IEventHandler<TagUpdatedEvent> {
  async handle(event: TagUpdatedEvent) {
    const { tag } = event;
    Logger.log(`#${tag.id} - updated!`, TagUpdatedHandler.name);
    return event;
  }
}
