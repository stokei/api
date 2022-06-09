import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { TagRemovedEvent } from '@/events/implements/tags/tag-removed.event';

@EventsHandler(TagRemovedEvent)
export class TagRemovedHandler implements IEventHandler<TagRemovedEvent> {
  async handle(event: TagRemovedEvent) {
    const { tag } = event;
    Logger.log(`#${tag.id} - removed!`, TagRemovedHandler.name);
    return event;
  }
}
