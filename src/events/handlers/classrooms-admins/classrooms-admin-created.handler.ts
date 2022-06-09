import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomsAdminCreatedEvent } from '@/events/implements/classrooms-admins/classrooms-admin-created.event';

@EventsHandler(ClassroomsAdminCreatedEvent)
export class ClassroomsAdminCreatedHandler
  implements IEventHandler<ClassroomsAdminCreatedEvent>
{
  async handle(event: ClassroomsAdminCreatedEvent) {
    const { classroomsAdmin } = event;
    Logger.log(
      `#${classroomsAdmin.id} - created!`,
      ClassroomsAdminCreatedHandler.name
    );
    return event;
  }
}
