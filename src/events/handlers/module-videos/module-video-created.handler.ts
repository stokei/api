import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ModuleVideoCreatedEvent } from '@/events/implements/module-videos/module-video-created.event';

@EventsHandler(ModuleVideoCreatedEvent)
export class ModuleVideoCreatedHandler
  implements IEventHandler<ModuleVideoCreatedEvent>
{
  async handle(event: ModuleVideoCreatedEvent) {
    const { moduleVideo } = event;
    Logger.log(`#${moduleVideo.id} - created!`, ModuleVideoCreatedHandler.name);
    return event;
  }
}
