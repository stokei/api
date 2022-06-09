import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomsAdminRemovedEvent } from '@/events/implements/classrooms-admins/classrooms-admin-removed.event';

@EventsHandler(ClassroomsAdminRemovedEvent)
export class ClassroomsAdminRemovedHandler
  implements IEventHandler<ClassroomsAdminRemovedEvent>
{
  async handle(event: ClassroomsAdminRemovedEvent) {
    const { classroomsAdmin } = event;
    Logger.log(
      `#${classroomsAdmin.id} - removed!`,
      ClassroomsAdminRemovedHandler.name
    );
    return event;
  }
}
