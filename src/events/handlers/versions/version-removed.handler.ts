import { VersionRemovedEvent } from '@/events/implements/versions/version-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(VersionRemovedEvent)
export class VersionRemovedHandler
  implements IEventHandler<VersionRemovedEvent>
{
  async handle(event: VersionRemovedEvent) {
    const { version } = event;
    Logger.log(`#${version.id} - removed!`, VersionRemovedHandler.name);
    return event;
  }
}
