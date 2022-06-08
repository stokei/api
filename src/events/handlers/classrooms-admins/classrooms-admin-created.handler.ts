import { ClassroomsAdminCreatedEvent } from '@/events/implements/classrooms-admins/classrooms-admin-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
