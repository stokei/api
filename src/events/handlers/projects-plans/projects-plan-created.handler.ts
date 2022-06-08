import { ProjectsPlanCreatedEvent } from '@/events/implements/projects-plans/projects-plan-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ProjectsPlanCreatedEvent)
export class ProjectsPlanCreatedHandler
  implements IEventHandler<ProjectsPlanCreatedEvent>
{
  async handle(event: ProjectsPlanCreatedEvent) {
    const { projectsPlan } = event;
    Logger.log(
      `#${projectsPlan.id} - created!`,
      ProjectsPlanCreatedHandler.name
    );
    return event;
  }
}
