import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ProjectsPlanRemovedEvent } from '@/events/implements/projects-plans/projects-plan-removed.event';

@EventsHandler(ProjectsPlanRemovedEvent)
export class ProjectsPlanRemovedHandler
  implements IEventHandler<ProjectsPlanRemovedEvent>
{
  async handle(event: ProjectsPlanRemovedEvent) {
    const { projectsPlan } = event;
    Logger.log(
      `#${projectsPlan.id} - removed!`,
      ProjectsPlanRemovedHandler.name
    );
    return event;
  }
}
