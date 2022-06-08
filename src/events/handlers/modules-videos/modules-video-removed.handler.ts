import { ModulesVideoRemovedEvent } from '@/events/implements/modules-videos/modules-video-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ModulesVideoRemovedEvent)
export class ModulesVideoRemovedHandler
  implements IEventHandler<ModulesVideoRemovedEvent>
{
  async handle(event: ModulesVideoRemovedEvent) {
    const { modulesVideo } = event;
    Logger.log(
      `#${modulesVideo.id} - removed!`,
      ModulesVideoRemovedHandler.name
    );
    return event;
  }
}
