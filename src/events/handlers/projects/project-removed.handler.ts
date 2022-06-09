import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ProjectRemovedEvent } from '@/events/implements/projects/project-removed.event';

@EventsHandler(ProjectRemovedEvent)
export class ProjectRemovedHandler
  implements IEventHandler<ProjectRemovedEvent>
{
  async handle(event: ProjectRemovedEvent) {
    const { project } = event;
    Logger.log(`#${project.id} - removed!`, ProjectRemovedHandler.name);
    return event;
  }
}
