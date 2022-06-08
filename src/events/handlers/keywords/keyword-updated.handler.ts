import { KeywordUpdatedEvent } from '@/events/implements/keywords/keyword-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
