import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SitesDarkColorRemovedEvent } from '@/events/implements/sites-dark-colors/sites-dark-color-removed.event';

@EventsHandler(SitesDarkColorRemovedEvent)
export class SitesDarkColorRemovedHandler
  implements IEventHandler<SitesDarkColorRemovedEvent>
{
  async handle(event: SitesDarkColorRemovedEvent) {
    const { sitesDarkColor } = event;
    Logger.log(
      `#${sitesDarkColor.id} - removed!`,
      SitesDarkColorRemovedHandler.name
    );
    return event;
  }
}
