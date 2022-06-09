import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CoursesAdminRemovedEvent } from '@/events/implements/courses-admins/courses-admin-removed.event';

@EventsHandler(CoursesAdminRemovedEvent)
export class CoursesAdminRemovedHandler
  implements IEventHandler<CoursesAdminRemovedEvent>
{
  async handle(event: CoursesAdminRemovedEvent) {
    const { coursesAdmin } = event;
    Logger.log(
      `#${coursesAdmin.id} - removed!`,
      CoursesAdminRemovedHandler.name
    );
    return event;
  }
}
