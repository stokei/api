import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SitesLightColorRemovedEvent } from '@/events/implements/sites-light-colors/sites-light-color-removed.event';

@EventsHandler(SitesLightColorRemovedEvent)
export class SitesLightColorRemovedHandler
  implements IEventHandler<SitesLightColorRemovedEvent>
{
  async handle(event: SitesLightColorRemovedEvent) {
    const { sitesLightColor } = event;
    Logger.log(
      `#${sitesLightColor.id} - removed!`,
      SitesLightColorRemovedHandler.name
    );
    return event;
  }
}
