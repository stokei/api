import { LanguageRemovedEvent } from '@/events/implements/languages/language-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(LanguageRemovedEvent)
export class LanguageRemovedHandler
  implements IEventHandler<LanguageRemovedEvent>
{
  async handle(event: LanguageRemovedEvent) {
    const { language } = event;
    Logger.log(`#${language.id} - removed!`, LanguageRemovedHandler.name);
    return event;
  }
}
