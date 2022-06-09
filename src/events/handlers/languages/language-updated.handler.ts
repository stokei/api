import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { LanguageUpdatedEvent } from '@/events/implements/languages/language-updated.event';

@EventsHandler(LanguageUpdatedEvent)
export class LanguageUpdatedHandler
  implements IEventHandler<LanguageUpdatedEvent>
{
  async handle(event: LanguageUpdatedEvent) {
    const { language } = event;
    Logger.log(`#${language.id} - updated!`, LanguageUpdatedHandler.name);
    return event;
  }
}
