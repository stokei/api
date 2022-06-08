import { ProjectsPlanUpdatedEvent } from '@/events/implements/projects-plans/projects-plan-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ProjectsPlanUpdatedEvent)
export class ProjectsPlanUpdatedHandler
  implements IEventHandler<ProjectsPlanUpdatedEvent>
{
  async handle(event: ProjectsPlanUpdatedEvent) {
    const { projectsPlan } = event;
    Logger.log(
      `#${projectsPlan.id} - updated!`,
      ProjectsPlanUpdatedHandler.name
    );
    return event;
  }
}
