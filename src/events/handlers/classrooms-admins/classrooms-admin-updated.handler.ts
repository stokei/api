import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomsAdminUpdatedEvent } from '@/events/implements/classrooms-admins/classrooms-admin-updated.event';

@EventsHandler(ClassroomsAdminUpdatedEvent)
export class ClassroomsAdminUpdatedHandler
  implements IEventHandler<ClassroomsAdminUpdatedEvent>
{
  async handle(event: ClassroomsAdminUpdatedEvent) {
    const { classroomsAdmin } = event;
    Logger.log(
      `#${classroomsAdmin.id} - updated!`,
      ClassroomsAdminUpdatedHandler.name
    );
    return event;
  }
}
