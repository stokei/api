import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CoursesAdminCreatedEvent } from '@/events/implements/courses-admins/courses-admin-created.event';

@EventsHandler(CoursesAdminCreatedEvent)
export class CoursesAdminCreatedHandler
  implements IEventHandler<CoursesAdminCreatedEvent>
{
  async handle(event: CoursesAdminCreatedEvent) {
    const { coursesAdmin } = event;
    Logger.log(
      `#${coursesAdmin.id} - created!`,
      CoursesAdminCreatedHandler.name
    );
    return event;
  }
}
