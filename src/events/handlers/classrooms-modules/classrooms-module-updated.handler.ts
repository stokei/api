import { ClassroomsModuleUpdatedEvent } from '@/events/implements/classrooms-modules/classrooms-module-updated.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
