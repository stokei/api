import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ModulesVideoCreatedEvent } from '@/events/implements/modules-videos/modules-video-created.event';

@EventsHandler(ModulesVideoCreatedEvent)
export class ModulesVideoCreatedHandler
  implements IEventHandler<ModulesVideoCreatedEvent>
{
  async handle(event: ModulesVideoCreatedEvent) {
    const { modulesVideo } = event;
    Logger.log(
      `#${modulesVideo.id} - created!`,
      ModulesVideoCreatedHandler.name
    );
    return event;
  }
}
