import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SitesDarkColorCreatedEvent } from '@/events/implements/sites-dark-colors/sites-dark-color-created.event';

@EventsHandler(SitesDarkColorCreatedEvent)
export class SitesDarkColorCreatedHandler
  implements IEventHandler<SitesDarkColorCreatedEvent>
{
  async handle(event: SitesDarkColorCreatedEvent) {
    const { sitesDarkColor } = event;
    Logger.log(
      `#${sitesDarkColor.id} - created!`,
      SitesDarkColorCreatedHandler.name
    );
    return event;
  }
}
