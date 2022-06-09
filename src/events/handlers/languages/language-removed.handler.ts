import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { LanguageRemovedEvent } from '@/events/implements/languages/language-removed.event';

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
