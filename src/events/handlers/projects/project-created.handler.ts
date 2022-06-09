import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ProjectCreatedEvent } from '@/events/implements/projects/project-created.event';

@EventsHandler(ProjectCreatedEvent)
export class ProjectCreatedHandler
  implements IEventHandler<ProjectCreatedEvent>
{
  async handle(event: ProjectCreatedEvent) {
    const { project } = event;
    Logger.log(`#${project.id} - created!`, ProjectCreatedHandler.name);
    return event;
  }
}
