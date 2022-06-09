import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { KeywordCreatedEvent } from '@/events/implements/keywords/keyword-created.event';

@EventsHandler(KeywordCreatedEvent)
export class KeywordCreatedHandler
  implements IEventHandler<KeywordCreatedEvent>
{
  async handle(event: KeywordCreatedEvent) {
    const { keyword } = event;
    Logger.log(`#${keyword.id} - created!`, KeywordCreatedHandler.name);
    return event;
  }
}
