import { TagCreatedEvent } from '@/events/implements/tags/tag-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(TagCreatedEvent)
export class TagCreatedHandler implements IEventHandler<TagCreatedEvent> {
  async handle(event: TagCreatedEvent) {
    const { tag } = event;
    Logger.log(`#${tag.id} - created!`, TagCreatedHandler.name);
    return event;
  }
}
