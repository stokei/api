import { SitesDarkColorUpdatedEvent } from '@/events/implements/sites-dark-colors/sites-dark-color-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
