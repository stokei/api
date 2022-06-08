import { ClassroomsModuleCreatedEvent } from '@/events/implements/classrooms-modules/classrooms-module-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

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
