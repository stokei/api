import { TagRemovedEvent } from '@/events/implements/tags/tag-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(TagRemovedEvent)
export class TagRemovedHandler implements IEventHandler<TagRemovedEvent> {
  async handle(event: TagRemovedEvent) {
    const { tag } = event;
    Logger.log(`#${tag.id} - removed!`, TagRemovedHandler.name);
    return event;
  }
}
