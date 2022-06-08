import { ProjectsMemberCreatedEvent } from '@/events/implements/projects-members/projects-member-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ProjectsMemberCreatedEvent)
export class ProjectsMemberCreatedHandler
  implements IEventHandler<ProjectsMemberCreatedEvent>
{
  async handle(event: ProjectsMemberCreatedEvent) {
    const { projectsMember } = event;
    Logger.log(
      `#${projectsMember.id} - created!`,
      ProjectsMemberCreatedHandler.name
    );
    return event;
  }
}
