import { ProjectsMemberRemovedEvent } from '@/events/implements/projects-members/projects-member-removed.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(ProjectsMemberRemovedEvent)
export class ProjectsMemberRemovedHandler
  implements IEventHandler<ProjectsMemberRemovedEvent>
{
  async handle(event: ProjectsMemberRemovedEvent) {
    const { projectsMember } = event;
    Logger.log(
      `#${projectsMember.id} - removed!`,
      ProjectsMemberRemovedHandler.name
    );
    return event;
  }
}
