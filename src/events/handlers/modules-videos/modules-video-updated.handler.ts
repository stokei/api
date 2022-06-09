import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ModulesVideoUpdatedEvent } from '@/events/implements/modules-videos/modules-video-updated.event';

@EventsHandler(ModulesVideoUpdatedEvent)
export class ModulesVideoUpdatedHandler
  implements IEventHandler<ModulesVideoUpdatedEvent>
{
  async handle(event: ModulesVideoUpdatedEvent) {
    const { modulesVideo } = event;
    Logger.log(
      `#${modulesVideo.id} - updated!`,
      ModulesVideoUpdatedHandler.name
    );
    return event;
  }
}
