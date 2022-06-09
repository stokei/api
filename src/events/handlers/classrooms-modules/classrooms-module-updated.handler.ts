import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ClassroomsModuleUpdatedEvent } from '@/events/implements/classrooms-modules/classrooms-module-updated.event';

@EventsHandler(ClassroomsModuleUpdatedEvent)
export class ClassroomsModuleUpdatedHandler
  implements IEventHandler<ClassroomsModuleUpdatedEvent>
{
  async handle(event: ClassroomsModuleUpdatedEvent) {
    const { classroomsModule } = event;
    Logger.log(
      `#${classroomsModule.id} - updated!`,
      ClassroomsModuleUpdatedHandler.name
    );
    return event;
  }
}
