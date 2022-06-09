import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomsModuleCreatedEvent } from '@/events/implements/classrooms-modules/classrooms-module-created.event';

@EventsHandler(ClassroomsModuleCreatedEvent)
export class ClassroomsModuleCreatedHandler
  implements IEventHandler<ClassroomsModuleCreatedEvent>
{
  async handle(event: ClassroomsModuleCreatedEvent) {
    const { classroomsModule } = event;
    Logger.log(
      `#${classroomsModule.id} - created!`,
      ClassroomsModuleCreatedHandler.name
    );
    return event;
  }
}
