import { SitesLightColorCreatedEvent } from '@/events/implements/sites-light-colors/sites-light-color-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(SitesLightColorCreatedEvent)
export class SitesLightColorCreatedHandler
  implements IEventHandler<SitesLightColorCreatedEvent>
{
  async handle(event: SitesLightColorCreatedEvent) {
    const { sitesLightColor } = event;
    Logger.log(
      `#${sitesLightColor.id} - created!`,
      SitesLightColorCreatedHandler.name
    );
    return event;
  }
}
