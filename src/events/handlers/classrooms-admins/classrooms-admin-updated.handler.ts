import { ClassroomsAdminUpdatedEvent } from '@/events/implements/classrooms-admins/classrooms-admin-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
