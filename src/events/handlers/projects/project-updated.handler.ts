import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ProjectUpdatedEvent } from '@/events/implements/projects/project-updated.event';

@EventsHandler(ProjectUpdatedEvent)
export class ProjectUpdatedHandler
  implements IEventHandler<ProjectUpdatedEvent>
{
  async handle(event: ProjectUpdatedEvent) {
    const { project } = event;
    Logger.log(`#${project.id} - updated!`, ProjectUpdatedHandler.name);
    return event;
  }
}
