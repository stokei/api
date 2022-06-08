import { ProjectUpdatedEvent } from '@/events/implements/projects/project-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
