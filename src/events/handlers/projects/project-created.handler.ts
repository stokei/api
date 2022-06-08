import { ProjectCreatedEvent } from '@/events/implements/projects/project-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
