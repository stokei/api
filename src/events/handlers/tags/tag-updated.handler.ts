import { TagUpdatedEvent } from '@/events/implements/tags/tag-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(TagUpdatedEvent)
export class TagUpdatedHandler implements IEventHandler<TagUpdatedEvent> {
  async handle(event: TagUpdatedEvent) {
    const { tag } = event;
    Logger.log(`#${tag.id} - updated!`, TagUpdatedHandler.name);
    return event;
  }
}
