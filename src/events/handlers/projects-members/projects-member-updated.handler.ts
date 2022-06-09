import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ProjectsMemberUpdatedEvent } from '@/events/implements/projects-members/projects-member-updated.event';

@EventsHandler(ProjectsMemberUpdatedEvent)
export class ProjectsMemberUpdatedHandler
  implements IEventHandler<ProjectsMemberUpdatedEvent>
{
  async handle(event: ProjectsMemberUpdatedEvent) {
    const { projectsMember } = event;
    Logger.log(
      `#${projectsMember.id} - updated!`,
      ProjectsMemberUpdatedHandler.name
    );
    return event;
  }
}
