import { CoursesAdminUpdatedEvent } from '@/events/implements/courses-admins/courses-admin-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

@EventsHandler(CoursesAdminUpdatedEvent)
export class CoursesAdminUpdatedHandler
  implements IEventHandler<CoursesAdminUpdatedEvent>
{
  async handle(event: CoursesAdminUpdatedEvent) {
    const { coursesAdmin } = event;
    Logger.log(
      `#${coursesAdmin.id} - updated!`,
      CoursesAdminUpdatedHandler.name
    );
    return event;
  }
}
