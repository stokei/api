import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SitesDarkColorUpdatedEvent } from '@/events/implements/sites-dark-colors/sites-dark-color-updated.event';

@EventsHandler(SitesDarkColorUpdatedEvent)
export class SitesDarkColorUpdatedHandler
  implements IEventHandler<SitesDarkColorUpdatedEvent>
{
  async handle(event: SitesDarkColorUpdatedEvent) {
    const { sitesDarkColor } = event;
    Logger.log(
      `#${sitesDarkColor.id} - updated!`,
      SitesDarkColorUpdatedHandler.name
    );
    return event;
  }
}
