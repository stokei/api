import { SitesDarkColorCreatedEvent } from '@/events/implements/sites-dark-colors/sites-dark-color-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
