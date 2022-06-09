import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CoursesAdminUpdatedEvent } from '@/events/implements/courses-admins/courses-admin-updated.event';

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
