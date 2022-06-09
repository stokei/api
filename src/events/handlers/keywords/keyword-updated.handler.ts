import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { KeywordUpdatedEvent } from '@/events/implements/keywords/keyword-updated.event';

@EventsHandler(KeywordUpdatedEvent)
export class KeywordUpdatedHandler
  implements IEventHandler<KeywordUpdatedEvent>
{
  async handle(event: KeywordUpdatedEvent) {
    const { keyword } = event;
    Logger.log(`#${keyword.id} - updated!`, KeywordUpdatedHandler.name);
    return event;
  }
}
