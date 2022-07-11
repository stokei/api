import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ModuleVideoRemovedEvent } from '@/events/implements/module-videos/module-video-removed.event';

@EventsHandler(ModuleVideoRemovedEvent)
export class ModuleVideoRemovedHandler
  implements IEventHandler<ModuleVideoRemovedEvent>
{
  async handle(event: ModuleVideoRemovedEvent) {
    const { moduleVideo } = event;
    Logger.log(`#${moduleVideo.id} - removed!`, ModuleVideoRemovedHandler.name);
    return event;
  }
}
