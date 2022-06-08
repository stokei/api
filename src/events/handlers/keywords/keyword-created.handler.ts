import { KeywordCreatedEvent } from '@/events/implements/keywords/keyword-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
