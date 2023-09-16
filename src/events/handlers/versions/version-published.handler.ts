import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { VersionPublishedEvent } from '@/events/implements/versions/version-published.event';

@EventsHandler(VersionPublishedEvent)
export class VersionPublishedHandler
  implements IEventHandler<VersionPublishedEvent>
{
  async handle(event: VersionPublishedEvent) {
    const { version } = event;
    Logger.log(`#${version.id} - published!`, VersionPublishedHandler.name);
    return event;
  }
}
