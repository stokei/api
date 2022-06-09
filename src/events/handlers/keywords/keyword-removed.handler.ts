import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { KeywordRemovedEvent } from '@/events/implements/keywords/keyword-removed.event';

@EventsHandler(KeywordRemovedEvent)
export class KeywordRemovedHandler
  implements IEventHandler<KeywordRemovedEvent>
{
  async handle(event: KeywordRemovedEvent) {
    const { keyword } = event;
    Logger.log(`#${keyword.id} - removed!`, KeywordRemovedHandler.name);
    return event;
  }
}
