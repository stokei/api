import { ProjectRemovedEvent } from '@/events/implements/projects/project-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
