import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ModuleVideoUpdatedEvent } from '@/events/implements/module-videos/module-video-updated.event';

@EventsHandler(ModuleVideoUpdatedEvent)
export class ModuleVideoUpdatedHandler
  implements IEventHandler<ModuleVideoUpdatedEvent>
{
  async handle(event: ModuleVideoUpdatedEvent) {
    const { moduleVideo } = event;
    Logger.log(`#${moduleVideo.id} - updated!`, ModuleVideoUpdatedHandler.name);
    return event;
  }
}
