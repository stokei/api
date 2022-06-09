import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SitesLightColorUpdatedEvent } from '@/events/implements/sites-light-colors/sites-light-color-updated.event';

@EventsHandler(SitesLightColorUpdatedEvent)
export class SitesLightColorUpdatedHandler
  implements IEventHandler<SitesLightColorUpdatedEvent>
{
  async handle(event: SitesLightColorUpdatedEvent) {
    const { sitesLightColor } = event;
    Logger.log(
      `#${sitesLightColor.id} - updated!`,
      SitesLightColorUpdatedHandler.name
    );
    return event;
  }
}
