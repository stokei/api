import { LanguageCreatedEvent } from '@/events/implements/languages/language-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(LanguageCreatedEvent)
export class LanguageCreatedHandler
  implements IEventHandler<LanguageCreatedEvent>
{
  async handle(event: LanguageCreatedEvent) {
    const { language } = event;
    Logger.log(`#${language.id} - created!`, LanguageCreatedHandler.name);
    return event;
  }
}
